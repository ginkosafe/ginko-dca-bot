import { Connection, Keypair, PublicKey } from "@solana/web3.js";
import { config } from "dotenv";
import { validateEnv } from "../src/types/config";
import { TradeService } from "../src/services/trade.service";
import { logger, logError } from "../src/utils/logger";
import bs58 from "bs58";

// Load environment variables
config();

async function main() {
  try {
    // Check for order public key argument
    const orderPublicKeyArg = process.argv[2];
    if (!orderPublicKeyArg) {
      console.error(
        "Usage: bun run scripts/getOrderByPublicKey.ts <order_public_key>"
      );
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

    // Get order
    logger.info(`Fetching order ${orderPublicKey.toString()}...`);
    const order = await tradeService.getOrder(orderPublicKey);

    // Display order information
    console.log("Order information:");
    console.log(`Public Key: ${order.publicKey.toString()}`);
    console.log(`Owner: ${order.owner.toString()}`);
    console.log(`Asset: ${order.asset.toString()}`);
    console.log(`Direction: ${order.direction}`);
    console.log(`Type: ${order.type}`);
    console.log(`Created At: ${order.createdAt}`);
    console.log(`Expire At: ${order.expireAt}`);
    console.log(`Canceled At: ${order.canceledAt || "Not canceled"}`);
    console.log(`Input Quantity: ${order.inputQuantity.toString()}`);
    console.log(`Filled Quantity: ${order.filledQuantity.toString()}`);
    console.log(
      `Filled Output Quantity: ${order.filledOutputQuantity.toString()}`
    );

    if (order.limitPrice) {
      console.log(
        `Limit Price: ${order.limitPrice.mantissa.toString()} (scale: ${order.limitPrice.scale})`
      );
    } else {
      console.log("Limit Price: None (market order)");
    }

    console.log(`Slippage: ${order.slippageBps} bps`);
  } catch (error) {
    logError(error as Error);
    process.exit(1);
  }
}

main();
