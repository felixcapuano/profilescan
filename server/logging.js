const { createLogger, transports, format } = require("winston");

const logger = createLogger({
  level: "info",
  format: format.json(),
  transports: [
    new transports.File({ filename: "logs/access.log", level: "info" }),
    new transports.File({ filename: "logs/error.log", level: "error" }),
  ],
  // exceptionHandlers: [
  //   new transports.File({ filename: 'logs/exceptions.log' })
  // ]
});

module.exports = logger;
