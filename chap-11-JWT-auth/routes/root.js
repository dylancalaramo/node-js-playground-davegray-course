const express = require("express");
const path = require("path");
const router = express.Router();

router.get(/^\/$|\/index(.html)?/, (req, res) => {
  res.sendFile(path.join(__dirname, "..", "views", "index.html"));
});

router.get(/^\/new-page(.html)?/, (req, res) => {
  res.sendFile(path.join(__dirname, "..", "views", "new-page.html"));
});

router.get(/^\/old-page(.html)?/, (req, res) => {
  res.redirect(301, "/new-page");
});

const one = (req, res, next) => {
  //   res.send("One");
  console.log("one");
  next();
};
const two = (req, res, next) => {
  //   res.send("Two");
  console.log("two");
  next();
};
const three = (req, res) => {
  //   res.send("Three");
  console.log("three");
  res.send("Finished");
};
router.get(/chain(.html)?/, [one, two, three]);

module.exports = { router };
