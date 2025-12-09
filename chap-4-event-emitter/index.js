const { logEvents } = require("./logEvents.js");

const readline = require("readline");
readline.emitKeypressEvents(process.stdin);
if (process.stdin.isTTY) {
  process.stdin.setRawMode(true);
}

const EventEmitter = require("events");
const { error } = require("console");
class MyEmitter extends EventEmitter {}

//initialize object
const myEmitter = new MyEmitter();
myEmitter.on("log", (msg) => logEvents(msg));

process.stdin.on("keypress", (str, key) => {
  if (key.name === "c" && key.ctrl) {
    process.stdin.setRawMode(false);
  }
  if (key.name === "return") {
    process.stdin.setRawMode(true);
  }
  myEmitter.emit("log", `Key pressed: ${key.name}`);
});

process.on("uncaughtException", (error) => {
  myEmitter.emit("log", `An error occured: ${error.message}`);
  process.exit(1);
});
