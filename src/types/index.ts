import { PublicKey } from "@solana/web3.js";

export type BuyType = "worth" | "amount";

/**
 * DCA Bot asset configuration
 */
export interface DCAConfig {
  /** Wallet private key */
  privateKey: string;

  /** Asset public key */
  assetPublicKey: PublicKey;

  /** Buy frequency in cron expression */
  cronExpression: string;

  /** Buy type - by worth (value) or amount (quantity) */
  buyType: BuyType;

  /** Buy amount (in SOL if worth, in token units if amount) */
  buyNumber: number;

  /** Slippage in basis points (100 = 1%) */
  slippageBps: number;
}

/**
 * Transaction result
 */
export interface TransactionResult {
  success: boolean;
  transactionSignature?: string;
  error?: string;
  price?: number;
  amount?: number;
  retry?: number;
}

/**
 * DCA Bot wallet balance
 */
export interface WalletBalance {
  publicKey: PublicKey;
  balance: number;
  sufficientFunds: boolean;
}
