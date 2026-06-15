const express = require("express");
const productHandler = require("../handlers/productHandler");

const router = express.Router();

router.post("/", productHandler.createProduct);
router.get("/", productHandler.getAllProducts);
router.get("/:id", productHandler.getProductById);
router.put("/:id", productHandler.updateProduct);
router.delete("/:id", productHandler.deleteProduct);

module.exports = router;
