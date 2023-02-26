const mongoose = require("mongoose");

const subscribeUserSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required:true
    },
    subscription: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subscription",
      required:true
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("BoughtSubscription", subscribeUserSchema);
