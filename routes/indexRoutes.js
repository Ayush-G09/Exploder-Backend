const express = require("express");
const { getIndicesChangeController } = require("../controllers/indexController");

const router = express.Router();

// Route to fetch today's percentage change for indices
router.get("/indices", getIndicesChangeController);

module.exports = router;
