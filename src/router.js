const express = require("express");
const reqLogger = require("express-request-logger");
const { logger } = require("./logger");
const { artistRouter } = require("./artists/router");

const router = express.Router();

router.use(reqLogger.create(logger));

router.use("/artists", artistRouter);

router.get("/", (req, res) => {
  res.send("Your looking for /artists/:artistId");
});

exports.router = router;
