const { response } = require("express");
const Products = require("../../models/Products");

const productsUser = async (req, res = response) => {
  try {
    const productos = await Products.find();

    res.status(200).json(productos);
  } catch (error) {
    console.error("Error al obtener productos:", error);
    res.status(500).json({ error: "Error al obtener productos" });
  }
};

module.exports = productsUser;
