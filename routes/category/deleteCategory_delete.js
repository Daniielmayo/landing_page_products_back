const { Router } = require("express");
const validateUserAndRole = require("../../middleware/validateRolUser");
const deleteCategory = require("../../controllers/categorys/deleteCategory");

const router = Router();

/**
 * @swagger
 * /api/categories/{idUser}/deleteCategory/{categoryId}:
 *   delete:
 *     summary: Eliminar una categoría
 *     tags: [Category]
 *     parameters:
 *       - in: path
 *         name: idUser
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del usuario
 *       - in: path
 *         name: categoryId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la categoría que se va a eliminar
 *     responses:
 *       200:
 *         description: Categoría eliminada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Categoría y sus productos asociados fueron eliminados
 *       404:
 *         description: Categoría no encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Categoría no encontrada
 *       500:
 *         description: Error al eliminar la categoría
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Error al eliminar la categoría
 */
router.delete(
  "/:idUser/deleteCategory/:categoryId",
  validateUserAndRole,
  deleteCategory
);
module.exports = router;
