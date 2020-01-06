const mongoose = require("mongoose");
const express = require('express');
const bcrypt = require('bcrypt');
const User = mongoose.model("user");
const bodyParser = require("body-parser");

module.exports = app => {
	//signup for a new user
	//save name email and hashed password to database
	app.post('/signup', (req, res, next) => {
		var name = req.body.name; 
		var email = req.body.email; 
		var password = req.body.password; 

		const user = new User({
			name: name, 
			email: email, 
			password: password
		});

		user.findOne({
			email: req.body.email
		})
		.then(user=> {
			if(!user) {
				bcrypt.hash(password, 10, (err, hash) => {
          user.password = hash
          User.create(user)
						.then(user => {
							res.json({
								status: user.email + 'registered!'
							})
						})
						.catch(err => {
							res.send('error: ' + err)
						})
      	})
   		} else {
				 res.json({
					 error: 'User already exists'
				 })
			 }
		})
		.catch(err => {
			res.send('error: ' + err)
		})
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
