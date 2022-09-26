const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
 {
  name: {
   type: String,
   required: [true, "Add your first-name"],
  },
  all_messages: {
   type: Array,
  },
 },
 { timestamps: true }
);

module.exports = {
 User: mongoose.model("User", userSchema),
};
