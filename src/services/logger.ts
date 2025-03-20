import { createLogger, format, transports } from "winston";
import * as fs from "fs";
import * as path from "path";

// Ensure logs and errors directories exist
const logsDir = path.join(process.cwd(), "logs");
const errorsDir = path.join(process.cwd(), "errors");

if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}

if (!fs.existsSync(errorsDir)) {
  fs.mkdirSync(errorsDir, { recursive: true });
}

// Get current date for log file names
const getCurrentDate = (): string => {
  const date = new Date();
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
};

// Get current timestamp for error log file names
const getCurrentTimestamp = (): string => {
  const date = new Date();
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}-${String(date.getHours()).padStart(2, "0")}-${String(date.getMinutes()).padStart(2, "0")}-${String(date.getSeconds()).padStart(2, "0")}`;
};

// Create standard logger
const logger = createLogger({
  level: "info",
  format: format.combine(
    format.timestamp({
      format: "YYYY-MM-DD HH:mm:ss",
    }),
    format.printf(({ level, message, timestamp }) => {
      return `${timestamp} ${level.toUpperCase()}: ${message}`;
    })
  ),
  transports: [
    // Log to console
    new transports.Console(),
    // Log to file
    new transports.File({
      filename: path.join(logsDir, `${getCurrentDate()}.log`),
    }),
  ],
});

/**
 * Log transaction details
 * @param marketPrice Market price of the asset
 * @param tradeAmount Amount of asset bought
 * @param attempt Transaction attempt number
 * @param txSignature Transaction signature
 */
export const logTransaction = (
  marketPrice: number,
  tradeAmount: number,
  attempt: number,
  txSignature?: string
): void => {
  const message = `Transaction - Market Price: ${marketPrice}, Amount: ${tradeAmount}, Attempt: ${attempt}${txSignature ? `, TX: ${txSignature}` : ""}`;
  logger.info(message);
};

/**
 * Log error to error log file
 * @param error Error message or object
 * @param details Additional error details
 */
export const logError = (
  error: Error | string,
  details?: Record<string, any>
): void => {
  const errorMessage = typeof error === "string" ? error : error.message;
  const stackTrace = error instanceof Error ? error.stack : "";

  // Log to standard logger
  logger.error(`Error: ${errorMessage}`);

  // Create error-specific logger
  const errorLogger = createLogger({
    level: "error",
    format: format.combine(
      format.timestamp({
        format: "YYYY-MM-DD HH:mm:ss",
      }),
      format.printf(({ message, timestamp }) => {
        return `${timestamp}: ${message}`;
      })
    ),
    transports: [
      new transports.File({
        filename: path.join(errorsDir, `${getCurrentTimestamp()}.log`),
      }),
    ],
  });

  // Log error details
  errorLogger.error(`Error: ${errorMessage}`);
  if (stackTrace) {
    errorLogger.error(`Stack Trace: ${stackTrace}`);
  }
  if (details) {
    errorLogger.error(`Details: ${JSON.stringify(details, null, 2)}`);
  }
};

/**
 * Log general info message
 * @param message Info message
 */
export const logInfo = (message: string): void => {
  logger.info(message);
};

export default {
  logTransaction,
  logError,
  logInfo,
};
