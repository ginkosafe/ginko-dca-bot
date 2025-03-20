#!/usr/bin/env bun
import { Connection, PublicKey } from "@solana/web3.js";
import { DCAConfig } from "../types";
import { executeTrade } from "../services/trade";
import { logError, logInfo } from "../services/logger";

/**
 * Run a single trade
 * This script can be run directly or via child process
 */
async function runSingleTrade() {
  try {
    // Get RPC endpoint from environment variable or use default
    const rpcEndpoint =
      process.env.RPC_ENDPOINT || "https://api.mainnet-beta.solana.com";

    // Create Solana connection
    const connection = new Connection(rpcEndpoint, "confirmed");

    // Parse trade configuration from environment or command line
    let config: DCAConfig;

    if (process.env.TRADE_CONFIG) {
      // When run as a child process, config is provided via environment
      const serializedConfig = JSON.parse(process.env.TRADE_CONFIG);

      // Convert string public key back to PublicKey object
      config = {
        ...serializedConfig,
        assetPublicKey: new PublicKey(serializedConfig.assetPublicKey),
      };
    } else {
      // For direct execution, use environment variables
      // This is a simplified version - in a real application you might
      // want to use command line arguments or a config file
      if (
        !process.env.DCA_BOT_PRIVATE_KEYS ||
        !process.env.DCA_BOT_ASSET_ADDRESS
      ) {
        throw new Error("Missing required environment variables");
      }

      config = {
        privateKey: process.env.DCA_BOT_PRIVATE_KEYS.split(",")[0].trim(),
        assetPublicKey: new PublicKey(process.env.DCA_BOT_ASSET_ADDRESS),
        cronExpression: process.env.DCA_BOT_CRON || "0 0 * * *",
        buyType: (process.env.DCA_BOT_BUY_TYPE || "worth") as
          | "worth"
          | "amount",
        buyNumber: Number(process.env.DCA_BOT_BUY_NUMBER || "0.1"),
        slippageBps: Number(process.env.DCA_BOT_SLIPPAGE_BPS || "100"),
      };
    }

    // Log trade start
    logInfo(
      `Starting single trade for asset: ${config.assetPublicKey.toBase58()}`
    );

    // Execute trade
    const result = await executeTrade(connection, config);

    // Log result
    if (result.success) {
      logInfo(`Trade completed successfully: ${result.transactionSignature}`);
      if (result.price && result.amount) {
        logInfo(`Bought ${result.amount} units at price ${result.price}`);
      }
    } else {
      logError(`Trade failed: ${result.error}`, { retry: result.retry });
    }

    // Exit with appropriate code
    process.exit(result.success ? 0 : 1);
  } catch (error) {
    logError("Error in single trade script", { error });
    process.exit(1);
  }
}

// Run the trade
runSingleTrade();
