const { response } = require("express");
const User = require("../../models/User");
const Category = require("../../models/categories/Category");

const createCategory = async (req, res = response) => {
  const { name, description } = req.body;
  const { idUser } = req.params;


  const user = await User.findById(idUser);
  if (!user) {
    return res.status(404).json({
      error: "Usuario no encontrado y no es administrador para crear categoría",
    });
  }

  const newCategory = new Category({
    name,
    description,
    createBy: idUser,
  });

  await newCategory.save();

  res.status(200).json(newCategory);

  try {
  } catch (error) {
    console.error("Error al crear la categoría:", error);
    res.status(500).json({ error: "Error al crear categoría" });
  }
};

module.exports = createCategory;
