const { response } = require("express");
const Category = require("../../models/categories/Category");

const deleteCategory = async (req, res = response) => {
  const { categoryId } = req.params;

  try {
    const deletedCategory = await Category.findOneAndDelete({ _id: categoryId });

    if (!deletedCategory) {
      return res.status(404).json({ error: "Categoría no encontrada" });
    }

    res.status(200).json({ message: "Categoría y sus productos asociados fueron eliminados" });
  } catch (error) {
    console.error("Error al eliminar la categoría:", error);
    res.status(500).json({ error: "Error al eliminar la categoría" });
  }
};

module.exports = deleteCategory;
