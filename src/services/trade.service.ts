import {
  Connection,
  Keypair,
  PublicKey,
  TransactionMessage,
  VersionedTransaction,
} from '@solana/web3.js';
import { AccountData, PublicInstructionBuilder } from '@ginko/sdk';
import { BN } from '@coral-xyz/anchor';
import BigNumber from 'bignumber.js';
import { ParsedDCAConfig } from '../types/config';
import { logError, logTradeInfo } from '../utils/logger';

export class TradeService {
  private connection: Connection;
  private accountData: AccountData;
  private instructionBuilder: PublicInstructionBuilder;
  private wallet: Keypair;

  constructor(connection: Connection, wallet: Keypair) {
    this.connection = connection;
    this.accountData = new AccountData(connection);
    this.instructionBuilder = new PublicInstructionBuilder(connection);
    this.wallet = wallet;
  }

  async executeTrade(config: ParsedDCAConfig): Promise<boolean> {
    let attempt = 1;
    const maxAttempts = 5;

    while (attempt <= maxAttempts) {
      try {
        // Get wallet balance
        const balance = await this.connection.getBalance(this.wallet.publicKey);
        if (balance <= 0) {
          throw new Error('Insufficient wallet balance');
        }

        // Get asset details
        const asset = await this.accountData.asset(config.asset);
        if (!asset) {
          throw new Error('Asset not found');
        }

        // Calculate quantity based on buy settings
        const quantity = this.calculateQuantity(config.buy_settings);

        // Get latest blockhash
        const { blockhash, lastValidBlockHeight } = await this.connection.getLatestBlockhash();

        // Create order instructions
        const orderInstructions = await this.instructionBuilder.placeOrder({
          owner: this.wallet.publicKey,
          asset: {
            publicKey: config.asset,
            mint: asset.mint,
          },
          direction: 'buy',
          type: 'market',
          quantity: new BN(quantity.toString()),
          priceOracle: asset.quotaPriceOracle,
          tradeMint: asset.mint,
          slippageBps: config.slippage,
          expireTime: 3600, // 1 hour expiration
        });

        // Create versioned transaction
        const messageV0 = new TransactionMessage({
          payerKey: this.wallet.publicKey,
          recentBlockhash: blockhash,
          instructions: orderInstructions,
        }).compileToV0Message();

        const transaction = new VersionedTransaction(messageV0);

        // Sign transaction
        transaction.sign([this.wallet]);

        // Send transaction
        const signature = await this.connection.sendTransaction(transaction);

        // Wait for confirmation
        const confirmation = await this.connection.confirmTransaction({
          signature,
          blockhash,
          lastValidBlockHeight,
        });

        if (confirmation.value.err) {
          throw new Error(`Transaction failed: ${confirmation.value.err}`);
        }

        // Log successful trade
        logTradeInfo({
          marketPrice: 0, // We'll get this from the transaction receipt
          quantity: quantity.toString(),
          attempt,
          txId: signature,
        });

        return true;

      } catch (error) {
        logError(error as Error, {
          attempt,
          config: {
            asset: config.asset.toString(),
            wallet: config.wallet.toString(),
          },
        });

        if (attempt === maxAttempts) {
          return false;
        }

        attempt++;
        // Wait before retrying (exponential backoff)
        await new Promise(resolve => setTimeout(resolve, 1000 * Math.pow(2, attempt - 1)));
      }
    }

    return false;
  }

  private calculateQuantity(buySettings: ParsedDCAConfig['buy_settings']): BigNumber {
    const { type, number } = buySettings;
    return new BigNumber(number);
  }
} 