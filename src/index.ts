#!/usr/bin/env bun
import { Connection } from "@solana/web3.js";
import { getDCAConfigs, getRpcEndpoint } from "./config";
import { logError, logInfo } from "./services/logger";
import { scheduleJobs } from "./services/scheduler";

/**
 * Ginko DCA Bot
 *
 * A Dollar-Cost Averaging (DCA) bot for the Ginko Protocol
 * Automatically buys assets at specified intervals regardless of price
 */

// Main function
async function main() {
  try {
    // Display startup message
    logInfo("Starting Ginko DCA Bot");

    // Get RPC endpoint from config
    const rpcEndpoint = getRpcEndpoint();
    logInfo(`Using RPC endpoint: ${rpcEndpoint}`);

    // Create Solana connection
    const connection = new Connection(rpcEndpoint, "confirmed");

    // Get DCA configurations
    const configs = getDCAConfigs();

    if (configs.length === 0) {
      logInfo(
        "No DCA configurations found. Please set up your configurations in .env file"
      );
      process.exit(1);
    }

    logInfo(`Loaded ${configs.length} DCA configurations`);

    // Schedule DCA jobs
    scheduleJobs(connection, configs);

    // Keep process running
    logInfo("DCA bot is running. Press Ctrl+C to exit.");

    // Handle graceful shutdown
    process.on("SIGINT", () => {
      logInfo("Shutting down DCA bot...");
      process.exit(0);
    });

    process.on("SIGTERM", () => {
      logInfo("Shutting down DCA bot...");
      process.exit(0);
    });
  } catch (error) {
    logError("Failed to start DCA bot", { error });
    process.exit(1);
  }
}

// Run the main function
main();
