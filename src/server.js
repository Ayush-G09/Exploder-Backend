const app = require("./app");
const config = require("./config/env");
const logger = require("./utils/logger");

app.listen(config.port, () => {
  logger.info(`Server running on http://localhost:${config.port} in ${config.environment} mode`);
});
