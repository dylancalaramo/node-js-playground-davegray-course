const express = require("express");
const app = express();
const path = require("path");
const { logger } = require(path.join(__dirname, "middleware", "logEvents.js"));
const { errorHandler } = require(path.join(
  __dirname,
  "middleware",
  "errorHandler.js"
));
const cors = require("cors");
const PORT = process.env.port || 5000;
const { router: subdir } = require("./routes/subdir.js");
const { router: root } = require("./routes/root.js");
const { router: employees } = require("./routes/api/employees.js");

app.use(express.urlencoded({ extended: false }));

app.use(express.json());

app.use(express.static(path.join(__dirname, "/public")));
//you also need to specify the filepath of the static files for your routes
app.use("/subdir", express.static(path.join(__dirname, "/public")));

app.use(logger);

const whitelist = [
  "https://www.yoursite.com",
  "https://www.google.com",
  "http://127.0.0.1:5500",
  "http://localhost:5500",
  "http://localhost:3500",
  "https://localhost:5000",
];
const corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Origin not recognized"));
    }
  },
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

//import custom router
//first parameter is for the url of the route
//second parameter is the location of the router
//any url request that matches the first parameter
//will use the routes specified in the imported
//router file instead of the routes in the main
//express file
app.use("/subdir", subdir);
app.use("/", root);
app.use("/employees", employees);

app.all(`/*path`, (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ error: "404 not found" });
  } else {
    res.type("txt").send("404 not found");
  }
});

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running at port ${PORT}`));
