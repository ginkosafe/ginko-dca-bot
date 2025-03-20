import { Connection, PublicKey, Keypair } from '@solana/web3.js';
import { BN } from '@coral-xyz/anchor';
import { AccountData, getAssetPrice, parsePrice } from '@ginko/sdk';
import { DCAConfig, TradeParams } from '../types';
import { logTrade, logError } from './logger';

export class TradeService {
  private connection: Connection;
  private accountData: AccountData;
  private retryCount: number = 5;

  constructor(rpcEndpoint: string) {
    this.connection = new Connection(rpcEndpoint);
    this.accountData = new AccountData(this.connection);
  }

  async executeTrade(config: DCAConfig, wallet: Keypair): Promise<void> {
    let attempts = 0;
    while (attempts < this.retryCount) {
      try {
        // Get wallet balance
        const balance = await this.connection.getBalance(wallet.publicKey);
        if (balance <= 0) {
          throw new Error('Insufficient wallet balance');
        }

        // Get asset details
        const asset = await this.accountData.asset(new PublicKey(config.asset));
        if (!asset) {
          throw new Error('Asset not found');
        }

        // Get current price
        const priceInfo = await getAssetPrice(asset.publicKey.toString());
        if (!priceInfo) {
          throw new Error('Failed to fetch price');
        }

        // Calculate trade amount
        const tradeAmount = config.buy_settings.type === 'worth'
          ? new BN(config.buy_settings.number)
          : new BN(config.buy_settings.number).mul(parsePrice(priceInfo.price.toString()).mantissa);

        // Prepare trade parameters
        const tradeParams: TradeParams = {
          owner: wallet.publicKey,
          asset: {
            publicKey: new PublicKey(config.asset),
            mint: asset.mint
          },
          quantity: tradeAmount,
          priceOracle: asset.quotaPriceOracle,
          tradeMint: asset.mint,
          slippageBps: config.slippage
        };

        // Execute trade
        const tx = await this.placeOrder(tradeParams);

        // Log successful trade
        logTrade({
          timestamp: new Date().toISOString(),
          marketPrice: priceInfo.price,
          tradeAmount: tradeAmount.toString(),
          tradeCount: attempts + 1,
          transactionId: tx
        });

        return;
      } catch (error) {
        attempts++;
        if (attempts >= this.retryCount) {
          logError(error as Error, {
            tradeCount: attempts
          });
          throw error;
        }
        // Wait before retrying
        await new Promise(resolve => setTimeout(resolve, 1000 * attempts));
      }
    }
  }

  private async placeOrder(params: TradeParams): Promise<string> {
    try {
      // Place market order
      const instructions = await this.accountData.placeOrder({
        ...params,
        type: 'market',
        direction: 'buy',
        limitPrice: null,
        expireTime: 3600 // 1 hour expiration
      });

      // Send transaction
      const tx = await this.connection.sendTransaction(instructions[0]);
      await this.connection.confirmTransaction(tx);

      return tx;
    } catch (error) {
      throw new Error(`Failed to place order: ${(error as Error).message}`);
    }
  }
} 