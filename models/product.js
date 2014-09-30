
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ProductSchema = new Schema({
  name: { type: String, default: '', required: true },
  type: { type: String, default: '', required: true },
  category: { type: String, default: '', required: true },
  price: { type: Number, min: 0, required: true },
  description: { type: String, default: '', required: true },
  tags: [{ type: String }],
  stock: { type: Number, min: 0, required: true },
});

module.exports = ProductModel = mongoose.model('Product', ProductSchema);


