const { format } = require("date-fns");
const { v4: uuid } = require("uuid");

const fs = require("fs");
const fsPromises = require("fs").promises;
const path = require("path");

const logEvents = async (message, target = "log.txt") => {
  const date = `${format(new Date(), "LLL/dd/yyyy \t HH:mm:ss")}`;
  const logItem = `${date} \t ${uuid()} \t ${message}\n`;

  try {
    if (!fs.existsSync(path.join(__dirname, "..", "logs"))) {
      await fsPromises.mkdir(path.join(__dirname), "..", "logs");
    }
    console.log(target);
    await fsPromises.appendFile(
      path.join(__dirname, "..", "logs", target),
      logItem
    );
  } catch (error) {
    console.error(error.message);
    if (!fs.existsSync(path.join(__dirname, "..", "logs"))) {
      await fsPromises.mkdir(path.join(__dirname), "..", "logs");
    }
    await fsPromises.appendFile(
      path.join(__dirname, "logs", "errorLog.txt"),
      `Error adding log: ${logItem} \t ${error.messge}`
    );
  }
};

//custom middleware that logs the request method
const logger = (req, res, next) => {
  logEvents(
    `${req.method}\t${req.headers.origin}\t${req.headers.origin}`,
    "reqLog.txt"
  );
  //   console.log(`${req.method} \t ${req.path}`);
  //almost all middleware will utilize the next() function
  //tells the response handler that the middleware has finished execution
  //and should move to the next middleware/handle whatever next is needed
  next();
};

module.exports = { logEvents, logger };
