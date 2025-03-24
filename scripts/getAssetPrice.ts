import { Connection, Keypair } from "@solana/web3.js";
import { config } from "dotenv";
import { validateEnv } from "../src/types/config";
import { TradeService } from "../src/services/trade.service";
import { logger, logError } from "../src/utils/logger";
import bs58 from "bs58";

// Load environment variables
config();

async function main() {
  try {
    // Check for symbol argument
    const symbol = process.argv[2];
    if (!symbol) {
      console.error("Usage: bun run scripts/getAssetPrice.ts <symbol>");
      process.exit(1);
    }

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

    // Get asset price
    logger.info(`Fetching price for ${symbol}...`);
    const price = await tradeService.getAssetPrice(symbol);

    console.log("Price information:");
    console.log(JSON.stringify(price, null, 2));
  } catch (error) {
    logError(error as Error);
    process.exit(1);
  }
}

main();
