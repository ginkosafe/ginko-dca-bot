import { Connection, PublicKey } from '@solana/web3.js';
import { config } from 'dotenv';
import { AccountData } from '@ginko/sdk';
import { validateEnv } from '../src/types/config';
import { logger, logError } from '../src/utils/logger';

// Load environment variables
config();

// Price API URL
const PRICE_API_URL = process.env.PRICE_API_URL || 'https://api.ginko.xyz';

// Price information interface
interface PriceInfo {
  symbol: string;
  price: number;
  timestamp: number;
  confidence?: number;
}

async function main() {
  try {
    // Get asset public key from command line
    if (!process.argv[2]) {
      throw new Error('Please provide an asset symbol');
    }
    const symbol = process.argv[2];

    logger.info(`Fetching asset: ${symbol}`);

    // Get price from API
    logger.info(`Fetching price for symbol: ${symbol}`);
    console.log(`${PRICE_API_URL}/price/${symbol}`);
    const response = await fetch(`${PRICE_API_URL}/price/${symbol}`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch price: ${response.statusText}`);
    }

    const price: PriceInfo = await response.json();

    console.log(price);

    // Log price information
    logger.info('Price information:');
    logger.info(`  Symbol: ${price.symbol}`);
    logger.info(`  Price: ${price.price}`);
  } catch (error) {
    logError(error as Error);
    process.exit(1);
  }
}

main(); 