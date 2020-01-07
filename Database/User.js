
///fill this
const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  name: String,
  email: { type: String, unique: true },
  password: String
});

mongoose.model("user", userSchema);
//  function find make this

