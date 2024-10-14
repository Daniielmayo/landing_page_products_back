const { Router } = require("express");
const PostProduct_create = require("./products/postProduct_create");
const DeleteProduct_delete = require("./products/deleteProduct_delete");
const router = Router();

router.use(PostProduct_create);
router.use(DeleteProduct_delete);

module.exports = router;
