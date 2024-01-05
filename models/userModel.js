const mongoose = require("mongoose");
// 定义数据模型
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please enter your username"],
  },
  password: {
    type: String,
    required: [true, "Please provide your password"],
    minlength: 8,
  },
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  if (this.password === enteredPassword) {
    return true;
  }
  return false;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
