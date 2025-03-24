import {
  Connection,
  Keypair,
  PublicKey,
  VersionedTransaction,
  TransactionMessage,
} from "@solana/web3.js";
import { AccountData, PublicInstructionBuilder } from "@ginko/sdk";
import BigNumber from "bignumber.js";
import { BN } from "@coral-xyz/anchor";
import { logger, logTrade, logError } from "../utils/logger";

// Define price info interface from the Price API
interface PriceInfo {
  symbol: string;
  open: string;
  close: string;
  price: string;
}

export class TradeService {
  private connection: Connection;
  private wallet: Keypair;
  private accountData: AccountData;
  private sdkBuilder: PublicInstructionBuilder;
  private priceApiUrl: string;

  constructor(connection: Connection, wallet: Keypair, priceApiUrl: string) {
    this.connection = connection;
    this.wallet = wallet;
    this.priceApiUrl = priceApiUrl;
    this.accountData = new AccountData(connection);
    this.sdkBuilder = new PublicInstructionBuilder(connection);
  }

  /**
   * Get asset price from the price API
   * @param symbol Asset symbol
   * @returns Promise resolving to price info
   */
  async getAssetPrice(symbol: string): Promise<PriceInfo> {
    try {
      const response = await fetch(`${this.priceApiUrl}/price/${symbol}`);
      if (!response.ok) {
        throw new Error(
          `Failed to fetch price for ${symbol}: ${response.statusText}`
        );
      }
      const priceInfo: PriceInfo = await response.json();
      return priceInfo;
    } catch (error) {
      logError(error as Error);
      throw new Error(
        `Failed to get price for ${symbol}: ${(error as Error).message}`
      );
    }
  }

  /**
   * Get user wallet balance
   * @returns Promise resolving to balance in lamports
   */
  async getWalletBalance(): Promise<number> {
    try {
      const balance = await this.connection.getBalance(this.wallet.publicKey);
      return balance;
    } catch (error) {
      logError(error as Error);
      throw new Error(
        `Failed to get wallet balance: ${(error as Error).message}`
      );
    }
  }

  /**
   * Get all supported assets
   * @returns Promise resolving to array of assets
   */
  async getAssets(includesPaused = false): Promise<any[]> {
    try {
      return await this.accountData.assets(includesPaused);
    } catch (error) {
      logError(error as Error);
      throw new Error(`Failed to get assets: ${(error as Error).message}`);
    }
  }

  /**
   * Get asset by public key
   * @param publicKey Asset public key
   * @returns Promise resolving to asset data
   */
  async getAsset(publicKey: PublicKey): Promise<any> {
    try {
      return await this.accountData.asset(publicKey);
    } catch (error) {
      logError(error as Error);
      throw new Error(`Failed to get asset: ${(error as Error).message}`);
    }
  }

  /**
   * Get order by public key
   * @param publicKey Order public key
   * @returns Promise resolving to order data
   */
  async getOrder(publicKey: PublicKey): Promise<any> {
    try {
      return await this.accountData.order(publicKey);
    } catch (error) {
      logError(error as Error);
      throw new Error(`Failed to get order: ${(error as Error).message}`);
    }
  }

  /**
   * Place a market buy order
   * @param assetMint Asset mint public key
   * @param assetPublicKey Asset account public key
   * @param assetSymbol Asset symbol
   * @param tradeMint Trade mint public key
   * @param quantity Order quantity
   * @param slippageBps Slippage in basis points
   * @returns Promise resolving to transaction signature
   */
  async placeMarketBuyOrder(
    assetMint: PublicKey,
    assetPublicKey: PublicKey,
    assetSymbol: string,
    tradeMint: PublicKey,
    quantity: BigNumber,
    slippageBps: number
  ): Promise<string> {
    try {
      // Get price information
      const priceInfo = await this.getAssetPrice(assetSymbol);
      const currentPrice = parseFloat(priceInfo.price);

      logger.info(
        `Placing market buy order for ${assetSymbol} at ${currentPrice}`
      );

      // Get the price oracle for the asset
      const asset = await this.accountData.asset(assetPublicKey);
      const priceOracle = asset.quotaPriceOracle;

      // Create the place order instructions
      const orderInstructions = await this.sdkBuilder.placeOrder({
        owner: this.wallet.publicKey,
        asset: {
          publicKey: assetPublicKey,
          mint: assetMint,
        },
        direction: "buy",
        type: "market",
        quantity: new BN(quantity.toFixed(0)),
        priceOracle,
        tradeMint,
        limitPrice: null,
        slippageBps,
        expireTime: 300, // 5 minutes expiration
      });

      // Create and send the transaction
      const latestBlockhash = await this.connection.getLatestBlockhash();

      const messageV0 = new TransactionMessage({
        payerKey: this.wallet.publicKey,
        recentBlockhash: latestBlockhash.blockhash,
        instructions: orderInstructions,
      }).compileToV0Message();

      const transaction = new VersionedTransaction(messageV0);
      transaction.sign([this.wallet]);

      const txid = await this.connection.sendTransaction(transaction, {
        skipPreflight: false,
        preflightCommitment: "confirmed",
      });

      // Wait for confirmation
      const confirmation = await this.connection.confirmTransaction(
        {
          signature: txid,
          blockhash: latestBlockhash.blockhash,
          lastValidBlockHeight: latestBlockhash.lastValidBlockHeight,
        },
        "confirmed"
      );

      if (confirmation.value.err) {
        throw new Error(
          `Transaction confirmed but failed: ${confirmation.value.err}`
        );
      }

      logTrade(assetSymbol, currentPrice, quantity.toString(), 1, txid);
      return txid;
    } catch (error) {
      logError(error as Error);
      throw new Error(
        `Failed to place market buy order: ${(error as Error).message}`
      );
    }
  }

  /**
   * Cancel an existing order
   * @param orderPublicKey Order public key
   * @returns Promise resolving to transaction signature
   */
  async cancelOrder(orderPublicKey: PublicKey): Promise<string> {
    try {
      // Get order details
      const order = await this.accountData.order(orderPublicKey);

      // Create cancel order instructions
      const cancelInstructions = await this.sdkBuilder.cancelOrder(order);

      // Create and send the transaction
      const latestBlockhash = await this.connection.getLatestBlockhash();

      const messageV0 = new TransactionMessage({
        payerKey: this.wallet.publicKey,
        recentBlockhash: latestBlockhash.blockhash,
        instructions: cancelInstructions,
      }).compileToV0Message();

      const transaction = new VersionedTransaction(messageV0);
      transaction.sign([this.wallet]);

      const txid = await this.connection.sendTransaction(transaction, {
        skipPreflight: false,
        preflightCommitment: "confirmed",
      });

      // Wait for confirmation
      const confirmation = await this.connection.confirmTransaction(
        {
          signature: txid,
          blockhash: latestBlockhash.blockhash,
          lastValidBlockHeight: latestBlockhash.lastValidBlockHeight,
        },
        "confirmed"
      );

      if (confirmation.value.err) {
        throw new Error(
          `Transaction confirmed but failed: ${confirmation.value.err}`
        );
      }

      logger.info(
        `Order ${orderPublicKey.toString()} cancelled successfully. TX: ${txid}`
      );
      return txid;
    } catch (error) {
      logError(error as Error);
      throw new Error(`Failed to cancel order: ${(error as Error).message}`);
    }
  }

  /**
   * Execute a trade based on config
   * @param config Parsed configuration
   * @returns Promise resolving to success status
   */
  async executeTrade(config: any): Promise<boolean> {
    const MAX_RETRIES = 5;
    let attempt = 1;

    while (attempt <= MAX_RETRIES) {
      try {
        logger.info(`Trade attempt ${attempt} for ${config.asset.symbol}`);

        // Get price information
        const priceInfo = await this.getAssetPrice(config.asset.symbol);
        const currentPrice = parseFloat(priceInfo.price);

        // Check the buy settings
        let quantity: BigNumber;

        if (config.buySettings.type === "worth") {
          // Convert worth to token amount
          quantity = config.buySettings.number.dividedBy(currentPrice);
        } else {
          // Use fixed amount
          quantity = config.buySettings.number;
        }

        // Execute the trade
        const txid = await this.placeMarketBuyOrder(
          config.asset.mint,
          config.asset.mint, // Assuming asset.publicKey is the same as asset.mint
          config.asset.symbol,
          config.tradeMint,
          quantity,
          config.slippage
        );

        logger.info(`Trade successful. TX: ${txid}`);
        return true;
      } catch (error) {
        logError(error as Error);
        logger.error(
          `Trade attempt ${attempt} failed: ${(error as Error).message}`
        );

        // Check for wallet balance issues
        if ((error as Error).message.includes("insufficient funds")) {
          logger.error(
            "Insufficient wallet balance, skipping further attempts"
          );
          return false;
        }

        attempt += 1;

        if (attempt > MAX_RETRIES) {
          logger.error(
            `Maximum retry attempts (${MAX_RETRIES}) reached, giving up`
          );
          return false;
        }

        // Wait before retry (exponential backoff)
        const delay = Math.pow(2, attempt) * 1000;
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
    }

    return false;
  }
}
