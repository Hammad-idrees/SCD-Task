const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const customerRoutes = require("./routes/customerRoutes");

const app = express();
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Customer Service connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.use("/api/customers", customerRoutes);

const PORT = process.env.PORT || 5002;
app.listen(PORT, () => {
  console.log(`Customer Service running on port ${PORT}`);
});
