const yahooFinance = require("yahoo-finance2").default;

const indices = [
  "^CNXENERGY",
  "NIFTY_OIL_AND_GAS.NS",
  "NIFTY_CONSR_DURBL.NS",
  "^CNXMETAL",
  "^CNXREALTY",
  "^CNXAUTO",
  "^CNXFMCG",
  "NIFTY_FIN_SERVICE.NS",
  "NIFTY_HEALTHCARE.NS",
  "^CNXPHARMA",
  "^CNXIT",
  "^CNXMEDIA",
  "^CNXPSUBANK"
];

/**
 * Fetch today's percentage change for a list of indices.
 * @returns {Promise<Object[]>} Array of indices with today's % change.
 */
const getIndicesChange = async () => {
  const results = [];

  for (const index of indices) {
    try {
      const data = await yahooFinance.quote(index);
      const { regularMarketChangePercent } = data;

      if (regularMarketChangePercent !== undefined) {
        results.push({
          index,
          changePercentage: regularMarketChangePercent.toFixed(2) // Format to 2 decimal places
        });
      } else {
        results.push({ index, error: "Change percentage not available" });
      }
    } catch (error) {
      console.error(`Error fetching data for index ${index}:`, error.message);
      results.push({ index, error: "Failed to fetch data" });
    }
  }

  return results;
};

module.exports = { getIndicesChange };
