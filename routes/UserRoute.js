const mongoose = require("mongoose");
const UserDataBase = require("../Database/User");
const bcrypt = require("bcryptjs");
const User = mongoose.model("user");
const auth = require("./middleware/auth");
const router = require("router");
module.exports = app => {
  //example
  app.post("/signup", (req, res, next) => {
    var name = req.body.name;
    var email = req.body.email;

    User.findOne({ email }, (err, data) => {
      if (err) res.status(404).send(err);
      if (data) res.json("user already exists");

      bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) res.status(404).send(err);

        var user = new User({
          name: name,
          email: email,
          password: hash
        });

        user.save(err => {
          if (err) throw err;
          res.status(201).send({
            saved: true
          });
        });
      });
    });
  });

  app.post("/api/logIn", (req, res) => {
    User.findOne({ email: req.body.email }, (err, user) => {
      if (err) throw err;
      if (!user) res.status(404).send("user is not found");
      bcrypt
        .compare(req.body.password, user.password)
        .then(comparisonRes => {
          if (comparisonRes) {
            UserDataBase.generateAuthToken(user, token =>
              res.status(200).send({ user, token })
            );
          } else {
            res.send("not match");
          }
        })
        .catch(err => err);
    });
  });

  app.get("/users/me", auth, (req, res) => {
    // View logged in user profile
    res.send(req.user);
  });

  //   app.put(`/api/product/:id`, async (req, res) => {
  //     const { id } = req.params;

  //     let product = await Product.findByIdAndUpdate(id, req.body);

  //     return res.status(202).send({
  //       error: false,
  //       product
  //     });
  //   });

  //   app.delete(`/api/product/:id`, async (req, res) => {
  //     const { id } = req.params;

  //     let product = await Product.findByIdAndDelete(id);

  //     return res.status(202).send({
  //       error: false,
  //       product
  //     });
  //   });
};
