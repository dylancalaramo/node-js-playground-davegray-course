const fs = require("fs");
const path = require("path");
const fsPromises = require("fs").promises;

//read the contents of the specified file indicated on the first paramater
//you can also specify how the data of the file should be read (utf-8 in this case)
//the data from the file is streamed asynchronously
// fs.readFile(
//   path.join(__dirname, "files", "starter.txt"),
//   "utf-8",
//   (err, data) => {
//     if (err) throw err;
//     console.log(data.toString());
//   }
// );

//you can write files on nodeJS using the writeFile function
//specify the directory and the name of the file in the first parameter
//the second parameter specifies the data to be written as the content of the file
//the third parameter is the callback function that runs after the file is written
//or if an error occured
//writeFile will replace the file completely if it already exists
// fs.writeFile(
//   path.join(__dirname, "files", "reply.txt"),
//   "Nice to meet you",
//   (err) => {
//     if (err) throw err;
//     console.log("write complete");

//     //since writeFile is an asynchronous opperation
//     //it may be better to place other functions that manipulate
//     //the created file inside the callback function to ensure
//     //the the file is created first before you begin to
//     //manipulate it

//     //you can update files using the appendFile function
//     //if the file doesn't exist, nodejs will create a file instead
//     //is similar to the writeFile function, but this can also edit the file
//     //if the file already exists
//     fs.appendFile(
//       path.join(__dirname, "files", "reply.txt"),
//       "\nNice to meet you too",
//       (err) => {
//         if (err) throw err;
//         console.log("Append complete");

//         //rename files using the rename Function
//         //first param is the directory of the file to be renamed
//         //second param is new name of the file and which directory
//         //it should be placed in
//         fs.rename(
//           path.join(__dirname, "files", "reply.txt"),
//           path.join(__dirname, "files", "newReply.text"),
//           (err) => {
//             if (err) throw err;
//             console.log("rename complete");
//           }
//         );
//       }
//     );
//   }
// );

// //difference between the ordinary fs and fsPromise --
// //both fs and fsPromise are asyncronous but the difference is fsPromise functions--
// //can use traditional async/await JS syntax to create promises

const fileOps = async () => {
  try {
    const data = await fsPromises.readFile(
      path.join(__dirname, "files", "starter.txt"),
      "utf-8"
    );
    //unlink is abother way to delete a file using the fs common module system
    //deletes a symbolic link specified in the path directory, or a file if it exists
    await fsPromises.unlink(path.join(__dirname, "files", "starter.txt"));

    await fsPromises.writeFile(
      path.join(__dirname, "files", "reply.txt"),
      data
    );

    await fsPromises.appendFile(
      path.join(__dirname, "files", "reply.txt"),
      "/nNice to meet you too"
    );

    await fsPromises.rename(
      path.join(__dirname, "files", "reply.txt"),
      path.join(__dirname, "files", "newReply.txt")
    );

    const newData = await fsPromises.readFile(
      path.join(__dirname, "files", "newReply.txt"),
      "utf-8"
    );

    console.log(newData);
  } catch (err) {
    console.error(err);
  }
};

fileOps();

//you can manipulate the current process using the process syntax
//process.on starts a listener for a specified event and then runs
//the anonymous function when the listener is triggered
//in this example, we are listening for any uncaughtException errors
//and then use an arrow function to log the error into the console
//and finally, we exit the process using process.exit(1) to prematurely
//stop the process
//refer to the nodeJS documentation for more information about events
process.on("uncaughtException", (err) => {
  console.error(`there was an uncaught error: ${err.message}`);
  process.exit(1);
});
