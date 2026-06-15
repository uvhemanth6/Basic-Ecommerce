const express = require("express");
const orderHandler = require("../handlers/orderHandler");

const router = express.Router();

router.post("/", orderHandler.createOrder);
router.get("/", orderHandler.getAllOrders);
router.get("/:id", orderHandler.getOrderById);
router.put("/:id", orderHandler.updateOrderStatus);
router.delete("/:id", orderHandler.deleteOrder);

module.exports = router;
