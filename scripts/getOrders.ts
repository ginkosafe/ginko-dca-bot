import { Connection, PublicKey } from '@solana/web3.js';
import { config } from 'dotenv';
import { AccountData } from '@ginko/sdk';
import { validateEnv } from '../src/types/config';
import { logger, logError } from '../src/utils/logger';

// Load environment variables
config();

async function main() {
  try {
    // Get command line arguments
    const owner = process.argv[2] ? new PublicKey(process.argv[2]) : undefined;
    const asset = process.argv[3] ? new PublicKey(process.argv[3]) : undefined;
    const paymentMint = process.argv[4] ? new PublicKey(process.argv[4]) : undefined;

    // Validate environment variables
    const env = validateEnv();

    // Create Solana connection
    const connection = new Connection(env.DCA_BOT_RPC_ENDPOINT);

    // Create account data instance
    const accountData = new AccountData(connection);

    // Get orders with filters
    logger.info('Fetching orders...');
    const orders = await accountData.orders(owner, asset, paymentMint);

    // Log orders
    orders.forEach(order => {
      logger.info(`Order: ${order.publicKey.toString()}`);
      logger.info(`  Owner: ${order.owner.toString()}`);
      logger.info(`  Asset: ${order.asset.toString()}`);
      logger.info(`  Direction: ${order.direction}`);
      logger.info(`  Type: ${order.type}`);
      logger.info(`  Input Quantity: ${order.inputQuantity.toString()}`);
      logger.info(`  Filled Quantity: ${order.filledQuantity.toString()}`);
      logger.info(`  Created At: ${order.createdAt.toISOString()}`);
      logger.info(`  Expire At: ${order.expireAt.toISOString()}`);
      logger.info(`  Canceled At: ${order.canceledAt?.toISOString() || 'Not canceled'}`);
      logger.info('---');
    });

    logger.info(`Total orders found: ${orders.length}`);

  } catch (error) {
    logError(error as Error);
    process.exit(1);
  }
}

main(); 