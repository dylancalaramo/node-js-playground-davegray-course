//fs also has the ability to create and delete new folder directories
const fs = require("fs");

//existsSync returns true if the specified directory exists
//check if file directory exists, then create a new folder if it doesn't
if (!fs.existsSync("./new")) {
  //mkdir creates a new folder directory in the specified location
  fs.mkdir("./new", (err) => {
    if (err) throw err;
    console.log("Created a new folder");
  });
}

if (fs.existsSync("./new")) {
  //rmdir deletes a specified directory
  fs.rmdir("./new", (err) => {
    if (err) throw err;
    console.log("Deleted the folder");
  });
}

process.on("uncaughtException", (error) => {
  console.log(`Uncaught Error: ${error}`);
  process.exit(1);
});
