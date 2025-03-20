import { Connection } from '@solana/web3.js';
import { config } from 'dotenv';
import { AccountData } from '@ginko/sdk';
import { validateEnv } from '../src/types/config';
import { logger, logError } from '../src/utils/logger';

// Load environment variables
config();

async function main() {
  try {
    // Validate environment variables
    const env = validateEnv();

    // Create Solana connection
    const connection = new Connection(env.DCA_BOT_RPC_ENDPOINT);

    // Create account data instance
    const accountData = new AccountData(connection);

    // Get all assets
    logger.info('Fetching all assets...');
    const assets = await accountData.assets();

    // Log assets
    assets.forEach(asset => {
      logger.info(`Asset: ${asset.publicKey.toString()}`);
      logger.info(`  Mint: ${asset.mint.toString()}`);
      logger.info(`  Oracle: ${asset.quotaPriceOracle.toString()}`);
      logger.info(`  Paused: ${asset.paused}`);
      logger.info('---');
    });

    logger.info(`Total assets found: ${assets.length}`);

  } catch (error) {
    logError(error as Error);
    process.exit(1);
  }
}

main(); 