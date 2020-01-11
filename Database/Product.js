const mongoose = require("mongoose");
const { Schema } = mongoose;
const validator = require("validator");

const productSchema = new Schema({
  name: { type: String, required: true },
  descreption: { type: String },
  image: {
    type: String,
    required: true,
    validate: value => {
      if (!validator.isURL(value)) {
        throw new Error({ error: "Invalid URL address" });
      }
    }
  },
  category: [{ type: Schema.Types.ObjectId, ref: "Categorie" }],
  last_auction_price: { type: Number },
  value: { type: Number },
  initial_date: { type: Date },
  duration: { type: Number },
  participants: [
    {
      user: { type: Schema.Types.ObjectId, ref: "user" },
      price: { type: Number },
      date: { type: Date }
    }
  ],
  winner: [{ type: Schema.Types.ObjectId, ref: "user" }]
});
productSchema.index({descreption: 'text'});

var Product = mongoose.model("Product", productSchema);

var getAll = function (callback) {
  console.log(new Date('2020-01-09T15:02:30.000+0000').getTime())
  console.log(new Date())

  Product.find({ initial_date: { $lte: new Date() } }, (err, data) => {
    if (err) {
      callback(err, null)
    } else {
      callback(null, data)
    }

  })
}


var getOne = function (id, callback) {
  Product.findById(id)
    .populate("participants.user")
    // .populate("winner")
    .exec((err, product) => {
      if (err) { callback(err, null) }
      else {
        callback(null, product)

      }

    })

}

var searchFilter = function(descriptionfilter, callback){
  console.log(descriptionfilter)
  // Product.find({$text: {$search: searchString}})
  // "$text": {"$search": req.body.query}
  // {$text: {$search: descriptionfilter}}
    Product.find({$text: {$search: descriptionfilter}}, (err,data) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, data);
      }
    });
}

module.exports.getAll = getAll;
module.exports.getOne = getOne;
module.exports.searchFilter = searchFilter;
