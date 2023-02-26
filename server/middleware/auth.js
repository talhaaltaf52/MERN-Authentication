const jwt = require("jsonwebtoken");
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;


const auth = (req, res, next) => {
  try {
    const token = req.header("Authorization");
    if (!token) {
      return res.status(400).json({ msg: "Invalid Authentication" });
    }
    jwt.verify(token, REFRESH_TOKEN_SECRET, (err, user) => {
      if (err) {
        return res.status(400).json({ msg: "Invalid Authentication" });
      }
      req.user = user;
      next();
    }) 
  } catch (e) {
    return res.status(500).json({ msg: e.message });
  }
};

module.exports = auth;
