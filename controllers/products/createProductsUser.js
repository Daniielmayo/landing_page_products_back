const { response } = require("express");
const Products = require("../../models/Products");
const User = require("../../models/User");
const Category = require("../../models/categories/Category");

const createProductsUser = async (req, res = response) => {
  const {
    nameProduct,
    descriptionProduct,
    imageProduct,
    price,
    stock,
    category,
  } = req.body;
  const { idUser } = req.params;

  try {
    const user = await User.findById(idUser);

    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    const newProduct = new Products({
      nameProduct,
      descriptionProduct,
      imageProduct,
      price,
      stock,
      category: category || null,
    });
    const savedProduct = await newProduct.save();

    if (category) {
      const currentCategory = await Category.findById(category);
      if (currentCategory) {
        currentCategory.products.push(savedProduct._id);
        await currentCategory.save();
      } else {
        return res.status(400).json({ error: "Categoría no encontrada" });
      }
    }

    res.status(201).json(newProduct);
  } catch (error) {
    console.error("Error al crear producto:", error);
    res.status(500).json({ error: "Error al crear producto" });
  }
};

module.exports = createProductsUser;
