const { Router } = require("express");
const validateUserAndRole = require("../../middleware/validateRolUser");
const { validateFields } = require("../../middleware/validateFields");
const { check } = require("express-validator");
const { deleteProduct } = require("../../controllers/products/deleteProduct");

const router = Router();

/**
 * @swagger
 * /api/products/{idUser}/deleteProduct/{productId}:
 *   delete:
 *     summary: Eliminar un producto
 *     tags: [Product]
 *     parameters:
 *       - in: path
 *         name: idUser
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del usuario
 *       - in: path
 *         name: productId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del producto que se va a eliminar
 *     responses:
 *       200:
 *         description: Producto eliminado exitosamente y referencia en la categoría actualizada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Producto eliminado y referencia en la categoría actualizada
 *       404:
 *         description: Producto no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Producto no encontrado
 *       500:
 *         description: Error al eliminar el producto
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Error al eliminar el producto
 */

router.delete(
  "/:idUser/deleteProduct/:productId",
  [
    check("idUser", "El id del usuario es obligatorio.").not().isEmpty(),
    check("productId", "El id del usuario es obligatorio.").not().isEmpty(),
    validateFields,
    validateUserAndRole,
  ],
  deleteProduct
);
module.exports = router;

module.exports = router;
