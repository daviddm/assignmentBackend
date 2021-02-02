const express = require("express");
const { logger } = require("./logger");
const { router } = require("./router");

const app = express();
const port = 3000;

app.use("/", router);

app.listen(port, () => {
  logger.info(`API listening at http://localhost:${port}`);
});
