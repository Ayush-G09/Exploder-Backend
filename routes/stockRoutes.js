const express = require("express");
const { getStockData } = require("../controllers/stockController");

const router = express.Router();

// Define a route for fetching stock data
router.get("/:symbol", getStockData);

module.exports = router;
