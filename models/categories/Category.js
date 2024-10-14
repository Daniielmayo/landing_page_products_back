const { Schema, model } = require("mongoose");
const deleteProductsOnCategoryDelete = require("../../middleware/categoryMiddleware");

const CategorySchema = new Schema({
  name: String,
  description: String,
  createBy: String,
  parentCategory: {
    type: Schema.Types.ObjectId,
    ref: "Category",
    default: null,
  },
  products: [
    {
      type: Schema.Types.ObjectId,
      ref: "Products",
    },
  ],
});
CategorySchema.pre('findOneAndDelete', deleteProductsOnCategoryDelete);

const Category = model("Category", CategorySchema);

module.exports = Category;
