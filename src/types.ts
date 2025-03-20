import { PublicKey } from '@solana/web3.js';
import { BN } from '@coral-xyz/anchor';

// DCA Bot Configuration Types
export interface DCAConfig {
  wallet: string;
  asset: string;
  buy_frequency: string; // cron expression
  buy_settings: {
    type: 'worth' | 'amount';
    number: string;
  };
  slippage: number;
}

// Trade Types
export interface TradeParams {
  owner: PublicKey;
  asset: {
    publicKey: PublicKey;
    mint: PublicKey;
  };
  quantity: BN;
  priceOracle: PublicKey;
  tradeMint: PublicKey;
  slippageBps: number;
}

// Logger Types
export interface LogEntry {
  timestamp: string;
  marketPrice: number;
  tradeAmount: string;
  tradeCount: number;
  transactionId?: string;
  error?: string;
}

// Error Types
export interface ErrorLog extends LogEntry {
  error: string;
  stack?: string;
} 