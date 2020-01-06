const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const userDataBase = require("../../Database/User");
const User = mongoose.model("user");

const auth = (req, res, next) => {
  const token = req.header("Authorization").replace("Bearer ", "");
  //should be process.env.JWT_KEY
  jwt.verify(token, "private key", (err, decoded) => {
    if (err)
      res.status(401).send({ error: "Not authorized to access this resource" });
    User.findOne({ _id: decoded._id, "tokens.token": token }, (err, user) => {
      if (err) throw err;
      if (!user) {
        throw new Error();
      }
      req.user = user;
      req.token = token;
      next();
    });
  });
};
module.exports = auth;
