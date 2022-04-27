const fs = require("fs");

/**
 * @enum {string}
 */
const logPaths = Object.freeze({
  info: `${__dirname}/logs/info.txt`,
  error: `${__dirname}/logs/error.txt`,
  debug: `${__dirname}/logs/debug.txt`,
});

fs.mkdirSync(`${__dirname}/logs`, { recursive: true });

const isLong = (msg) => {
  if (msg.length > 100) {
    return true;
  }
  return false;
};

const shortMessage = (msg) => {
  if (msg.includes("\n")) {
    const lines = msg.split("\n");
    return `${lines[0]}`;
  }
};

const writeStream = (msg, level) => {
  const _path = logPaths[level];
  const stream = fs.createWriteStream(_path);

  const message = (prefix) => {
    if (isLong(msg)) {
      console.log(
        prefix,
        `${shortMessage(msg)} 
      -> whole log can be viewed at \x1b[1;36;46m${_path}\x1b[0m`
      );
      return;
    }
    console.log(prefix, msg);
  };

  switch (level) {
    case "info":
      message("\x1b[34m INFO:  \x1b[0m");
      break;
    case "debug":
      message("\x1b[33m DEBUG: \x1b[0m");
      break;
    case "error":
      message(`\x1b[31m ERROR: \x1b[0m`);
      break;

    default:
      break;
  }

  stream.on("open", () => {
    const message = new Date().toISOString() + " : " + msg + "\n";
    stream.write(message);
  });
  stream.on("error", (e) => console.error(e));
};

module.exports = {
  /**
   * @param {String} msg
   * @param {("info"|"error"|"debug")} level
   */
  log: (msg, level) => writeStream(msg, level),

  getLogs: (name) => {
    return logPaths[name];
  },
};
