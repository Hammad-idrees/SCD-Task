const Restaurant = require("../models/restaurantModel");

const addRestaurant = async (req, res) => {
  try {
    const { name, address, menu } = req.body;
    const restaurant = new Restaurant({ name, address, menu });
    await restaurant.save();
    res.status(201).json({ message: "Restaurant added", restaurant });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error adding restaurant", error: error.message });
  }
};

const getRestaurants = async (req, res) => {
  try {
    const restaurants = await Restaurant.find();
    res.status(200).json(restaurants);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving restaurants", error: error.message });
  }
};

const getRestaurantById = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    if (!restaurant)
      return res.status(404).json({ message: "Restaurant not found" });
    res.status(200).json(restaurant);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving restaurant", error: error.message });
  }
};

module.exports = { addRestaurant, getRestaurants, getRestaurantById };
