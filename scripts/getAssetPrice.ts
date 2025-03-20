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
const [assetArg] = process.argv.slice(2);

if (!assetArg) {
  console.error('Usage: bun scripts/getAssetPrice.ts <asset>');
  process.exit(1);
}

const main = async () => {
  try {
    const connection = new Connection(RPC_ENDPOINT);
    const accountData = new AccountData(connection);

    // Get asset details
    const asset = await accountData.asset(new PublicKey(assetArg));
    if (!asset) {
      throw new Error('Asset not found');
    }

    // Get current price
    const priceInfo = await accountData.getAssetPrice(asset.publicKey.toString());
    if (!priceInfo) {
      throw new Error('Failed to fetch price');
    }

    console.log('Asset Price:', {
      symbol: asset.publicKey.toString(),
      price: priceInfo.price,
      timestamp: new Date(priceInfo.timestamp * 1000).toISOString(),
      confidence: priceInfo.confidence
    });

    process.exit(0);
  } catch (error) {
    console.error('Failed to get asset price:', (error as Error).message);
    process.exit(1);
  }
};

main(); 