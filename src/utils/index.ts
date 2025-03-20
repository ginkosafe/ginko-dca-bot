/**
 * Utility functions for DCA bot
 */

/**
 * Sleep for specified duration
 * @param ms Milliseconds to sleep
 * @returns Promise that resolves after the specified duration
 */
export const sleep = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

/**
 * Format a date as YYYY-MM-DD
 * @param date Date to format
 * @returns Formatted date string
 */
export const formatDate = (date: Date = new Date()): string => {
  return date.toISOString().split("T")[0];
};

/**
 * Format timestamp as YYYY-MM-DD-HH-mm-ss
 * @param date Date to format
 * @returns Formatted timestamp string
 */
export const formatTimestamp = (date: Date = new Date()): string => {
  return date.toISOString().replace("T", "-").replace(/:/g, "-").split(".")[0];
};

/**
 * Convert basis points to decimal
 * @param bps Basis points (1 basis point = 0.01%)
 * @returns Decimal value (e.g., 100 basis points = 0.01)
 */
export const bpsToDecimal = (bps: number): number => {
  return bps / 10000;
};

/**
 * Truncate a string to a specific length, adding ellipsis if truncated
 * @param str String to truncate
 * @param maxLength Maximum length
 * @returns Truncated string
 */
export const truncateString = (str: string, maxLength: number): string => {
  if (str.length <= maxLength) return str;
  return str.substring(0, maxLength - 3) + "...";
};

/**
 * Safely parse JSON, returning default value if parsing fails
 * @param jsonString JSON string to parse
 * @param defaultValue Default value to return if parsing fails
 * @returns Parsed JSON or default value
 */
export const safeJsonParse = <T>(jsonString: string, defaultValue: T): T => {
  try {
    return JSON.parse(jsonString) as T;
  } catch (error) {
    return defaultValue;
  }
};
