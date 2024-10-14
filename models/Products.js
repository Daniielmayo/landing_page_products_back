const { Schema, model } = require("mongoose");

const ProductsSchema = new Schema({
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  nameProduct: {
    type: String,
    required: true,
  },
  descriptionProduct: {
    type: String,
    required: true,
  },
  imageProduct: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  stock: {
    type: Number,
    default: null,
  },
  category: {
    type: Schema.Types.ObjectId, 
    ref: "Category", 
    required: false, 
  },
});
const Products = model("Products", ProductsSchema);

module.exports = Products;
