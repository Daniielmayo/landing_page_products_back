const { Router } = require("express");
const validateUserAndRole = require("../../middleware/validateRolUser");
const { validateFields } = require("../../middleware/validateFields");
const createProductsUser = require("../../controllers/products/createProductsUser");
const { check } = require("express-validator");

const router = Router();
/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       required:
 *         - nameProduct
 *         - descriptionProduct
 *         - imageProduct
 *         - price
 *         - stock
 *       properties:
 *         nameProduct:
 *           type: string
 *           description: Nombre del producto
 *         descriptionProduct:
 *           type: string
 *           description: Descripción del producto
 *         imageProduct:
 *           type: string
 *           description: URL de la imagen del producto
 *         price:
 *           type: number
 *           description: Precio del producto
 *         stock:
 *           type: number
 *           description: Stock disponible
 *         category:
 *           type: string
 *           description: ID de la categoría (opcional)
 *       example:
 *         nameProduct: "Camiseta"
 *         descriptionProduct: "Camiseta 100% algodón de alta calidad"
 *         imageProduct: "http://imagen.com/camiseta.jpg"
 *         price: 25.99
 *         stock: 50
 *         category: "652f7d12345bda21e1c0a9b0" 
 */
/**
 * @swagger
 * /api/products/{idUser}/createProduct:
 *   post:
 *     summary: Crear un nuevo producto
 *     tags: [Product]
 *     parameters:
 *       - in: path
 *         name: idUser
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del usuario que está creando el producto
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       201:
 *         description: El producto fue creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error al crear el producto
 */

router.post(
  "/:idUser/createProduct",
  [
    check("nameProduct", "El nombre del producto es obligatorio.")
      .not()
      .isEmpty(),
    check("descriptionProduct", "La descripción del producto es obligatorio.")
      .not()
      .isEmpty(),
    check("imageProduct", "La imagen del producto es obligatorio.")
      .not()
      .isEmpty(),
    check("price", "El precio del producto es obligatorio y debe ser numérico.")
      .notEmpty()
      .isNumeric(),
    check("stock", "El stoc del producto es obligatorio y debe ser numérico.")
      .notEmpty()
      .isNumeric(),
    validateFields,
    validateUserAndRole,
  ],
  createProductsUser
);
module.exports = router;
