import { z } from 'zod';
import { PublicKey } from '@solana/web3.js';

// Configuration schema for buy settings
export const BuySettingsSchema = z.object({
  type: z.enum(['worth', 'amount']),
  number: z.string(), // Using string to handle large numbers safely
});

// Configuration schema for a single DCA order
export const DCAConfigSchema = z.object({
  wallet: z.string(),
  asset: z.string(),
  trade_mint: z.string(),
  buy_frequency: z.string(), // cron expression
  buy_settings: BuySettingsSchema,
  slippage: z.number().min(0).max(10000), // basis points (0-10000)
});

// Array of DCA configurations
export const DCAConfigArraySchema = z.array(DCAConfigSchema);

// Types derived from the schemas
export type BuySettings = z.infer<typeof BuySettingsSchema>;
export type DCAConfig = z.infer<typeof DCAConfigSchema>;

// Environment variable schema
export const EnvSchema = z.object({
  DCA_BOT_RPC_ENDPOINT: z.string().url(),
  DCA_BOT_PRIVATE_KEYS: z.string(),
});

// Parsed configuration with PublicKey objects
export interface ParsedDCAConfig extends Omit<DCAConfig, 'wallet' | 'asset' | 'trade_mint'> {
  wallet: PublicKey;
  asset: PublicKey;
  trade_mint: PublicKey;
}

// Helper function to parse string to PublicKey
export function parseConfig(config: DCAConfig): ParsedDCAConfig {
  return {
    ...config,
    wallet: new PublicKey(config.wallet),
    asset: new PublicKey(config.asset),
    trade_mint: new PublicKey(config.trade_mint),
  };
}

// Helper function to validate environment variables
export function validateEnv(): z.infer<typeof EnvSchema> {
  const env = EnvSchema.parse(process.env);
  return env;
}

// Helper function to validate configuration array
export function validateConfig(config: unknown): DCAConfig[] {
  return DCAConfigArraySchema.parse(config);
} 