console.log("testing");

//import newly installed npm module date-fns
const { format } = require("date-fns");

//import the v4 function of the uuid npm module
//you can also import uuid and use uuid.v4 instead for the same effect
const { v4: uuid } = require("uuid");

//format date-fns function takes a date (today in this example)
//and then formats it to your specified format
console.log(format(new Date(), "LLL/dd/yyyy\th:mm:ssa"));

console.log(uuid());
