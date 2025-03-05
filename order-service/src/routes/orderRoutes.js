const express = require("express");
const {
  placeOrder,
  getOrderStatus,
  getOrderHistory,
} = require("../controllers/orderController");
const router = express.Router();

router.post("/", placeOrder);
router.get("/:id/status", getOrderStatus);
router.get("/:customerId/history", getOrderHistory);

module.exports = router;
