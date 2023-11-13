const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("../lib/jsonwebtoken");
const { SECRET } = require("../constants");

// exports.findByFirstName = (firstName) => User.findOne({ firstName });
exports.findByEmail = (email) => User.findOne({ email });

exports.register = async (firstName, lastName, email, password, rePass) => {
  // Validate password
  if (password !== rePass) {
    throw new Error("Password missmatch!");
  }

  const existingUser = await User.findOne({
    $or: [
      { email }
    ],
  });

  if (existingUser) {
    throw new Error("User already exists!");
  }

  if (password.length < 3) {
    throw new Error("Password too short!");
  }

  const hashedPass = await bcrypt.hash(password, 10);

  await User.create({ firstName, lastName, email, password: hashedPass });

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
  };

  const token = await jwt.sign(payload, SECRET);

  return token;
};
