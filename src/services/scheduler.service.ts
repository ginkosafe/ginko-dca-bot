import { CronJob } from "cron";
import { Connection, Keypair, PublicKey } from "@solana/web3.js";
import fs from "fs";
import path from "path";
import bs58 from "bs58";
import { fork } from "child_process";
import { logger, logError } from "../utils/logger";
import { ConfigItem, validateConfig, parseConfig } from "../types/config";

export class SchedulerService {
  private connection: Connection;
  private wallets: Map<string, Keypair>;
  private jobs: Map<string, CronJob>;
  private config: ConfigItem[];
  private priceApiUrl: string;

  constructor(
    connection: Connection,
    privateKeys: string[],
    priceApiUrl: string
  ) {
    this.connection = connection;
    this.wallets = new Map();
    this.jobs = new Map();
    this.priceApiUrl = priceApiUrl;

    // Load private keys
    for (const privateKey of privateKeys) {
      try {
        const keyPair = Keypair.fromSecretKey(bs58.decode(privateKey.trim()));
        this.wallets.set(keyPair.publicKey.toString(), keyPair);
      } catch (error) {
        logError(error as Error);
        logger.error(`Failed to load private key: ${(error as Error).message}`);
      }
    }

    // Load configuration
    try {
      const configPath = path.join(process.cwd(), "config.json");
      const configData = fs.readFileSync(configPath, "utf-8");
      const configJson = JSON.parse(configData);
      this.config = validateConfig(configJson);
      logger.info(`Loaded ${this.config.length} configuration(s)`);
    } catch (error) {
      logError(error as Error);
      throw new Error(
        `Failed to load configuration: ${(error as Error).message}`
      );
    }
  }

  /**
   * Start all scheduled jobs
   */
  start(): void {
    logger.info("Starting DCA Bot scheduler");

    // Create cron jobs for each configuration
    for (const [index, config] of this.config.entries()) {
      try {
        // Check if wallet exists
        const wallet = this.wallets.get(config.wallet);
        if (!wallet) {
          logger.error(
            `Wallet ${config.wallet} not found, skipping configuration ${index}`
          );
          continue;
        }

        // Create a job ID
        const jobId = `${config.wallet}-${config.asset.symbol}`;

        // Create the cron job
        const job = new CronJob(
          config.buy_frequency,
          () => this.executeTrade(config, wallet),
          null,
          true,
          "UTC"
        );

        // Store the job
        this.jobs.set(jobId, job);

        logger.info(
          `Scheduled job ${jobId} with frequency: ${config.buy_frequency}`
        );
      } catch (error) {
        logError(error as Error);
        logger.error(
          `Failed to schedule job for config ${index}: ${(error as Error).message}`
        );
      }
    }

    logger.info(`Started ${this.jobs.size} scheduled jobs`);
  }

  /**
   * Stop all scheduled jobs
   */
  stop(): void {
    logger.info("Stopping DCA Bot scheduler");

    // Stop all jobs
    for (const [jobId, job] of this.jobs.entries()) {
      job.stop();
      logger.info(`Stopped job ${jobId}`);
    }

    this.jobs.clear();
    logger.info("All jobs stopped");
  }

  /**
   * Execute a trade for a configuration
   * @param config Configuration item
   * @param wallet Wallet keypair
   */
  private executeTrade(config: ConfigItem, wallet: Keypair): void {
    logger.info(`Executing trade for ${config.asset.symbol}`);

    // Parse configuration
    const parsedConfig = parseConfig(config);

    // Fork a child process to execute the trade
    const child = fork(path.join(process.cwd(), "src", "worker.js"), [], {
      env: {
        ...process.env,
        DCA_BOT_CONFIG: JSON.stringify(parsedConfig),
        DCA_BOT_WALLET: bs58.encode(wallet.secretKey),
        DCA_BOT_RPC_ENDPOINT: process.env.DCA_BOT_RPC_ENDPOINT || "",
        PRICE_API_URL: this.priceApiUrl,
      },
    });

    // Handle child process events
    child.on("error", (error) => {
      logError(error);
      logger.error(`Trade worker error: ${error.message}`);
    });

    child.on("exit", (code) => {
      if (code !== 0) {
        logger.error(`Trade worker exited with code ${code}`);
      } else {
        logger.info(`Trade worker completed for ${config.asset.symbol}`);
      }
    });
  }

  /**
   * Manually execute a trade for a specific configuration index
   * @param index Configuration index
   * @returns Promise resolving to execution status
   */
  async executeTradeManually(index: number): Promise<boolean> {
    if (index < 0 || index >= this.config.length) {
      logger.error(`Invalid configuration index: ${index}`);
      return false;
    }

    const config = this.config[index];
    const wallet = this.wallets.get(config.wallet);

    if (!wallet) {
      logger.error(`Wallet ${config.wallet} not found`);
      return false;
    }

    // Execute the trade synchronously for manual execution
    try {
      logger.info(`Manually executing trade for ${config.asset.symbol}`);

      // Since we want to wait for the result, use dynamic import to load the TradeService
      const { TradeService } = await import("./trade.service");
      const tradeService = new TradeService(
        this.connection,
        wallet,
        this.priceApiUrl
      );

      const parsedConfig = parseConfig(config);
      const result = await tradeService.executeTrade(parsedConfig);

      return result;
    } catch (error) {
      logError(error as Error);
      logger.error(
        `Manual trade execution failed: ${(error as Error).message}`
      );
      return false;
    }
  }
}
