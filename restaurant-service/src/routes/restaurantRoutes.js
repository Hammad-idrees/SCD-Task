const express = require("express");
const {
  addRestaurant,
  getRestaurants,
  getRestaurantById,
} = require("../controllers/restaurantController");
const router = express.Router();

router.post("/", addRestaurant);
router.get("/", getRestaurants);
router.get("/:id", getRestaurantById);

module.exports = router;
