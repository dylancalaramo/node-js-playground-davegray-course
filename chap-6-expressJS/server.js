const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");
const fsPromises = require("fs").promises;
const PORT = process.env.PORT || 3500;

app.get(/^\/$|^\/index(.html)?$/, (req, res) => {
  res.sendFile("./views/index.html", { root: __dirname });
});

app.get(/new-page(.html)?/, (req, res) => {
  res.sendFile("./views/new-page.html", { root: __dirname });
});

app.get(/old-page(.html)?/, (req, res) => {
  res.redirect(301, "/new-page");
});

app.get(
  /^\/hello(.html)?/,
  (req, res, next) => {
    console.log("attempted to say hello");
    next();
  },
  (req, res) => {
    res.send("Hello world!");
  }
);

const one = (req, res, next) => {
  console.log("one");
  next();
};

const two = (req, res, next) => {
  console.log("two");
  next();
};

const three = (req, res, next) => {
  console.log("three");
  res.send("Finished");
};

app.get(/^\/chain$/, [one, two, three]);

app.get(/.*/, (req, res) => {
  res.status(404).sendFile("./views/404.html", { root: __dirname });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
