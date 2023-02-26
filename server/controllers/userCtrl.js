const User = require("../models/userSchema");
const Role = require("../models/roleSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sgEmail = require("@sendgrid/mail");
const CLIENT_URL = process.env.CLIENT_URL;
const ACTIVATION_TOKEN_SECRET = process.env.ACTIVATION_TOKEN_SECRET;
const SENGRID_API = process.env.SENDGRID_API_KEY;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;

const userCtrl = {
  register: async (req, res) => {
    try {
      const { name, email, password } = req.body;

      if (!name || !email || !password)
        return res.status(400).json({ msg: "Please fill in all fields." });

      if (!validateEmail(email))
        return res.status(400).json({ msg: "Invalid emails." });

      const user = await User.findOne({ email });
      if (user)
        return res.status(400).json({ msg: "This email already exists." });

      if (password.length < 6)
        return res
          .status(400)
          .json({ msg: "Password must be at least 6 characters." });

      const passwordHash = await bcrypt.hash(password, 12);

      const newUser = {
        name,
        email,
        password: passwordHash,
      };

      const activation_token = createActivationToken(newUser);

      const url = `${CLIENT_URL}/user/activate/${activation_token}`;

      sgEmail.setApiKey(SENGRID_API);

      const message = {
        to: newUser.email,
        from: "hamzambf@gmail.com",
        subject: "Email verification",
        html: `
        <h3>Activate your email by clicking on following link</h3>
        <p>${url}</p>`,
      };

      sgEmail.send(message);

      res.json({
        msg: "Register Success! Please activate your email to start.",
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  activateEmail: async (req, res) => {
    try {
      const { activation_token } = req.body;
      const user = jwt.verify(activation_token, ACTIVATION_TOKEN_SECRET);
      const { name, email, password } = user;
      const check = await User.findOne({ email });
      const role = await Role.findOne({ role: 0 });
      if (check) {
        return res.status(400).json({ msg: "Email already exist" });
      }
      const newUser = new User({
        name,
        email,
        password,
        role: role.role,
      });

      await newUser.save();

      res.json({ msg: "Account has been activated" });
    } catch (e) {
      return res.status(500).json({ msg: e.message });
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ msg: "This email does not exist" });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ msg: "Incorrect Password" });
      }
      const refresh_token = createRefreshToken({ id: user._id });
      res.cookie("refreshtoken", refresh_token, {
        httpOnly: true,
        path: "/user/refresh_token",
        maxAge: 7 * 24 * 60 * 60 * 1000, //7 days
      });
      res.json({ msg: "Login Successfully!", refresh_token: refresh_token });
    } catch (e) {
      return res.status(500).json({ msg: e.message });
    }
  },
  // getAccessToken: async (req, res) => {
  //   try {
  //     const access_token = createRefreshToken({ id: req.user.id });
  //     res.json({ access_token });
  //   } catch (e) {
  //     return res.status(500).json({ msg: e.message });
  //   }
  // },
  forgotPassword: async (req, res) => {
    try {
      const { email } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ msg: "This email does not exist" });
      }
      const accessToken = createRefreshToken({ id: user.id });
      const url = `${CLIENT_URL}/user/reset/${accessToken}`;
      sgEmail.setApiKey(SENGRID_API);
      const message = {
        to: email,
        from: "hamzambf@gmail.com",
        subject: "Email verification",
        html: `
        <h3>Reset your password by clicking on following link</h3>
        <p>${url}</p>`,
      };
      sgEmail.send(message);
      res.json({ msg: "Email has been sent. Check your inbox" });
    } catch (e) {
      return res.status(500).json({ msg: e.message });
    }
  },
  resetPassword: async (req, res) => {
    try {
      const { password } = req.body;
      const passwordHash = await bcrypt.hash(password, 12);
      console.log(req.user);
      await User.findOneAndUpdate(
        { _id: req.user.id },
        { password: passwordHash }
      );
      res.json({ msg: "Password Successfully changed" });
    } catch (e) {
      return res.status(500).json({ msg: e.message });
    }
  },
  getUserInfo: async (req, res) => {
    try {
      const user = await User.findById(req.user.id).select("-password");
      res.json(user);
    } catch (e) {
      return res.status(500).json({ msg: e.message });
    }
  },
  getUsersAllInfo: async (req, res) => {
    try {
      const users = await User.find().select("-password");

      res.json(users);
    } catch (e) {
      return res.status(500).json({ msg: e.message });
    }
  },
  logout: async (req, res) => {
    try {
      res.clearCookie("refreshtoken", { path: "/user/refresh_token" });
      return res.json({ msg: "Logged Out" });
    } catch (e) {
      return res.status(500).json({ msg: e.message });
    }
  },
  updateUser: async (req, res) => {
    try {
      const { name, avatar } = req.body;
      await User.findOneAndUpdate({ _id: req.user.id }, { name, avatar });
      res.json({ msg: "Profile updated successfully" });
    } catch (e) {
      return res.status(500).json({ msg: e.message });
    }
  },
  createRole: async (req, res) => {
    try {
      const { role } = req.body;

      const checkRole = await Role.findOne({ role });
      if (checkRole) {
        return res.status(400).json({ msg: "Role already exist!" });
      }
      const newRole = new Role({
        role: role,
      });
      newRole.save();
      res.json({ msg: "Role has been created successfully" });
    } catch (e) {
      return res.status(500).json({ msg: e.message });
    }
  },
  getAllRoles: async (req, res) => {
    try {
      const roles = await Role.find();
      res.json(roles);
    } catch (e) {
      return res.status(500).json({ msg: e.message });
    }
  },
  deleteRole: async (req, res) => {
    try {
      await Role.findByIdAndDelete({ _id: req.params.id });
      res.json({ msg: "Role has been deleted Successfully" });
    } catch (e) {
      return res.status(500).json({ msg: e.message });
    }
  },
  updateUserRole: async (req, res) => {
    try {
      const { role } = req.body;

      await User.findOneAndUpdate({ _id: req.params.id }, { role: role });
      res.json({ msg: "User role update successfully" });
    } catch (e) {
      return res.status(500).json({ msg: e.message });
    }
  },

  deleteUser: async (req, res) => {
    try {
      await User.findByIdAndDelete({ _id: req.params.id });
      res.json({ msg: "Deleted Successfully" });
    } catch (e) {
      return res.status(500).json({ msg: e.message });
    }
  },
};

function validateEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

const createActivationToken = (payload) => {
  return jwt.sign(payload, ACTIVATION_TOKEN_SECRET, {
    expiresIn: "5m",
  });
};

const createRefreshToken = (payload) => {
  return jwt.sign(payload, REFRESH_TOKEN_SECRET, { expiresIn: "7d" });
};

const createAccessToken = (payload) => {
  return jwt.sign(payload, ACCESS_TOKEN_SECRET, { expiresIn: "15s" });
};

module.exports = userCtrl;
