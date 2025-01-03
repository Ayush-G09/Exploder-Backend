const yahooFinance = require("yahoo-finance2").default;

const getStockMetrics = async (symbol) => {
  try {
    const data = await yahooFinance.quote(symbol);

    // Extract necessary fields
    const currentPrice = data.regularMarketPrice;
    const openPrice = data.regularMarketOpen;
    const currentVolume = data.regularMarketVolume;
    const avgDailyVolume = data.averageDailyVolume3Month;

    // Calculate the start date for the last 5 days dynamically
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(endDate.getDate() - 5); // Subtract 5 days

    // Convert the dates to the proper format (ISO string)
    const startDateISO = startDate.toISOString().split('T')[0]; // "YYYY-MM-DD"
    const endDateISO = endDate.toISOString().split('T')[0]; // "YYYY-MM-DD"

    // Fetch historical prices for the last 5 days
    const historicalPrices = await yahooFinance.historical(symbol, {
      period1: startDateISO, // Start date
      period2: endDateISO,    // End date
    });

    const historicalVolumes = historicalPrices.map((day) => day.volume);

    // Price Momentum in %
    const priceMomentum = ((currentPrice - openPrice) / openPrice) * 100;

    // Volume Momentum ratio
    const volumeMomentum = currentVolume / avgDailyVolume;

    // Volatility Factor: Simple approximation of volatility based on last 5 days' prices
    const prices = historicalPrices.map((day) => day.close);
    const averagePrice = prices.reduce((a, b) => a + b, 0) / prices.length;
    const volatilityFactor = (currentPrice - averagePrice) / averagePrice;

    // Institutional Flow Factor: Can be approximated by comparing current volume with average volume
    const institutionalFlowFactor = currentVolume / avgDailyVolume;

    // Sentiment Factor: Dummy value for now (can be replaced with sentiment analysis API)
    const sentimentFactor = Math.random() * 2 - 1; // Random value between -1 and 1

    // R-Factor Type 2 Calculation
    const rFactorType2 = (priceMomentum * 0.3) + (volumeMomentum * 0.2) + (volatilityFactor * 0.2) + (institutionalFlowFactor * 0.15) + (sentimentFactor * 0.15);

    // Combined R-Factor (price and volume momentum)
    const rFactor = ((priceMomentum + volumeMomentum) / 2) * 50;

    return {
      symbol: data.symbol,
      currentPrice,
      openPrice,
      currentVolume,
      avgDailyVolume,
      priceMomentum,
      volumeMomentum,
      rFactor,
      rFactorType2,
    };
  } catch (error) {
    throw new Error(`Failed to fetch stock data for ${symbol}: ${error.message}`);
  }
};

module.exports = { getStockMetrics };