import {
  Connection,
  Keypair,
  PublicKey,
  TransactionMessage,
  VersionedTransaction,
} from '@solana/web3.js';
import { config } from 'dotenv';
import { AccountData, PublicInstructionBuilder } from '@ginko/sdk';
import bs58 from 'bs58';
import { validateEnv } from '../src/types/config';
import { logger, logError } from '../src/utils/logger';

// Load environment variables
config();

async function main() {
  try {
    // Get order public key from command line
    if (!process.argv[2]) {
      throw new Error('Please provide an order public key');
    }
    const orderPublicKey = new PublicKey(process.argv[2]);

    // Validate environment variables
    const env = validateEnv();

    // Create Solana connection
    const connection = new Connection(env.DCA_BOT_RPC_ENDPOINT);

    // Load private key (use first key)
    const privateKey = env.DCA_BOT_PRIVATE_KEYS.split(',')[0].trim();
    const wallet = Keypair.fromSecretKey(bs58.decode(privateKey));

    // Create account data instance
    const accountData = new AccountData(connection);
    const instructionBuilder = new PublicInstructionBuilder(connection);

    // Get order details
    logger.info(`Fetching order: ${orderPublicKey.toString()}`);
    const order = await accountData.order(orderPublicKey);

    // Verify order ownership
    if (!order.owner.equals(wallet.publicKey)) {
      throw new Error('Order does not belong to the provided wallet');
    }

    // Get latest blockhash
    const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash();

    // Create cancel instructions
    const cancelInstructions = await instructionBuilder.cancelOrder(order);

    // Create versioned transaction
    const messageV0 = new TransactionMessage({
      payerKey: wallet.publicKey,
      recentBlockhash: blockhash,
      instructions: cancelInstructions,
    }).compileToV0Message();

    const transaction = new VersionedTransaction(messageV0);

    // Sign transaction
    transaction.sign([wallet]);

    // Send transaction
    const signature = await connection.sendTransaction(transaction);

    // Wait for confirmation
    const confirmation = await connection.confirmTransaction({
      signature,
      blockhash,
      lastValidBlockHeight,
    });

    if (confirmation.value.err) {
      throw new Error(`Transaction failed: ${confirmation.value.err}`);
    }

    logger.info(`Order cancelled successfully. Transaction: ${signature}`);

  } catch (error) {
    logError(error as Error);
    process.exit(1);
  }
}

main(); 