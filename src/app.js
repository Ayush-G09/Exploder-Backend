const express = require("express");
const stockRoutes = require("./routes/stockRoutes");
const logger = require("./utils/logger");

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use("/api/stocks", stockRoutes);

app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

// Error handling middleware
app.use((err, req, res, next) => {
  logger.error(err.message);
  res.status(500).json({ success: false, message: "Internal Server Error" });
});

module.exports = app;
