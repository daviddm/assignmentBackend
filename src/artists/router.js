const express = require("express");
const { logger } = require("../logger");
const { getArtistInfo } = require("./getArtistIdHandler");

const artistRouter = express.Router();

artistRouter.get("/:artistId", async (req, res) => {
  try {
    const artistInfo = await getArtistInfo(req.params.artistId);
    res.send(artistInfo);
  } catch (error) {
    logger.error("Failed " + error);
    
    if (error.name === "AbortError") {
      res.status(500);
      res.send("Request Timed Out");
      return;
    }
    res.status(500);
    res.send("Internal Error");
  }
});
artistRouter.get("/", (req, res) => {
  res.send("So Close, just add the artist id");
});

exports.artistRouter = artistRouter;
