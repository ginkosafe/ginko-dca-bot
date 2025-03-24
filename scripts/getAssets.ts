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
    // Parse command line arguments
    const includePaused = process.argv.includes("--include-paused");

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

    // Get assets
    logger.info(`Fetching all${includePaused ? " " : " non-paused "}assets...`);
    const assets = await tradeService.getAssets(includePaused);

    console.log(`Found ${assets.length} assets:`);

    // Display assets in a more readable format
    assets.forEach((asset, index) => {
      console.log(`\nAsset #${index + 1}:`);
      console.log(`Public Key: ${asset.publicKey.toString()}`);
      console.log(`Mint: ${asset.mint.toString()}`);
      console.log(`Paused: ${asset.paused}`);
      console.log(`Price Oracle: ${asset.quotaPriceOracle.toString()}`);
    });
  } catch (error) {
    logError(error as Error);
    process.exit(1);
  }
}

main();
