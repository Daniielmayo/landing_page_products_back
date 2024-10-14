const Products = require("../../models/Products");
const User = require("../../models/User");

const updateProduct = async (req, res = response) => {
  const { uid, productId } = req.params;
  const { newData } = req.body;

  try {
    const user = await User.findById(uid);
    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    newData.updatedAt = Date.now();

    const productoActualizado = await Products.findByIdAndUpdate(
      productId,
      newData,
      { new: true }
    );

    if (!productoActualizado) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }

    res.status(200).json(productoActualizado);
  } catch (error) {
    console.error("Error al actualizar producto:", error);
    res.status(500).json({ error: "Error al actualizar producto" });
  }
};

module.exports = updateProduct;
