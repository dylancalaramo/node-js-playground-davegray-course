//MVC - Model View Controller

//Model - responsible for storing data and handling the logic
//that manipulates that data (database)

//View - responsible for displaying the data to the user (frontend)

//Controller - responsible for relaying the (Views) input from the user
//so the Model can know what data needs to modified, fetched, created, deleted, et

//in an MVC Rest API model the Controllers are responsible
//for handling the interactions between the database and the frontend
//controllers are essentially the route handlers for your api requests

//mock connect to database by creating a data object
//that contains the employee data
//and a function that edits that data
const data = {
  employees: require("../model/employees.json"),
  setEmployee: function (data) {
    this.employees = data;
  },
};

//substitute these functions as the route handler in your routes for your api
const getAllEmployees = (req, res) => {
  res.json(data.employees);
};

const getEmployee = (req, res) => {
  const employee = data.employees.find(
    (emp) => emp.id === parseInt(req.params.id)
  );

  if (!employee) {
    return res.status(400).json({ message: "no employee of this id exists" });
  }

  res.status(401).json(employee);
};

const createNewEmployee = (req, res) => {
  //check if firstname and lastname exists
  const newEmployee = {
    //get the id the last employee and add 1
    //to get the new id for the new employee
    //or set it to 1 if there are no current employees
    id: data.employees?.length
      ? data.employees[data.employees.length - 1].id + 1
      : 1,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
  };

  if (!newEmployee.firstname || !newEmployee.lastname) {
    return res
      .status(400)
      .json({ message: "first and last names are required" });
  }

  // console.log(newEmployee);
  data.setEmployee([...data.employees, newEmployee]);
  // console.log([...data.employees]);
  res.status(201).json(data.employees);
};

const updateNewEmployee = (req, res) => {
  const employee = data.employees.find(
    (emp) => emp.id === parseInt(req.body.id)
  );

  if (!employee) {
    return res.status(400).json({ message: "no employee of this id exists" });
  }

  if (req.body.firstname) employee.firstname = req.body.firstname;
  if (req.body.lastname) employee.lastname = req.body.lastname;

  const otherEmployeesArray = data.employees.filter(
    (emp) => emp.id !== parseInt(req.body.id)
  );

  const sortedEmployeesArray = [...otherEmployeesArray, employee].sort(
    (a, b) => a.id - b.id
  );
  // console.log(sortedEmployeesArray);
  data.setEmployee(sortedEmployeesArray);
  res.status(201).json(data.employees);
};

const deleteEmployee = (req, res) => {
  const selectedEmployee = data.employees.find(
    (emp) => emp.id === parseInt(req.body.id)
  );
  // console.log(selectedEmployee);
  if (!selectedEmployee) {
    return res.status(401).json({
      message: "np employee of this id exists",
    });
  }
  const filteredEmployeeArray = data.employees.filter(
    (emp) => emp.id !== parseInt(req.body.id)
  );

  data.setEmployee([...filteredEmployeeArray]);
  res
    .status(401)
    .json({ message: "employee deleted", employees: [data.employees] });
};

module.exports = {
  getAllEmployees,
  getEmployee,
  createNewEmployee,
  updateNewEmployee,
  deleteEmployee,
};
