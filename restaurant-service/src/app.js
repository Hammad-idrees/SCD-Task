const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const restaurantRoutes = require("./routes/restaurantRoutes");

const app = express();
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Restaurant Service connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.use("/api/restaurants", restaurantRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Restaurant Service running on port ${PORT}`);
});
