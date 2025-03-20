import { config } from 'dotenv';
import { DCAService } from './services/dca';
import { DCAConfig } from './types';
import { logError } from './services/logger';

// Load environment variables
config();

const RPC_ENDPOINT = process.env.DCA_BOT_RPC_ENDPOINT;
const PRIVATE_KEYS = process.env.DCA_BOT_PRIVATE_KEYS?.split(',') || [];

if (!RPC_ENDPOINT) {
  throw new Error('DCA_BOT_RPC_ENDPOINT environment variable is required');
}

if (!PRIVATE_KEYS.length) {
  throw new Error('DCA_BOT_PRIVATE_KEYS environment variable is required');
}

// Load configuration from JSON file
const loadConfig = async (): Promise<DCAConfig[]> => {
  try {
    const configFile = await import('../config.json', { assert: { type: 'json' } });
    return configFile.default;
  } catch (error) {
    throw new Error(`Failed to load config.json: ${(error as Error).message}`);
  }
};

const main = async () => {
  try {
    const configs = await loadConfig();
    const dcaService = new DCAService(RPC_ENDPOINT, configs, PRIVATE_KEYS);
    
    // Start the DCA service
    dcaService.start();

    // Handle graceful shutdown
    process.on('SIGINT', () => {
      console.log('Shutting down DCA bot...');
      dcaService.stop();
      process.exit(0);
    });

    process.on('SIGTERM', () => {
      console.log('Shutting down DCA bot...');
      dcaService.stop();
      process.exit(0);
    });

    console.log('DCA bot started successfully');
  } catch (error) {
    logError(error as Error);
    process.exit(1);
  }
};

main(); 