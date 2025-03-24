import { z } from "zod";
import { PublicKey } from "@solana/web3.js";
import BigNumber from "bignumber.js";

// Environment variables schema
export const EnvSchema = z.object({
  DCA_BOT_RPC_ENDPOINT: z.string().url(),
  DCA_BOT_PRIVATE_KEYS: z.string().min(1),
  PRICE_API_URL: z.string().url(),
});

export type Env = z.infer<typeof EnvSchema>;

// Buy settings schema
export const BuySettingsSchema = z.object({
  type: z.enum(["worth", "amount"]),
  number: z.string().min(1),
});

export type BuySettings = z.infer<typeof BuySettingsSchema>;

// Asset schema
export const AssetSchema = z.object({
  mint: z.string().refine(
    (value) => {
      try {
        new PublicKey(value);
        return true;
      } catch (e) {
        return false;
      }
    },
    { message: "Invalid mint public key" }
  ),
  symbol: z.string().min(1),
});

export type Asset = z.infer<typeof AssetSchema>;

// Config item schema
export const ConfigItemSchema = z.object({
  wallet: z.string().refine(
    (value) => {
      try {
        new PublicKey(value);
        return true;
      } catch (e) {
        return false;
      }
    },
    { message: "Invalid wallet public key" }
  ),
  asset: AssetSchema,
  trade_mint: z.string().refine(
    (value) => {
      try {
        new PublicKey(value);
        return true;
      } catch (e) {
        return false;
      }
    },
    { message: "Invalid trade_mint public key" }
  ),
  buy_frequency: z.string(),
  buy_settings: BuySettingsSchema,
  slippage: z.number().int().min(0).max(10000),
});

export type ConfigItem = z.infer<typeof ConfigItemSchema>;

// Validate environment variables
export function validateEnv(): Env {
  const result = EnvSchema.safeParse(process.env);

  if (!result.success) {
    throw new Error(`Environment validation failed: ${result.error.message}`);
  }

  return result.data;
}

// Validate configuration array
export function validateConfig(config: unknown): ConfigItem[] {
  const result = z.array(ConfigItemSchema).safeParse(config);

  if (!result.success) {
    throw new Error(`Config validation failed: ${result.error.message}`);
  }

  return result.data;
}

// Parse configuration for use with SDK
export function parseConfig(config: ConfigItem) {
  return {
    wallet: new PublicKey(config.wallet),
    asset: {
      mint: new PublicKey(config.asset.mint),
      symbol: config.asset.symbol,
    },
    tradeMint: new PublicKey(config.trade_mint),
    buyFrequency: config.buy_frequency,
    buySettings: {
      type: config.buy_settings.type,
      number: new BigNumber(config.buy_settings.number),
    },
    slippage: config.slippage,
  };
}
