const { logEvents } = require("./logEvents");

//logs every error in every request
//an error middleware is distinguised by the 4 paramaters
//err, req, res, next
//this middleware is performed everytime an error occurs during
//the handling of the request
const errorHandler = (err, req, res, next) => {
  logEvents(`${err.name}: \t${err.message}`, "errorLog.txt");
  console.error(err.stack);
  res.status(500).send(err.message);
  //no need to use next on this middleware as the middleware
  //prematurely responds to the request with an error
};

module.exports = { errorHandler };
