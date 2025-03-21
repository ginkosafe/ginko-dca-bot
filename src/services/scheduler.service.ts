import { CronJob, sendAt } from 'cron';
import { Connection, Keypair } from '@solana/web3.js';
import { ParsedDCAConfig } from '../types/config';
import { TradeService } from './trade.service';
import { logError } from '../utils/logger';

export class SchedulerService {
  private jobs: Map<string, CronJob> = new Map();
  private tradeService: TradeService;

  constructor(connection: Connection, wallet: Keypair) {
    this.tradeService = new TradeService(connection, wallet);
  }

  scheduleJob(config: ParsedDCAConfig) {
    const jobKey = `${config.wallet.toString()}-${config.asset.toString()}`;

    // Stop existing job if it exists
    this.stopJob(jobKey);

    const frequency = sendAt(config.buy_frequency);
    console.log({ frequency });

    try {
      const job = new CronJob(
        config.buy_frequency,
        async () => {
          try {
            await this.tradeService.executeTrade(config);
          } catch (error) {
            logError(error as Error, {
              jobKey,
              config: {
                asset: config.asset.toString(),
                wallet: config.wallet.toString(),
              },
            });
          }
        },
        null, // onComplete
        true, // start
        'UTC' // timeZone
      );

      this.jobs.set(jobKey, job);
    } catch (error) {
      logError(error as Error, {
        jobKey,
        message: 'Failed to schedule job',
      });
    }
  }

  stopJob(jobKey: string) {
    const job = this.jobs.get(jobKey);
    if (job) {
      job.stop();
      this.jobs.delete(jobKey);
    }
  }

  stopAllJobs() {
    for (const [jobKey] of this.jobs) {
      this.stopJob(jobKey);
    }
  }

  getActiveJobs(): string[] {
    return Array.from(this.jobs.keys());
  }
} 