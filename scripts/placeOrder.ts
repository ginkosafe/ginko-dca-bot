import { config } from 'dotenv';
import { DCAService } from '../src/services/dca';
import { DCAConfig } from '../src/types';

// Load environment variables
config();

const RPC_ENDPOINT = process.env.DCA_BOT_RPC_ENDPOINT;
const PRIVATE_KEYS = process.env.DCA_BOT_PRIVATE_KEYS?.split(',') || [];

if (!RPC_ENDPOINT) {
  throw new Error('DCA_BOT_RPC_ENDPOINT environment variable is required');
}

if (!PRIVATE_KEYS.length) {
  throw new Error('DCA_BOT_PRIVATE_KEYS environment variable is required');
}

// Get command line arguments
const [walletArg, assetArg, amountArg, typeArg = 'worth', slippageArg = '100'] = process.argv.slice(2);

if (!walletArg || !assetArg || !amountArg) {
  console.error('Usage: bun scripts/placeOrder.ts <wallet> <asset> <amount> [type=worth|amount] [slippage=100]');
  process.exit(1);
}

const config: DCAConfig = {
  wallet: walletArg,
  asset: assetArg,
  buy_frequency: '* * * * *', // Not used for single execution
  buy_settings: {
    type: typeArg as 'worth' | 'amount',
    number: amountArg
  },
  slippage: parseInt(slippageArg)
};

const main = async () => {
  try {
    const dcaService = new DCAService(RPC_ENDPOINT, [config], PRIVATE_KEYS);
    await dcaService.executeOnce(config);
    console.log('Order placed successfully');
    process.exit(0);
  } catch (error) {
    console.error('Failed to place order:', (error as Error).message);
    process.exit(1);
  }
};

main(); 