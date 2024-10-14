const { Router } = require("express");
const PostCategory_creaate = require("./category/postCategory_create");
const DeleteCategory_delete = require("./category/deleteCategory_delete");

const router = Router();

router.use(PostCategory_creaate);
router.use(DeleteCategory_delete);

module.exports = router;
