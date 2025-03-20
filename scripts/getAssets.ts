import { config } from 'dotenv';
import { Connection } from '@solana/web3.js';
import { AccountData } from '@ginko/sdk';

// Load environment variables
config();

const RPC_ENDPOINT = process.env.DCA_BOT_RPC_ENDPOINT;

if (!RPC_ENDPOINT) {
  throw new Error('DCA_BOT_RPC_ENDPOINT environment variable is required');
}

const main = async () => {
  try {
    const connection = new Connection(RPC_ENDPOINT);
    const accountData = new AccountData(connection);

    // Get all assets
    const assets = await accountData.assets();

    console.log('Available Assets:');
    assets.forEach((asset) => {
      console.log({
        publicKey: asset.publicKey.toString(),
        mint: asset.mint.toString(),
        priceOracle: asset.quotaPriceOracle.toString(),
        paused: asset.paused
      });
    });

    process.exit(0);
  } catch (error) {
    console.error('Failed to get assets:', (error as Error).message);
    process.exit(1);
  }
};

main(); 