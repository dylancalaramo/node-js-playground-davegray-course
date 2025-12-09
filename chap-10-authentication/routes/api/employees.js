const express = require("express");
const router = express.Router();
const data = {};

//import the controllers to the routes of your api
const employeesController = require("../../controllers/employeeController");
data.employees = require("../../model/employees.json");

//use the imported controllers as the route handler
router
  .route("/")
  .get(employeesController.getAllEmployees)
  .post(employeesController.createNewEmployee)
  .put(employeesController.updateNewEmployee)
  .delete(employeesController.deleteEmployee);

router.route("/:id").get(employeesController.getEmployee);

//using controllers allows you to seperate the routes
//and the actual logic of the route

module.exports = { router };
