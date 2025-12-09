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

//middleware is anything that handles what happens to the request and
//what is sent as the response
//by technicality, the anonymous functions used so far on these routes
//are middleware

//in express, each html request can be configured to handle their own middleware
//to process and modify the request first before the route handlers take turn

//in express, you can use the ".use()" function to select and use functions as middleware

//express has a built-in middleware function that automatically handles
//url encoded data such as form data
//example url encoded data: 'content-type': application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));

//express has a built-in middleware that handles json data
//allows you to access the json data by calling req.body
app.use(express.json());

//express has the static middleware function that allows you to serve static files stored in the server
//static files are files that include css, images, fonts, javascript files, etc.
//essentially allows you to open a path to every single file in the chosen directory
//localhost:5000/css/styles.css is now accessible without creating a path for it
app.use(express.static(path.join(__dirname, "/public")));

//imported custom middleware from the logEvents.js file in the middleware folder
app.use(logger);

//a third party middle ware that allows Cross Origin Resource Sharing
//allows your server to accept http requests coming from another domain/origin
//it allows webpages to share resources such as images, text, etc.
//and also allows the server blacklist/whitelist specific domains
const whitelist = [
  "https://www.yoursite.com",
  "https://www.google.com",
  //development urls
  //standard to remove these before deployment
  "http://127.0.0.1:5500",
  "http://localhost:5500",
  "http://localhost:3500",
  "https://localhost:5000",
];
const corsOptions = {
  origin: (origin, callback) => {
    //use !origin during development or your server will not recognize
    //your browser
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Origin not recognized"));
    }
  },
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.get(/^\/$|\/index(.html)?/, (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

app.get(/^\/new-page(.html)?/, (req, res) => {
  res.sendFile(path.join(__dirname, "views", "new-page.html"));
});

app.get(/^\/old-page(.html)?/, (req, res) => {
  res.redirect(301, "/new-page");
});

const one = (req, res, next) => {
  //   res.send("One");
  console.log("one");
  next();
};
const two = (req, res, next) => {
  //   res.send("Two");
  console.log("two");
  next();
};
const three = (req, res) => {
  //   res.send("Three");
  console.log("three");
  res.send("Finished");
};
app.get(/chain(.html)?/, [one, two, three]);

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

//imported custom middleware from the errorHandler.js file in the middleware folder
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running at port ${PORT}`));
