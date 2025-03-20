import { Keypair } from '@solana/web3.js';
import { schedule } from 'node-cron';
import { DCAConfig } from '../types';
import { TradeService } from './trade';
import { logError } from './logger';

export class DCAService {
  private tradeService: TradeService;
  private configs: DCAConfig[];
  private wallets: Map<string, Keypair>;
  private jobs: Map<string, any>;

  constructor(rpcEndpoint: string, configs: DCAConfig[], privateKeys: string[]) {
    this.tradeService = new TradeService(rpcEndpoint);
    this.configs = configs;
    this.wallets = new Map();
    this.jobs = new Map();

    // Initialize wallets from private keys
    privateKeys.forEach((key) => {
      const wallet = Keypair.fromSecretKey(Buffer.from(key.split(',').map(Number)));
      this.wallets.set(wallet.publicKey.toString(), wallet);
    });
  }

  start(): void {
    this.configs.forEach((config) => {
      const wallet = this.wallets.get(config.wallet);
      if (!wallet) {
        logError(new Error(`Wallet not found for config: ${config.wallet}`));
        return;
      }

      try {
        const job = schedule(config.buy_frequency, async () => {
          try {
            await this.tradeService.executeTrade(config, wallet);
          } catch (error) {
            logError(error as Error);
          }
        });

        this.jobs.set(`${config.wallet}-${config.asset}`, job);
      } catch (error) {
        logError(new Error(`Failed to schedule job: ${(error as Error).message}`));
      }
    });
  }

  stop(): void {
    this.jobs.forEach((job) => {
      job.stop();
    });
    this.jobs.clear();
  }

  async executeOnce(config: DCAConfig): Promise<void> {
    const wallet = this.wallets.get(config.wallet);
    if (!wallet) {
      throw new Error(`Wallet not found for config: ${config.wallet}`);
    }

    await this.tradeService.executeTrade(config, wallet);
  }
} 