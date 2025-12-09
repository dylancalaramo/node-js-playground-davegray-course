console.log("hi computer");
// console.log(globalThis);

//common nodejs module that fetches the user's os info
const os = require("os");
const path = require("path");
const { add, subtract, multiply, divide } = require("./math");

console.log(add(2, 3));
console.log(subtract(2, 3));
console.log(multiply(2, 3));
console.log(divide(2, 3));

// console.log(os.type());
// console.log(os.version());
// console.log(os.homedir());

// console.log(__dirname);
// console.log(__filename);

//__filename is a nodeJS variable that contains a string of the filepath of the
//currently executed js file

//return string of full directory filepath of nodejs file
console.log(path.dirname(__filename));
//return the name of the nodejs file (including extension)
console.log(path.basename(__filename));
//return only the extension of the selected file (im this case .js)
console.log(path.extname(__filename));
