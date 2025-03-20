import winston from 'winston';
import path from 'path';

const { format, transports } = winston;
const { combine, timestamp, printf } = format;

// Custom format for log messages
const logFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} ${level}: ${message}`;
});

// Create logs directory if it doesn't exist
const logsDir = path.join(process.cwd(), 'logs');
const errorsDir = path.join(process.cwd(), 'errors');

// Get current date for file naming
const getDateString = () => {
  const now = new Date();
  return now.toISOString().split('T')[0]; // YYYY-MM-DD
};

// Get current timestamp for error logs
const getErrorTimestamp = () => {
  const now = new Date();
  return now.toISOString()
    .replace('T', '-')
    .replace(/:/g, '-')
    .split('.')[0]; // YYYY-MM-DD-HH-mm-ss
};

// Create logger instance
export const logger = winston.createLogger({
  format: combine(
    timestamp(),
    logFormat
  ),
  transports: [
    // Console transport
    new transports.Console({
      level: 'info',
    }),
    // Daily rotating file transport
    new transports.File({
      filename: path.join(logsDir, `${getDateString()}.log`),
      level: 'info',
    }),
  ],
});

// Create error logger instance
export const errorLogger = winston.createLogger({
  format: combine(
    timestamp(),
    logFormat
  ),
  transports: [
    // Console transport for errors
    new transports.Console({
      level: 'error',
    }),
    // Error file transport
    new transports.File({
      filename: path.join(errorsDir, `${getErrorTimestamp()}.log`),
      level: 'error',
    }),
  ],
});

// Helper function to log trade information
export function logTradeInfo(params: {
  marketPrice: number;
  quantity: string;
  attempt: number;
  txId?: string;
}) {
  const { marketPrice, quantity, attempt, txId } = params;
  const message = `Trade attempt ${attempt}: Market Price=${marketPrice}, Quantity=${quantity}${txId ? `, TX=${txId}` : ''}`;
  logger.info(message);
}

// Helper function to log errors
export function logError(error: Error | string, context?: Record<string, unknown>) {
  const message = typeof error === 'string' ? error : error.message;
  const stack = error instanceof Error ? error.stack : undefined;
  
  const errorMessage = JSON.stringify({
    message,
    stack,
    context,
  }, null, 2);
  
  errorLogger.error(errorMessage);
} 