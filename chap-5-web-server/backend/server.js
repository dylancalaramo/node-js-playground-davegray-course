const http = require("http");
const path = require("path");
const fs = require("fs");
const fsPromises = require("fs").promises;

const { logEvent } = require("./logEvents");
const EventEmitter = require("events");
class Emitter extends EventEmitter {}
const myEmitter = new Emitter();
myEmitter.on("log", (msg, target) => {
  logEvent(msg, target);
});

const PORT = process.env.PORT || 3500;

const serveFile = async (filePath, statusCode, contentType, response) => {
  // console.log(contentType);
  try {
    const rawData = await fsPromises.readFile(
      filePath,
      !contentType.includes("image") ? "utf8" : ""
    );
    const data =
      contentType === "application/json" ? JSON.parse(rawData) : rawData;
    response.writeHead(statusCode, {
      ContentType: contentType,
    });
    response.end(
      contentType === "application/json" ? JSON.stringify(data) : data
    );
  } catch (err) {
    console.log(err);
    myEmitter.emit(
      "log",
      `${response.url} \t ${response.method}`,
      "errorLog.txt"
    );
    response.statusCode = 500;
    response.end();
  }
};

const server = http.createServer((req, res) => {
  // console.log(req.url, req.method);
  myEmitter.emit("log", `${req.url} \t ${req.method}`, "reqLog.txt");
  const extension = path.extname(req.url);
  const extensionDict = {
    text: [".css", ".javascript", ".txt", ".html"],
    application: [".json"],
    image: [".jpeg", ".png", ".gif"],
    audio: [".mpeg", ".mp3"],
    video: [".mp4"],
  };

  const contentMatch = Object.keys(extensionDict).find((key) =>
    extensionDict[key].includes(extension)
  );
  const contentType =
    extension === ".txt"
      ? "text/plain"
      : contentMatch
      ? `${contentMatch}/${extension.slice(1)}`
      : "text/html";

  let filePath =
    contentType === "text/html" && req.url === "/"
      ? path.join(__dirname, "views", "index.html")
      : contentType === "text/html" && req.url.slice(-1) === "/"
      ? path.join(__dirname, "views", req.url, "index.html")
      : contentType === "text/html"
      ? path.join(__dirname, "views", req.url)
      : path.join(__dirname, req.url);

  if (!extension && req.url.slice(-1) !== "/") {
    filePath += ".html";
  }

  const fileExists = fs.existsSync(filePath);

  if (fileExists) {
    serveFile(filePath, 200, contentType, res);
  } else {
    switch (path.parse(filePath).base) {
      case "old-page.html":
        serveFile(
          path.join(__dirname, "views", "new-page.html"),
          201,
          "text/html",
          res
        );
        break;
      case "www-page.html":
        serveFile(
          path.join(__dirname, "views", "index.html"),
          201,
          "text/html",
          res
        );
        break;
      default:
        serveFile(
          path.join(__dirname, "views", "404.html"),
          404,
          "text/html",
          res
        );
        break;
    }
  }
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
