const mongoose = require("mongoose");

const roleSchema = new mongoose.Schema(
  {
    role: {
      type: Number,
      required: true, // 0 = user, 1 = SuperAdmin, 2 = Admin, 3 = Moderator, 4 = Manager
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Role", roleSchema);
