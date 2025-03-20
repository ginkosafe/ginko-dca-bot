# Ginko DCA Bot

A Dollar-Cost Averaging (DCA) bot for the Ginko Protocol on Solana blockchain. The bot automatically executes trades at specified intervals based on your configuration.

## Features

- Automated DCA trading on Solana
- Support for multiple wallets and assets
- Configurable trade frequency using cron expressions
- Trade by worth or amount
- Automatic retry on failed trades
- Comprehensive logging
- Command-line tools for manual operations

## Prerequisites

- [Bun.sh](https://bun.sh) runtime
- Solana wallet with private key
- RPC endpoint for Solana network

## Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/ginko-dca-bot.git
cd ginko-dca-bot
```

2. Install dependencies:

```bash
bun install
```

3. Configure environment variables:
Create a `.env` file with:

```env
DCA_BOT_RPC_ENDPOINT=your_rpc_endpoint
DCA_BOT_PRIVATE_KEYS=key1,key2,key3
```

4. Configure trading settings:
Edit `config.json` with your trading parameters:

```json
[
  {
    "wallet": "wallet_public_key",
    "asset": "asset_public_key",
    "buy_frequency": "0 0 * * *",
    "buy_settings": {
      "type": "worth",
      "number": "100"
    },
    "slippage": 100
  }
]
```

## Usage

### Start the DCA Bot

```bash
bun start
```

### Command-line Tools

1. Place a single order:

```bash
bun place-order <wallet> <asset> <amount> [type=worth|amount] [slippage=100]
```

2. Cancel an order:

```bash
bun cancel-order <order_id>
```

3. Get asset list:

```bash
bun get-assets
```

4. Get asset price:

```bash
bun get-asset-price <asset>
```

## Configuration

### Environment Variables

- `DCA_BOT_RPC_ENDPOINT`: Solana RPC node address
- `DCA_BOT_PRIVATE_KEYS`: Comma-separated list of wallet private keys

### Trading Configuration (config.json)

Each trading configuration object contains:

- `wallet`: Wallet public key
- `asset`: Asset public key
- `buy_frequency`: Cron expression for trade timing
- `buy_settings`:
  - `type`: "worth" or "amount"
  - `number`: Amount to trade
- `slippage`: Maximum allowed slippage in basis points (100 = 1%)

## Logging

- Trade logs: `./logs/YYYY-MM-DD.log`
- Error logs: `./errors/YYYY-MM-DD-HH-mm-ss.log`

## Development

The project is built with TypeScript and uses:

- @solana/web3.js for Solana blockchain interaction
- @coral-xyz/anchor for program interaction
- node-cron for scheduling
- winston for logging

## License

MIT 