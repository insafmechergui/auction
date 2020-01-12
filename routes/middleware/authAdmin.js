const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const userDataBase = require("../../Database/User");

const authAdmin = (req, res, next) => {
  //compare the user's (from the data base) admin token to ours

  if (!req.body.id) {
    res.end();
  }
  userDataBase.findUserByID(req.body.id, (err, admin) => {
    if (err) {
      res.status(400).json(err);
    }
    if (!admin) {
      console.log("not found");
      res.end();
    }
    console.log(admin);
    admin = JSON.parse(JSON.stringify(admin));
    if (!admin.isAdmin) {
      console.log("not an admin");
      res.end();
    }
    require("dotenv").config();
    bcrypt.compare(
      admin.adminPass,
      process.env.ADMIN_PASS,
      (err, comparisionRES) => {
        if (err) {
          console.log(err);
          res.end();
        }
        if (!comparisionRES) {
          console.log("wrong pass");
          res.end();
        }
        res.status(200).send("autherized");
        next();
      }
    );
  });
};
module.exports = authAdmin;
