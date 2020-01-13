const mongoose = require("mongoose");
let Product = mongoose.model("Product");

let User = mongoose.model("user");
const express = require("express");
const app = express();

const cors = require("cors");

const Products = require("../Database/Product");
const Category = require("../Database/Category ");

app.use(cors());

module.exports = app => {

  app.get("/api/products", (req, res) => {
    Products.getAll((err, data) => {
      if (err) {
        res.status(404).send(err);
      } else {
        res.status(200).send(data);
        res.end();
      }
    });
  });

  //  product by id
  app.get("/api/product", (req, res) => {
    let id = req.query.id;
    Products.getOne(id, (err, data) => {
      if (err) {
        res.status(404).send(err);
      } else {
        res.status(200).send(data);
        res.end();
      }
    });
  });

  // just for admin add or update in case of error of insertion
  // question if the admin make a mistake on adding a product can he update if ?????

  app.post("/api/addp", (req, res) => {
    console.log(req.body);
    //.body.images = req.body.images.split(',')
    Product.create(req.body, (err, result) => {
      if (err) {
        res.status(400).send(err);
      } else {
        res.status(200).send(result);
        Category.updateProductCategory(result.category, result._id)
        res.end()
      }
    })
  });

  app.put("/api/updateAuction", (req, res) => {
    // the user should be provided for now his id is in the req

    Product.findOneAndUpdate(
      { _id: req.body.id },
      {
        last_auction_price: req.body.price,
        $push: {
          participants: {
            $each: [
              {
                user: req.body.idUser,
                price: req.body.price,
                date: req.body.date
              }
            ],
            $position: 0
          }
        }
      },
      { new: true }
    )
      .populate("participants.user")
      .exec((err, product) => {
        if (err) {
          res.status(401).send(err);
        } else {
          res.status(200).send(product);
        }
      });
  });

  app.get("/api/getwinner", (req, res) => {
    //they must be a function to validate id the intial time + duration has passed and there is no winner
    Products.findWinner(req.query.id, (err, product) => {
      if (err) {
        res.status(404).send(err);
      } else {
        res.status(200).send(product);
        res.end();
      }
    });
  });

  // update availability
  // app.get("/api/product/:id", (req, res) => { this function might be moved too the front end
  //   // check if the initial_date + duration >= sysdate, if it is
  //   // set the availability in data base to false and get the winner.
  //   // get winner
  //   Product.findById(req.params.id, function(err, product) {
  //     if (!product) res.status(404).send("hheey not found");
  //     // if(test the availability){
  //     else product.availability = false;
  //     productRoutes.route("/api/product/:id").get(function(req, res) {
  //       // the winner is the last element in tha array of participant
  //     });
  //   });
  // });

  // app.post("/api//update/:id", (req, res) => {   // this function should be reconsidered
  //   console.log("heheh");
  //   Product.findById(req.params.id, (err, product) => {
  //     if (err) res.json(err);
  //     // maybe we should add a condition of there is no auction in this product yet
  //     if (!product) res.status(404).send("hheey not found");
  //     else product.name = req.body.name;
  //     product.descreption = req.body.descreption;
  //     product.image = req.body.image;
  //     product.category = req.body.category;
  //     product.last_auction_price = req.body.last_auction_price;
  //     product.value = req.body.value;
  //     product.initial_date = req.body.initial_date;
  //     product.Duration = req.body.Duration;
  //     product.availability = true;
  //     product.participants = [];
  //     product.winner = {};

  //     product
  //       .save()
  //       .then(product => {
  //         res.json("product updated");
  //       })
  //       .catch(err => {
  //         res.status(400).send("Update not done");
  //       });
  //   });
  // });

  app.get("/api/productsearch", (req, res) => {
    Products.searchFilter(req.query.descreption, (err, data) => {
      if (err)
        res.status(404).send("not found");
      res.send(data);
    });
  });

  app.get("/api/productWinner", (req, res) => {
    Products.completedPro((err, data) => {
      if (err) {
        res.status(404).send("not found");
      } else {
        res.status(200).send(data);
      }
    });
  });
};
