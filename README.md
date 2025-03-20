# Ginko DCA Bot

A Dollar-Cost Averaging (DCA) bot for the Ginko Protocol on Solana blockchain. This bot automatically executes trades at specified intervals using a DCA strategy.

## Features

- Automated DCA trading on Solana blockchain
- Support for multiple wallets and assets
- Configurable trade frequency using cron expressions
- Automatic retry mechanism for failed trades
- Comprehensive logging system
- Slippage protection
- Single trade execution for testing

## Prerequisites

- Node.js 16+
- Bun.sh runtime
- Solana wallet with private key
- Access to Solana RPC endpoint

## Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd ginko-dca-bot
```

2. Install dependencies:

```bash
bun install
```

3. Create a `.env` file with your configuration:

```env
DCA_BOT_RPC_ENDPOINT=<your-solana-rpc-endpoint>
DCA_BOT_PRIVATE_KEYS=<private-key-1>,<private-key-2>,...
```

4. Create a `config.json` file with your DCA settings:

```json
[
  {
    "wallet": "YOUR_WALLET_PUBLIC_KEY",
    "asset": "ASSET_PUBLIC_KEY",
    "buy_frequency": "0 0 * * *",
    "buy_settings": {
      "type": "worth",
      "number": "100"
    },
    "slippage": 100
  }
]
```

## Configuration

### Environment Variables

- `DCA_BOT_RPC_ENDPOINT`: Solana RPC node URL
- `DCA_BOT_PRIVATE_KEYS`: Comma-separated list of wallet private keys

### DCA Configuration

Each entry in `config.json` supports:

- `wallet`: Public key of the wallet to use
- `asset`: Public key of the asset to trade
- `buy_frequency`: Cron expression for trade timing
- `buy_settings`:
  - `type`: Either "worth" (fixed USD amount) or "amount" (fixed token amount)
  - `number`: The amount to buy
- `slippage`: Maximum allowed slippage in basis points (100 = 1%)

## Usage

### Start the DCA Bot

```bash
bun start
```

### Run a Single Trade (Testing)

```bash
bun run:single
```

### Development Mode

```bash
bun dev
```

## Logging

- Trade logs are stored in `./logs/YYYY-MM-DD.log`
- Error logs are stored in `./errors/YYYY-MM-DD-HH-mm-ss.log`

## Scripts

- `start`: Start the DCA bot
- `dev`: Start the bot in development mode with auto-reload
- `run:single`: Execute a single trade for testing
- `get:assets`: List available assets
- `build`: Build the project
- `lint`: Run linter
- `format`: Format code

## Development

The project uses TypeScript and follows a modular architecture:

- `src/types/`: Type definitions and validation
- `src/services/`: Core business logic
- `src/utils/`: Utility functions
- `scripts/`: Single-execution scripts
- `sdk/`: Ginko Protocol SDK

## Error Handling

- Failed trades are automatically retried up to 5 times
- Each retry uses exponential backoff
- All errors are logged with context for debugging

## License

[License Type]

## Contributing

[Contribution Guidelines] 