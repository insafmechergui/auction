const mongoose = require("mongoose");
const express = require('express');
const bcrypt = require('bcryptjs');
const database = require('../Database/User')
const User = mongoose.model("user");
const bodyParser = require("body-parser");

module.exports = app => {
	//signup for a new user
	//save name email and hashed password to database
	app.post("/api/signup", (req, res, next) => {

		var name = req.body.name;
		var email = req.body.email;
	
    User.findOne({ email : email}, (err, data) => {
      if (err) res.status(404).send(err);
      if (!data) {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) res.status(404).send(err);
          var user = new User({
            name: name,
            email: email,
            password: hash
          });
          user.save(err => {
            if (err) res.json({
              saved: false
            });
            res.status(201).json({
              saved: true
            });
          });
        });
      } 
      else {
        res.json("user already exists");
      }
    });
  });
}

// module.exports = app => { //example
//   app.get(`/api/product`, async (req, res) => {
//     let products = await Product.find();
//     return res.status(200).send(products);
//   });

//   app.post(`/api/product`, async (req, res) => {
//     let product = await Product.create(req.body);
//     return res.status(201).send({
//       error: false,
//       product
//     });
//   });

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
// };
