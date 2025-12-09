const express = require("express");
const router = express.Router();
const data = {};

const employeesController = require("../../controllers/employeeController");
data.employees = require("../../model/employees.json");

//use jwt tokens to protect unauthorized use of api
const { verifyJWT } = require("../../middleware/verifyJWT");
//this will cause the route to check if there is a valid
//JWT token in the response header before going through
//the route controllers
//this configuration will require a jwt verification on all
//types of html request
// router.use("/", verifyJWT);

router
  .route("/")
  //you can also specify to only use middleware on specific html requests
  //by specifying the middleware in the first
  //before the route handler/controller
  // .get(verifyJWT, employeesController.getAllEmployees)
  .get(employeesController.getAllEmployees)
  .post(employeesController.createNewEmployee)
  .put(employeesController.updateNewEmployee)
  .delete(employeesController.deleteEmployee);

router.route("/:id").get(employeesController.getEmployee);

//using controllers allows you to seperate the routes
//and the actual logic of the route

module.exports = { router };
