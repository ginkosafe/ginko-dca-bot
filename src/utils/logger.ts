import fs from "fs";
import path from "path";
import { format } from "date-fns";
import winston from "winston";

// Ensure log directories exist
const logsDir = path.join(process.cwd(), "logs");
const errorsDir = path.join(process.cwd(), "errors");

if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}

if (!fs.existsSync(errorsDir)) {
  fs.mkdirSync(errorsDir, { recursive: true });
}

// Get current date for log filenames
const getLogFileName = () => {
  return format(new Date(), "yyyy-MM-dd");
};

// Get current timestamp for error log filenames
const getErrorLogFileName = () => {
  return format(new Date(), "yyyy-MM-dd-HH-mm-ss");
};

// Create main logger
export const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp({
      format: "YYYY-MM-DD HH:mm:ss",
    }),
    winston.format.printf(
      (info) => `${info.timestamp} ${info.level}: ${info.message}`
    )
  ),
  transports: [
    // Console output
    new winston.transports.Console(),
    // Daily log file
    new winston.transports.File({
      filename: path.join(logsDir, `${getLogFileName()}.log`),
      level: "info",
    }),
  ],
});

// Function to log errors to the errors directory
export function logError(error: Error): void {
  const errorLogPath = path.join(errorsDir, `${getErrorLogFileName()}.log`);

  // Format error details
  const errorDetails = [
    `Time: ${format(new Date(), "yyyy-MM-dd HH:mm:ss")}`,
    `Error: ${error.name}`,
    `Message: ${error.message}`,
    `Stack: ${error.stack || "No stack trace available"}`,
  ].join("\n");

  // Write error to file
  fs.writeFileSync(errorLogPath, errorDetails);

  // Also log to the main logger
  logger.error(`Error: ${error.message}. Details saved to ${errorLogPath}`);
}

// Function to log trade information
export function logTrade(
  symbol: string,
  price: number,
  quantity: string,
  attempt: number,
  txId?: string
): void {
  const status = txId ? "SUCCESS" : "FAILED";
  const txInfo = txId ? `TX: ${txId}` : "";

  logger.info(
    `TRADE ${status} | Asset: ${symbol} | Price: ${price} | Quantity: ${quantity} | Attempt: ${attempt} ${txInfo}`
  );
}

// Export the logger instance as default
export default logger;
