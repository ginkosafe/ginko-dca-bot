import { CronJob } from "cron";
import { Connection } from "@solana/web3.js";
import { DCAConfig } from "../types";
import { executeTrade } from "./trade";
import { logError, logInfo } from "./logger";
import { fork } from "child_process";
import * as path from "path";

// Active jobs
const activeJobs = new Map<string, CronJob>();

/**
 * Create a job key from config
 * @param config DCA configuration
 * @returns Unique job key
 */
const createJobKey = (config: DCAConfig): string => {
  return `${config.privateKey.substring(0, 8)}_${config.assetPublicKey.toBase58().substring(0, 8)}`;
};

/**
 * Schedule DCA trade jobs
 * @param connection Solana connection
 * @param configs Array of DCA configurations
 */
export const scheduleJobs = (
  connection: Connection,
  configs: DCAConfig[]
): void => {
  // Cancel any existing jobs
  activeJobs.forEach((job, key) => {
    job.stop();
    activeJobs.delete(key);
    logInfo(`Stopped job: ${key}`);
  });

  // Schedule new jobs
  configs.forEach((config) => {
    const jobKey = createJobKey(config);

    try {
      const job = new CronJob(
        config.cronExpression,
        () => executeTradeInChildProcess(connection.rpcEndpoint, config),
        null, // onComplete
        true, // start
        "UTC" // timeZone
      );

      activeJobs.set(jobKey, job);
      logInfo(`Scheduled job: ${jobKey} with cron: ${config.cronExpression}`);
    } catch (error) {
      logError(`Failed to schedule job: ${jobKey}`, { error, config });
    }
  });

  logInfo(`Total scheduled jobs: ${activeJobs.size}`);
};

/**
 * Execute trade in child process to isolate failures
 * @param rpcEndpoint Solana RPC endpoint
 * @param config DCA configuration
 */
const executeTradeInChildProcess = (
  rpcEndpoint: string,
  config: DCAConfig
): void => {
  // Path to the single trade script
  const scriptPath = path.join(
    process.cwd(),
    "src",
    "scripts",
    "single-trade.ts"
  );

  // Serialized config (except for PublicKey which needs special handling)
  const serializedConfig = {
    ...config,
    assetPublicKey: config.assetPublicKey.toBase58(),
  };

  // Create child process
  const child = fork(scriptPath, [], {
    execArgv: [Bun.main], // Use Bun to execute
    env: {
      ...process.env,
      RPC_ENDPOINT: rpcEndpoint,
      TRADE_CONFIG: JSON.stringify(serializedConfig),
    },
    stdio: "pipe",
  });

  // Log child process output
  child.stdout?.on("data", (data) => {
    logInfo(`[Child Process] ${data.toString().trim()}`);
  });

  child.stderr?.on("data", (data) => {
    logError(`[Child Process Error] ${data.toString().trim()}`);
  });

  // Handle process exit
  child.on("exit", (code) => {
    if (code !== 0) {
      logError(`Child process exited with code ${code}`);
    } else {
      logInfo("Trade process completed successfully");
    }
  });
};
