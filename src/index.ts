import { Connection } from "@solana/web3.js";
import { config } from "dotenv";
import { SchedulerService } from "./services/scheduler.service";
import { validateEnv } from "./types/config";
import { logger, logError } from "./utils/logger";

// Load environment variables
config();

async function main() {
  try {
    // Validate environment variables
    const env = validateEnv();

    // Create Solana connection
    const connection = new Connection(env.DCA_BOT_RPC_ENDPOINT);

    // Split private keys
    const privateKeys = env.DCA_BOT_PRIVATE_KEYS.split(",");

    // Create scheduler service
    const scheduler = new SchedulerService(
      connection,
      privateKeys,
      env.PRICE_API_URL
    );

    // Start the scheduler
    scheduler.start();

    // Handle process shutdown
    const handleShutdown = () => {
      logger.info("Shutting down DCA Bot");
      scheduler.stop();
      process.exit(0);
    };

    // Register shutdown handlers
    process.on("SIGINT", handleShutdown);
    process.on("SIGTERM", handleShutdown);

    logger.info("DCA Bot started successfully");
  } catch (error) {
    logError(error as Error);
    logger.error(`Failed to start DCA Bot: ${(error as Error).message}`);
    process.exit(1);
  }
}

// Run the application
main();
