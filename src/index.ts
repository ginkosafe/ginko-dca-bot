import { Connection, Keypair } from '@solana/web3.js';
import { config } from 'dotenv';
import fs from 'fs';
import path from 'path';
import bs58 from 'bs58';
import { validateEnv, validateConfig, parseConfig } from './types/config';
import { SchedulerService } from './services/scheduler.service';
import { logger, logError } from './utils/logger';

// Load environment variables
config();

async function main() {
  try {
    // Validate environment variables
    const env = validateEnv();

    // Create Solana connection
    const connection = new Connection(env.DCA_BOT_RPC_ENDPOINT);

    // Load private keys
    const privateKeys = env.DCA_BOT_PRIVATE_KEYS.split(',').map(key => key.trim());
    const wallets = privateKeys.map(key => Keypair.fromSecretKey(bs58.decode(key)));

    // Load configuration
    const configPath = path.join(process.cwd(), 'config.json');
    const configFile = fs.readFileSync(configPath, 'utf-8');
    const configJson = JSON.parse(configFile);
    const configs = validateConfig(configJson);

    // Create scheduler service for each wallet
    const schedulers = new Map<string, SchedulerService>();
    
    for (const wallet of wallets) {
      const scheduler = new SchedulerService(connection, wallet);
      schedulers.set(wallet.publicKey.toString(), scheduler);
    }

    // Schedule jobs for each configuration
    for (const config of configs) {
      const parsedConfig = parseConfig(config);
      const scheduler = schedulers.get(parsedConfig.wallet.toString());
      
      if (!scheduler) {
        logError(`No wallet found for config: ${parsedConfig.wallet.toString()}`);
        continue;
      }

      scheduler.scheduleJob(parsedConfig);
      logger.info(`Scheduled DCA job for asset: ${parsedConfig.asset.toString()}`);
    }

    // Handle shutdown
    process.on('SIGINT', () => {
      logger.info('Shutting down DCA bot...');
      for (const scheduler of schedulers.values()) {
        scheduler.stopAllJobs();
      }
      process.exit(0);
    });

    logger.info('DCA bot started successfully');

  } catch (error) {
    logError(error as Error);
    process.exit(1);
  }
}

main(); 