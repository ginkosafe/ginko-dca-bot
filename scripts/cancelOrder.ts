import { config } from 'dotenv';
import { Connection, PublicKey } from '@solana/web3.js';
import { AccountData } from '@ginko/sdk';

// Load environment variables
config();

const RPC_ENDPOINT = process.env.DCA_BOT_RPC_ENDPOINT;

if (!RPC_ENDPOINT) {
  throw new Error('DCA_BOT_RPC_ENDPOINT environment variable is required');
}

// Get command line arguments
const [orderArg] = process.argv.slice(2);

if (!orderArg) {
  console.error('Usage: bun scripts/cancelOrder.ts <order>');
  process.exit(1);
}

const main = async () => {
  try {
    const connection = new Connection(RPC_ENDPOINT);
    const accountData = new AccountData(connection);

    // Get order details
    const order = await accountData.order(new PublicKey(orderArg));
    if (!order) {
      throw new Error('Order not found');
    }

    // Cancel the order
    const tx = await accountData.cancelOrder(order);
    await connection.confirmTransaction(tx);

    console.log('Order cancelled successfully:', tx);
    process.exit(0);
  } catch (error) {
    console.error('Failed to cancel order:', (error as Error).message);
    process.exit(1);
  }
};

main(); 