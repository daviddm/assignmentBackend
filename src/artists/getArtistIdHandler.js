const fetch = require("node-fetch");
const AbortController = require("abort-controller");
const { logger } = require("../logger");

const requestTimeoutLimitMilliSecs = 500

exports.getArtistInfo = async (artistId) => {
  const url = new URL(artistId, "https://musicbrainz.org/ws/2/artist/");
  url.searchParams.set("fmt", "json");

  logger.info("Requesting " + url.toString());

  const controller = new AbortController();
  const timeout = setTimeout(() => {
    controller.abort();
  }, requestTimeoutLimitMilliSecs);

  try {
    const response = await fetch(url, {
      headers: { "user-agent": "David Application" },
      signal: controller.signal,
    });

    if (!response.ok) {
      logger.error("Request failed " + reponse.statusText);
      throw new Error("Request failed " + reponse.statusText);
    }

    const result = await response.json();
    logger.info('Result ' + JSON.stringify(result));

    return result;
  } finally {
    clearTimeout(timeout);
  }

};
