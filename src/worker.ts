import { Connection, Keypair } from "@solana/web3.js";
import { TradeService } from "./services/trade.service";
import bs58 from "bs58";
import { logger, logError } from "./utils/logger";

async function main() {
  try {
    // Get environment variables
    const rpcEndpoint = process.env.DCA_BOT_RPC_ENDPOINT;
    const walletKey = process.env.DCA_BOT_WALLET;
    const configJson = process.env.DCA_BOT_CONFIG;
    const priceApiUrl = process.env.PRICE_API_URL;

    // Validate required environment variables
    if (!rpcEndpoint) {
      throw new Error("DCA_BOT_RPC_ENDPOINT is required");
    }

    if (!walletKey) {
      throw new Error("DCA_BOT_WALLET is required");
    }

    if (!configJson) {
      throw new Error("DCA_BOT_CONFIG is required");
    }

    if (!priceApiUrl) {
      throw new Error("PRICE_API_URL is required");
    }

    // Parse wallet and config
    const wallet = Keypair.fromSecretKey(bs58.decode(walletKey));
    const config = JSON.parse(configJson);

    // Create Solana connection
    const connection = new Connection(rpcEndpoint);

    // Create trade service
    const tradeService = new TradeService(connection, wallet, priceApiUrl);

    // Execute trade
    logger.info(`Worker started for ${config.asset.symbol}`);
    const success = await tradeService.executeTrade(config);

    if (success) {
      logger.info(`Worker completed successfully for ${config.asset.symbol}`);
      process.exit(0);
    } else {
      logger.error(`Worker failed for ${config.asset.symbol}`);
      process.exit(1);
    }
  } catch (error) {
    logError(error as Error);
    logger.error(`Worker error: ${(error as Error).message}`);
    process.exit(1);
  }
}

// Run the worker
main();
