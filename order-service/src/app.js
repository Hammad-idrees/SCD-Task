const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const orderRoutes = require("./routes/orderRoutes");

const app = express();
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Order Service connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.use("/api/orders", orderRoutes);

const PORT = process.env.PORT || 5003;
app.listen(PORT, () => {
  console.log(`Order Service running on port ${PORT}`);
});
