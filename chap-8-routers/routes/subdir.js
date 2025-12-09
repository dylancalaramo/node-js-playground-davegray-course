//routers are a sort of "mini express app" that handles routes like the server.js file
//but more specific in which routes it should handle
//routers are plugged into the main express app, allowing for an overall
//modular backend server useful to refactor/combine similar routes into
//its own file express file
//allowing for a more maintainable, scalable and readable code base

const express = require("express");
const router = express.Router();
const path = require("path");

//alternative way to allow this router
//to specify a filepath towards the static files
//router.use(express.static(path.join(__dirname, "..", "public")));

//router instead of app
router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "views", "subdir", "index.html"));
});

router.get("/test", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "views", "subdir", "test.html"));
});

module.exports = { router };
