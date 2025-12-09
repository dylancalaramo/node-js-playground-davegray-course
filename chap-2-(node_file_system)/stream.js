//read streams allow nodeJS to read large files---
//can be beneficial to not grab all the data at once on larger files---
//to lessen the load
//and can be used alongside write streams to write the data that was read--
//from the read stream into new files

const fs = require("fs");

//specify the file to be read on the read stream
const rs = fs.createReadStream("./files/lorem.txt", { encoding: "utf8" });

//specify the new file to be created from the read stream
const ws = fs.createWriteStream("./files/new-lorem.txt");

//you can use the rs.on listener function to turn on the read stream--
//the first parameter specifies the connection type
//the second parameter is a callback function that takes a single parameter, data--
//which is the data currently being read by the read stream
//in the example callback function, the write stream is used to
//write the data from the read stream to a text file
rs.on("data", (dataChunk) => {
  ws.write(dataChunk);
});

//the pipe function is a faster version of the example above
// rs.pipe(ws);
