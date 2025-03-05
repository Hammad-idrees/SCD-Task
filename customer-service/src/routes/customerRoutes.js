const express = require("express");
const {
  registerCustomer,
  getCustomerById,
  updatePreferences,
} = require("../controllers/customerController");
const router = express.Router();

router.post("/register", registerCustomer);
router.get("/:id", getCustomerById);
router.put("/:id/preferences", updatePreferences);

module.exports = router;
