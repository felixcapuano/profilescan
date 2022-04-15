const winston = require("winston")

export const logger = winston.createLogger({
  level: 'info',
  format: winston.json(),
  transports: [
    new winston.transports.File({ filename: 'access.log', level: 'info' }),
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
  ]
});