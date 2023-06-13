const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("../lib/jsonwebtoken");
const { SECRET } = require("../constants");

exports.findByUsername = (username) => User.findOne({ username });
exports.findByEmail = (email) => User.findOne({ email });

exports.register = async (username, email, password, rePass) => {
  // Validate password
  if (password !== rePass) {
    throw new Error("Password missmatch!");
  }

  // Check if user exists already
  // const existingUser = await this.findByUsername(username);

  // Can use this below or that above
  const existingUser = await User.findOne({
    $or: [
      { email }, 
      { username }
    ],
  });

  if (existingUser) {
    throw new Error("User already exists!");
  }

  if (password.length < 4) {
    throw new Error("Password too short!");
  }

  const hashedPass = await bcrypt.hash(password, 10);

  await User.create({ username, email, password: hashedPass });

  return this.login(email, password);
};

exports.login = async (email, password) => {
  const user = await this.findByEmail(email);

  if (!user) {
    throw new Error("Invalid email or password");
  }
  const isValid = await bcrypt.compare(password, user.password);

  if (!isValid) {
    throw new Error("Invalid email or password");
  }

  const payload = {
    _id: user._id,
    email,
    username: user.username,
  };

  const token = await jwt.sign(payload, SECRET);

  return token;
};
