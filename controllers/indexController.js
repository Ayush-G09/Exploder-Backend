const { getIndicesChange } = require("../services/indexService");

/**
 * Controller to get today's percentage change for indices.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
const getIndicesChangeController = async (req, res) => {
  try {
    const data = await getIndicesChange();
    res.status(200).json({ success: true, data });
  } catch (error) {
    console.error("Error in getIndicesChangeController:", error.message);
    res.status(500).json({ success: false, message: "Failed to fetch indices data" });
  }
};

module.exports = { getIndicesChangeController };
