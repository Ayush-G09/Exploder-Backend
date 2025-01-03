const stockService = require("../services/stockService");

const getStockData = async (req, res) => {
  const { symbol } = req.params;

  try {
    const metrics = await stockService.getStockMetrics(symbol);
    res.status(200).json({ success: true, data: metrics });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getStockData };
