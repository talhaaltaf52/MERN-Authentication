const Subscription = require("../models/subscribeSchema");
const AddUserSubscription = require("../models/subscribeUserSchema");
const User = require("../models/userSchema");

const subscribeCtrl = {
  addSubscription: async (req, res) => {
    try {
      const { title, price, description, users, duration } = req.body;
      if (!title || !price || !description || !users || !duration) {
        return res.status(400).json({ msg: "Please fill in missing fields" });
      }
      const checkSub = await Subscription.findOne({ title: title });
      if (checkSub) {
        return res.status(400).json({ msg: "Subscription already exist" });
      }
      const newSub = new Subscription({
        title,
        price,
        description,
        users,
        duration,
      });
      res.json({ msg: "Subcription added successfully" });
      newSub.save();
    } catch (e) {
      return res.status(500).json({ msg: e.message });
    }
  },
  getSubscription: async (req, res) => {
    try {
      const result = await Subscription.find();
      res.json(result);
    } catch (e) {
      return res.status(500).json({ msg: e.message });
    }
  },
  updateSubscription: async (req, res) => {
    try {
      const { price, users, duration } = req.body;
      if (!price || !users || !duration) {
        return res.status(400).json({ msg: "Please fill in missing fields" });
      }
      if (price == 0 || users == 0 || duration == 0) {
        return res.status(400).json({ msg: "Value cannot be 0" });
      }
      await Subscription.findOneAndUpdate(
        { _id: req.params.id },
        { price: price, users: users }
      );
      res.json({ msg: "Subscription updated successfully!" });
    } catch (e) {
      return res.status(500).json({ msg: e.message });
    }
  },
  deleteSubscription: async (req, res) => {
    try {
      await Subscription.findByIdAndDelete({ _id: req.params.id });
      res.json({ msg: "Subscription deleted successfully" });
    } catch (e) {
      return res.status(500).json({ msg: e.message });
    }
  },
  addUser: async (req, res) => {
    try {
      const { email, id } = req.body;
      if (!email || !id) {
        return res.status(400).json({ msg: "Missing Fields" });
      }
      const user = await User.findOne({ email: email });
      const subCheck = await Subscription.findById({ _id: id });
      const newSubscription = new AddUserSubscription({
        user: user._id,
        subscription: subCheck._id,
      });
      await User.findByIdAndUpdate({ _id: user._id }, { role: 2 });
      newSubscription.save();
      res.json({ msg: "Subscription added successfully" });
    } catch (e) {
      return res.status(500).json({ msg: e.message });
    }
  },
  getUserSubscriptions: async (req, res) => {
    try {
      const result = await AddUserSubscription.find().populate(
        "user subscription"
      );
      res.json(result);
    } catch (e) {
      return res.status(500).json({ msg: e.message });
    }
  },

  deleteUserSubscription: async (req, res) => {
    try {
      const result = await AddUserSubscription.findOne({
        _id: req.params.id,
      }).populate("user");
      await User.findOneAndUpdate({ email: result.user.email }, { role: 0 });
      await AddUserSubscription.findByIdAndDelete({ _id: req.params.id });
      res.json({ msg: "Subscription deleted successfully" });
    } catch (e) {
      return res.status(500).json({ msg: e.message });
    }
  },
};

module.exports = subscribeCtrl;
