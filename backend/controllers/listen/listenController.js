const express = require("express");
const http = require("http");
const asyncHandler = require("express-async-handler");

const Listen = asyncHandler(async (req, res) => {
  res.setHeader("Content-Type", "audio/mpeg");
  const stream = http.request(
    {
      hostname: "www.testnie.radio12345.com",
      port: 16579,
      path: "www.testnie.radio12345.com",
      method: "GET",
      headers: {
        "User-Agent":
          "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:77.0) Gecko/20100101 Firefox/77.0",
      },
    },
    (response) => {
      response.pipe(res);
    }
  );
  stream.on("error", (err) => {
    console.error(err);
    res.status(500).json({ message: "Error streaming audio" });
  });
  stream.end();
});

module.exports = {
    Listen
};
