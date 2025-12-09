const { format } = require("date-fns");
const { v4: uuid } = require("uuid");
const path = require("path");
const fs = require("fs");
const fsPromises = require("fs").promises;

const logEvent = async (message = "No message", target = "log.txt") => {
  const date = `${format(new Date(), "LLL.dd, yyyy \t h:mm:sa")}`;
  const logEntry = `[${date}]:[${uuid()}: ${message}] \n`;

  try {
    if (!fs.existsSync("./logs")) {
      await fsPromises.mkdir("./logs");
    }
    await fsPromises.appendFile(path.join(__dirname, "logs", target), logEntry);
  } catch (err) {
    console.error(err.message);
  }
};

module.exports = { logEvent };
