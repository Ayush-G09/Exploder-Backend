const express = require("express");
const stockRoutes = require("./routes/stockRoutes");
const logger = require("./utils/logger");
const indexRoutes = require("./routes/indexRoutes");
const cors = require("cors");

const app = express();

const corsOptions = {
  origin: "http://localhost:3000",
};

app.use(cors(corsOptions));

// Middleware
app.use(express.json());

// Routes
app.use("/api/stocks", stockRoutes);
app.use("/api", indexRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  logger.error(err.message);
  res.status(500).json({ success: false, message: "Internal Server Error" });
});

module.exports = app;
