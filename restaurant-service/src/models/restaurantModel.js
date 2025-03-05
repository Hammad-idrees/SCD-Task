const mongoose = require("mongoose");

const restaurantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  menu: [
    {
      item: String,
      price: Number,
    },
  ],
});

module.exports = mongoose.model("Restaurant", restaurantSchema);
