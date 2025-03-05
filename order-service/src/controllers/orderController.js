const Order = require("../models/orderModel");
const axios = require("axios");

const placeOrder = async (req, res) => {
  try {
    const { customerId, restaurantId, items } = req.body;
    const total = items.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );

    const restaurantResponse = await axios.get(
      `http://localhost:5001/api/restaurants/${restaurantId}`
    );
    const customerResponse = await axios.get(
      `http://localhost:5002/api/customers/${customerId}`
    );

    if (!restaurantResponse.data || !customerResponse.data) {
      return res
        .status(400)
        .json({ message: "Invalid restaurant or customer" });
    }

    const order = new Order({ customerId, restaurantId, items, total });
    await order.save();
    res.status(201).json({ message: "Order placed", order });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error placing order", error: error.message });
  }
};

const getOrderStatus = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.status(200).json({ status: order.status });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving order status", error: error.message });
  }
};

const getOrderHistory = async (req, res) => {
  try {
    const orders = await Order.find({ customerId: req.params.customerId });
    res.status(200).json(orders);
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Error retrieving order history",
        error: error.message,
      });
  }
};

module.exports = { placeOrder, getOrderStatus, getOrderHistory };
