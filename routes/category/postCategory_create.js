const { Router } = require("express");
const createCategory = require("../../controllers/categorys/postCategory");
const validateUserAndRole = require("../../middleware/validateRolUser");

const router = Router();
/**
 * @swagger
 * components:
 *   schemas:
 *     Category:
 *       type: object
 *       required:
 *         - name
 *         - description
 *       properties:
 *         name:
 *           type: string
 *           description: Nombre de la categoría
 *         description:
 *           type: string
 *           description: Descripción de la categoría
 *       example:
 *         name: Niños
 *         description: Categoría de productos de niños
 */
/**
 * @swagger
 * /api/categories/{idUser}/createCategory:
 *   post:
 *     summary: Crear una nueva categoría
 *     tags: [Category]
 *     parameters:
 *       - in: path
 *         name: idUser
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del usuario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Category'
 *     responses:
 *       200:
 *         description: La categoría fue creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error al crear la categoría
 */
router.post("/:idUser/createCategory", validateUserAndRole, createCategory);
module.exports = router;
