const { format } = require("date-fns");
const { v4: uuid } = require("uuid");

const fs = require("fs");
const fsPromises = require("fs").promises;
const path = require("path");

const logEvents = async (message = "No message") => {
  const dateTime = `${format(new Date(), "LLL. dd, yyyy\t h:mm:sa")}`;
  const logItem = `${dateTime}\t ${uuid()} \t${message}\n`;
  console.log(logItem);

  try {
    if (!fs.existsSync("./logs")) {
      fs.mkdir("./logs", (err) => {
        if (err) throw err;
      });
    }
    await fsPromises.appendFile(
      path.join(__dirname, "logs", "eventLog.txt"),
      logItem
    );
  } catch (err) {
    console.log(err);
  }
};

module.exports = { logEvents };
