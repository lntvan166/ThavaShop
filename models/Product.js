const mongoose = require("mongoose");

const schema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  image: Buffer,
  image2: String,
  material: String,
  care: String,
  brand: String,
  color: String,
  size: Array,
  imageType: String,
  description: String,
  slug: String,
});

module.exports = mongoose.model("Product", schema, "product");
module.exports.everySize = ["S", "M", "L", "XL", "XXL"];
