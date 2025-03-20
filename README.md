# Ginko DCA Bot

A Dollar-Cost Averaging (DCA) bot for the Ginko Protocol on Solana. This bot automatically buys assets at specified intervals regardless of market price, following the DCA investment strategy.

## Features

- Configure multiple trading wallets with different assets
- Schedule buy orders using cron expressions
- Buy by fixed value or fixed amount
- Set maximum slippage tolerance
- Automatic retry on transaction failures
- Detailed logging of all transactions and errors
- Isolated execution of trades in child processes
- Easy configuration through environment variables

## Prerequisites

- [Bun](https://bun.sh/) (v1.0.0 or higher)
- Solana wallet with private key access
- Access to a Solana RPC endpoint

## Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/ginko-dca-bot.git
cd ginko-dca-bot
```

2. Install dependencies:

```bash
bun install
```

3. Set up environment variables by copying the example file:

```bash
cp .env.example .env
```

4. Edit `.env` file with your specific configuration:

```env
# Solana RPC Endpoint
DCA_BOT_RPC_ENDPOINT=https://api.mainnet-beta.solana.com

# Wallet private keys separated by comma (,)
DCA_BOT_PRIVATE_KEYS=your_private_key_here

# Asset address
DCA_BOT_ASSET_ADDRESS=asset_public_key_here

# Buy frequency in cron expression (e.g. 0 0 * * * for daily at midnight)
DCA_BOT_CRON=0 0 * * *

# Buy type (worth or amount)
DCA_BOT_BUY_TYPE=worth

# Buy amount (in SOL if worth, in token units if amount)
DCA_BOT_BUY_NUMBER=0.1

# Slippage in basis points (100 = 1%)
DCA_BOT_SLIPPAGE_BPS=100
```

## Usage

### Start the DCA Bot

```bash
bun start
```

The bot will run continuously, executing trades according to the configured schedule.

### Run a Single Trade

For testing or manual execution:

```bash
bun run:single
```

### Development Mode

Run with automatic reloading on file changes:

```bash
bun dev
```

### Build for Production

Create a standalone executable:

```bash
bun build
```

## Cron Expression Format

The bot uses cron expressions to schedule trades. Here are some examples:

- `0 0 * * *` - Daily at midnight
- `0 */6 * * *` - Every 6 hours
- `0 0 * * 1` - Weekly on Monday at midnight
- `0 0 1 * *` - Monthly on the 1st at midnight
- `*/10 * * * *` - Every 10 minutes

## Logs

- Transaction logs are stored in the `./logs/` directory, named by date (YYYY-MM-DD.log)
- Error logs are stored in the `./errors/` directory, with timestamp in filename (YYYY-MM-DD-HH-mm-ss.log)

## Security Considerations

- Never share your .env file or expose your private keys
- Consider using a dedicated wallet with limited funds for the bot
- Test with small amounts before using larger sums

## Development

### Project Structure

```
├── src/
│   ├── config/         # Configuration loading
│   ├── services/       # Core services (wallet, logging, etc.)
│   ├── scripts/        # Standalone scripts
│   ├── types/          # TypeScript type definitions
│   └── index.ts        # Main entry point
├── logs/               # Transaction logs
├── errors/             # Error logs
├── .env                # Environment variables
└── README.md           # This file
```

## License

MIT 