const express = require("express");
const router = express.Router();
const registerController = require("../controllers/registerController");

//define the routes for the '/register' url path
router.use("/", registerController.handleNewUser);

module.exports = { router };
