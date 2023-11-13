const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    minLength: 3,
    required: [true, "Username is required!"],
  },
  lastName: {
    type: String,
    minLength: 3,
    required: [true, "Email is required!"],
  },
  email: {
    type: String,
    minLength: 10,
    required: [true, "Email is required!"],
  },
  password: {
    type: String,
    required: true,
    minLength: 10,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
