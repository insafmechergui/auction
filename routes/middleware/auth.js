const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const User = mongoose.model("user");
require("dotenv").config();

const auth = (req, res, next) => {
  const token = req.body.token;
  if (token !== null) {
    jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
      if (err) {
        return res
          .status(401)
          .send({ error: "Not authorized to access this resource" });
      }
      User.findOne({ _id: decoded._id, "tokens.token": token }, (err, user) => {
        if (err) console.log(err);
        if (!user) {
          throw new Error();
        }
        req.user = user;
        req.token = token;
        next();
      });
    });
  } else {
    res.status(404).send("no token");
  }
};
module.exports = auth;
