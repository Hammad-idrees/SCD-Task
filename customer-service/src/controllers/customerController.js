const Customer = require("../models/customerModel");

const registerCustomer = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const customer = new Customer({ name, email, password });
    await customer.save();
    res.status(201).json({ message: "Customer registered", customer });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error registering customer", error: error.message });
  }
};

const getCustomerById = async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);
    if (!customer)
      return res.status(404).json({ message: "Customer not found" });
    res.status(200).json(customer);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving customer", error: error.message });
  }
};

const updatePreferences = async (req, res) => {
  try {
    const { preferences } = req.body;
    const customer = await Customer.findByIdAndUpdate(
      req.params.id,
      { preferences },
      { new: true }
    );
    if (!customer)
      return res.status(404).json({ message: "Customer not found" });
    res.status(200).json({ message: "Preferences updated", customer });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating preferences", error: error.message });
  }
};

module.exports = { registerCustomer, getCustomerById, updatePreferences };
