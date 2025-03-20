import { Connection, Keypair } from '@solana/web3.js';
import { config } from 'dotenv';
import fs from 'fs';
import path from 'path';
import bs58 from 'bs58';
import { validateEnv, validateConfig, parseConfig } from '../src/types/config';
import { TradeService } from '../src/services/trade.service';
import { logger, logError } from '../src/utils/logger';

// Load environment variables
config();

async function main() {
  try {
    // Validate environment variables
    const env = validateEnv();

    // Create Solana connection
    const connection = new Connection(env.DCA_BOT_RPC_ENDPOINT);

    // Load private key (use first key)
    const privateKey = env.DCA_BOT_PRIVATE_KEYS.split(',')[0].trim();
    const wallet = Keypair.fromSecretKey(bs58.decode(privateKey));

    // Load configuration
    const configPath = path.join(process.cwd(), 'config.json');
    const configFile = fs.readFileSync(configPath, 'utf-8');
    const configJson = JSON.parse(configFile);
    const configs = validateConfig(configJson);

    // Use first configuration
    const config = configs[0];
    if (!config) {
      throw new Error('No configuration found in config.json');
    }

    const parsedConfig = parseConfig(config);

    // Create trade service
    const tradeService = new TradeService(connection, wallet);

    // Execute single trade
    logger.info('Executing single trade...');
    const success = await tradeService.executeTrade(parsedConfig);

    if (success) {
      logger.info('Trade executed successfully');
    } else {
      logger.error('Trade failed after maximum retries');
    }

  } catch (error) {
    logError(error as Error);
    process.exit(1);
  }
}

main(); 