import { PublicKey } from "@solana/web3.js";
import { config } from "dotenv";
import { z } from "zod";
import { BuyType, DCAConfig } from "../types";

// Load environment variables
config();

// Environment variables schema
const envSchema = z.object({
  DCA_BOT_RPC_ENDPOINT: z.string().url(),
  DCA_BOT_PRIVATE_KEYS: z.string().min(1),
  DCA_BOT_ASSET_ADDRESS: z.string().optional(),
  DCA_BOT_CRON: z.string().optional(),
  DCA_BOT_BUY_TYPE: z.enum(["worth", "amount"]).optional(),
  DCA_BOT_BUY_NUMBER: z.coerce.number().positive().optional(),
  DCA_BOT_SLIPPAGE_BPS: z.coerce.number().min(0).max(10000).optional(),
});

// Parse and validate environment variables
const env = envSchema.parse(process.env);

/**
 * Get Solana RPC endpoint from environment
 */
export const getRpcEndpoint = (): string => {
  return env.DCA_BOT_RPC_ENDPOINT;
};

/**
 * Get private keys from environment
 */
export const getPrivateKeys = (): string[] => {
  return env.DCA_BOT_PRIVATE_KEYS.split(",").map((key) => key.trim());
};

/**
 * Get DCA configurations from environment
 */
export const getDCAConfigs = (): DCAConfig[] => {
  const privateKeys = getPrivateKeys();

  // If specific asset configuration is provided, use it
  if (env.DCA_BOT_ASSET_ADDRESS) {
    return privateKeys.map((privateKey) => ({
      privateKey,
      assetPublicKey: new PublicKey(env.DCA_BOT_ASSET_ADDRESS!),
      cronExpression: env.DCA_BOT_CRON || "0 0 * * *", // Default to daily at midnight
      buyType: (env.DCA_BOT_BUY_TYPE || "worth") as BuyType,
      buyNumber: env.DCA_BOT_BUY_NUMBER || 0.1,
      slippageBps: env.DCA_BOT_SLIPPAGE_BPS || 100,
    }));
  }

  // If no specific configuration is provided, return empty array
  // In a real application, you might want to load configurations from a file
  return [];
};
