import { Connection, PublicKey } from '@solana/web3.js';
import { config } from 'dotenv';
import { AccountData } from '@ginko/sdk';
import { validateEnv } from '../src/types/config';
import { logger, logError } from '../src/utils/logger';

// Load environment variables
config();

async function main() {
  try {
    // Get order public key from command line
    if (!process.argv[2]) {
      throw new Error('Please provide an order public key');
    }
    const orderPublicKey = new PublicKey(process.argv[2]);

    // Validate environment variables
    const env = validateEnv();

    // Create Solana connection
    const connection = new Connection(env.DCA_BOT_RPC_ENDPOINT);

    // Create account data instance
    const accountData = new AccountData(connection);

    // Get order
    logger.info(`Fetching order: ${orderPublicKey.toString()}`);
    const order = await accountData.order(orderPublicKey);

    // Log order details
    logger.info('Order Details:');
    logger.info(`  Owner: ${order.owner.toString()}`);
    logger.info(`  Asset: ${order.asset.toString()}`);
    logger.info(`  Direction: ${order.direction}`);
    logger.info(`  Type: ${order.type}`);
    logger.info(`  Input Quantity: ${order.inputQuantity.toString()}`);
    logger.info(`  Filled Quantity: ${order.filledQuantity.toString()}`);
    logger.info(`  Created At: ${order.createdAt.toISOString()}`);
    logger.info(`  Expire At: ${order.expireAt.toISOString()}`);
    logger.info(`  Canceled At: ${order.canceledAt?.toISOString() || 'Not canceled'}`);
    logger.info(`  Last Fill Slot: ${order.lastFillSlot.toString()}`);

  } catch (error) {
    logError(error as Error);
    process.exit(1);
  }
}

main(); 