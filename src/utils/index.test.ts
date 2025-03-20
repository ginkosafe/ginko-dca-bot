import { expect, test, describe } from "bun:test";
import {
  bpsToDecimal,
  formatDate,
  formatTimestamp,
  safeJsonParse,
  truncateString,
} from "./index";

describe("Utility Functions", () => {
  test("formatDate should format date correctly", () => {
    const date = new Date("2023-01-15T12:30:45.000Z");
    expect(formatDate(date)).toBe("2023-01-15");
  });

  test("formatTimestamp should format timestamp correctly", () => {
    const date = new Date("2023-01-15T12:30:45.000Z");
    expect(formatTimestamp(date)).toBe("2023-01-15-12-30-45");
  });

  test("bpsToDecimal should convert basis points to decimal", () => {
    expect(bpsToDecimal(100)).toBe(0.01);
    expect(bpsToDecimal(50)).toBe(0.005);
    expect(bpsToDecimal(0)).toBe(0);
  });

  test("truncateString should truncate strings longer than maxLength", () => {
    expect(truncateString("Hello World", 5)).toBe("He...");
    expect(truncateString("Hello", 5)).toBe("Hello");
    expect(truncateString("", 5)).toBe("");
  });

  test("safeJsonParse should parse valid JSON", () => {
    const jsonString = '{"name":"John","age":30}';
    const result = safeJsonParse(jsonString, {});
    expect(result).toEqual({ name: "John", age: 30 });
  });

  test("safeJsonParse should return default value for invalid JSON", () => {
    const jsonString = '{"name":"John",age:30}'; // Invalid JSON (missing quotes)
    const defaultValue = { name: "Default", age: 0 };
    const result = safeJsonParse(jsonString, defaultValue);
    expect(result).toEqual(defaultValue);
  });
});
