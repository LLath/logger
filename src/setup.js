const fs = require("fs");

const Logger = (exports.Logger = {});

const logPaths = {
  info: `${__dirname}/logs/info.txt`,
  error: `${__dirname}/logs/error.txt`,
  debug: `${__dirname}/logs/debug.txt`,
};

fs.mkdirSync(`${__dirname}/logs`, { recursive: true });

//#region create Streams
// TODO: logg server
let infoStream = fs.createWriteStream(logPaths.info);
let errorStream = fs.createWriteStream(logPaths.error);
let debugStream = fs.createWriteStream(logPaths.debug);
//#endregion

//#region Logger Functions
Logger.info = (msg) => {
  writeStream(msg, infoStream);
};

Logger.error = (msg) => {
  writeStream(msg, errorStream);
};

Logger.debug = (msg) => {
  writeStream(msg, debugStream);
};

Logger.getLogs = (name) => {
  // const text = fs.readFileSync(logPaths[name], "utf8");
  // return text;
  return logPaths[name];
};
//#endregion

infoStream.on("error", (e) => console.error(e));

const writeStream = (msg, stream) => {
  stream.on("open", () => {
    const message = new Date().toISOString() + " : " + msg + "\n";
    stream.write(message);
  });
};
