const { response } = require("express");
const Products = require("../../models/Products");
const Category = require("../../models/categories/Category");

const deleteProduct = async (req, res = response) => {
  const { productId } = req.params;

  try {
    const deletedProduct = await Products.findOneAndDelete({ _id: productId });

    if (!deletedProduct) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }

    await Category.updateMany(
      { products: productId },
      { $pull: { products: productId } }
    );

    res.status(200).json({
      message: "Producto eliminado y referencia en la categoría actualizada",
    });
  } catch (error) {
    console.error("Error al eliminar el producto:", error);
    res.status(500).json({ error: "Error al eliminar el producto" });
  }
};

module.exports = {
  deleteProduct,
};
