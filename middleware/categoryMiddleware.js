const removeProductReferenceOnDelete = async function (next) {
  const Products = require("../models/Products");
  const categoryId = this.getQuery()["_id"];
  try {
    if (typeof Products.deleteMany === "function") {
      await Products.deleteMany({ category: categoryId });
    } else {
      console.error("Products.deleteMany is not a function");
    }
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = removeProductReferenceOnDelete;
