import { Connection, Keypair, PublicKey } from "@solana/web3.js";
import { config } from "dotenv";
import bs58 from "bs58";
import { validateEnv } from "../src/types/config";
import { TradeService } from "../src/services/trade.service";
import { logger, logError } from "../src/utils/logger";

// Load environment variables
config();

async function main() {
  try {
    // Check for order public key argument
    const orderPublicKeyArg = process.argv[2];
    if (!orderPublicKeyArg) {
      console.error("Usage: bun run scripts/cancelOrder.ts <order_public_key>");
      process.exit(1);
    }

    // Parse order public key
    const orderPublicKey = new PublicKey(orderPublicKeyArg);

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

    // Cancel order
    logger.info(`Cancelling order ${orderPublicKey.toString()}...`);
    const txId = await tradeService.cancelOrder(orderPublicKey);

    logger.info(`Order cancelled successfully. TX: ${txId}`);
  } catch (error) {
    logError(error as Error);
    process.exit(1);
  }
}

main();
