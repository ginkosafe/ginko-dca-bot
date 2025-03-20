import winston from 'winston';
import path from 'path';
import { LogEntry, ErrorLog } from '../types';

const getLogFileName = () => {
  const date = new Date();
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}.log`;
};

const getErrorFileName = () => {
  const date = new Date();
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}-${String(date.getHours()).padStart(2, '0')}-${String(date.getMinutes()).padStart(2, '0')}-${String(date.getSeconds()).padStart(2, '0')}.log`;
};

// Create logger instance
const logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({
      filename: path.join('logs', getLogFileName()),
      level: 'info'
    }),
    new winston.transports.Console({
      format: winston.format.simple(),
      level: 'info'
    })
  ]
});

// Create error logger instance
const errorLogger = winston.createLogger({
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({
      filename: path.join('errors', getErrorFileName()),
      level: 'error'
    }),
    new winston.transports.Console({
      format: winston.format.simple(),
      level: 'error'
    })
  ]
});

export const logTrade = (entry: LogEntry) => {
  logger.info('Trade executed', entry);
};

export const logError = (error: Error, context: Partial<LogEntry> = {}) => {
  const errorLog: ErrorLog = {
    timestamp: new Date().toISOString(),
    marketPrice: context.marketPrice || 0,
    tradeAmount: context.tradeAmount || '0',
    tradeCount: context.tradeCount || 0,
    transactionId: context.transactionId,
    error: error.message,
    stack: error.stack
  };
  errorLogger.error('Trade error', errorLog);
}; 