require("dotenv").config();

const config = {
  port: process.env.PORT || 3000,
  environment: process.env.NODE_ENV || "production",
};

module.exports = config;