const express = require("express");
const router = express.Router();
const data = {};
data.employees = require("../../data/employees.json");

router
  .route("/")
  .get((req, res) => {
    res.json(data.employees);
  })
  .post((req, res) => {
    res.json({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
    });
  })
  .put((req, res) => {
    res.json({
      firstname: req.body.firstname,
    });
  })
  .delete((req, res) => {
    res.json({
      id: req.body.id,
    });
  });

router
  .route("/:id")
  .get((req, res) => {
    res.json({ id: req.params.id });
  })
  .post((req, res) => {
    res.json({
      id: req.params.id,
      firstname: req.query.firstname,
      lastname: req.query.lastname,
    });
  })
  .put((req, res) => {
    res.json({
      firstname: req.params.firstname,
      lastname: req.params.lastname,
    });
  })
  .delete((req, res) => {
    res.json({
      id: req.body.id,
    });
  });

module.exports = { router };
