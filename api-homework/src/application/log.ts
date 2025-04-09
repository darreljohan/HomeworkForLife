import winston from "winston";
import path from "path";
import fs from "fs";
import dayjs from "dayjs";

const logDir = path.join(__dirname, "../application");
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

const logFormat = winston.format.printf(
  ({ level, location, user, message, body }) => {
    const formattedBody = JSON.stringify(body, null, 2); // Format JSON with 2-space indentation
    return JSON.stringify({
      level: level,
      location: location,
      user: user,
      timestamp: dayjs().toISOString(),
      message: message,
      body: formattedBody,
    });
  }
);

export const logger = winston.createLogger({
  level: "debug",
  format: winston.format.combine(winston.format.colorize(), logFormat),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({
      filename: path.join(logDir, "app.log"),
      level: "debug",
    }),
  ],
});
