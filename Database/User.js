const mongoose = require("mongoose");
const { Schema } = mongoose;
const validator = require("validator");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const userSchema = new Schema({
  name: { type: String, required: true },
  email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
    validate: value => {
      if (!validator.isEmail(value)) {
        throw new Error({ error: "Invalid Email address" });
      }
    }
  },
  password: { type: String, required: true },
  tokens: [
    {
      token: {
        type: String,
        required: true
      }
    }
  ]
});

var User = mongoose.model("user", userSchema);

const createUser = (userInfo, callback) => {
  var user = new User({
    name: userInfo.name,
    email: userInfo.email,
    password: userpassword
  });
  user.save(callback);
};

const findUser = (userEmail, callback) => {
  User.findOne({ email: userEmail }, callback);
};

const generateAuthToken = (user, callback) => {
  jwt.sign(
    { _id: user._id },
    process.env.JWT_KEY,
    { expiresIn: "90m" },
    (err, token) => {
      if (err) throw err;
      user.tokens = user.tokens.concat({ token });
      user
        .save()
        .then(user => callback(user, token))
        .catch(err => {
          throw err;
        });
    }
  );
};

const findUserByID = (id, callback) => {
  User.findById(id, callback);
};

exports.User = User;
exports.createUser = createUser;
exports.findUser = findUser;
exports.findUserByID = findUserByID;
exports.generateAuthToken = generateAuthToken;
