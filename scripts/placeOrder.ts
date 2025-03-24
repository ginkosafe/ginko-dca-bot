import { Connection, Keypair, PublicKey } from "@solana/web3.js";
import { config } from "dotenv";
import fs from "fs";
import path from "path";
import bs58 from "bs58";
import { validateEnv, validateConfig, parseConfig } from "../src/types/config";
import { TradeService } from "../src/services/trade.service";
import { logger, logError } from "../src/utils/logger";

// Load environment variables
config();

async function main() {
  try {
    // Load configuration
    const configPath = path.join(process.cwd(), "config.json");
    const configFile = fs.readFileSync(configPath, "utf-8");
    const configJson = JSON.parse(configFile);
    const configs = validateConfig(configJson);

    // Get first configuration
    const config = configs[0];
    if (!config) {
      throw new Error("No configuration found in config.json");
    }

    // Parse configuration
    const parsedConfig = parseConfig(config);

    // Validate environment variables
    const env = validateEnv();

    // Create Solana connection
    const connection = new Connection(env.DCA_BOT_RPC_ENDPOINT);

    // Load private key (use first key)
    const privateKey = env.DCA_BOT_PRIVATE_KEYS.split(",")[0].trim();
    const wallet = Keypair.fromSecretKey(bs58.decode(privateKey));

    // Create trade service
    const tradeService = new TradeService(
      connection,
      wallet,
      env.PRICE_API_URL
    );

    // Execute trade
    logger.info("Executing trade...");
    logger.info(`Using configuration for asset: ${parsedConfig.asset.symbol}`);
    const success = await tradeService.executeTrade(parsedConfig);

    if (!success) {
      throw new Error("Trade failed after maximum retries");
    }

    logger.info("Trade executed successfully");
  } catch (error) {
    logError(error as Error);
    process.exit(1);
  }
}

main();
