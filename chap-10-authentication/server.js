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
const { router: register } = require("./routes/register.js");
const { router: auth } = require("./routes/authentication.js");
const { corsOptions } = require("./config/corsOptions.js");

app.use(express.urlencoded({ extended: false }));

app.use(express.json());

app.use(express.static(path.join(__dirname, "/public")));
app.use("/subdir", express.static(path.join(__dirname, "/public")));

app.use(logger);

app.use(cors(corsOptions));

//routes
app.use("/subdir", subdir);
app.use("/", root);
app.use("/employees", employees);
app.use("/register", register);
app.use("/auth", auth);

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
