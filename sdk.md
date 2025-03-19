# Ginko DCA Bot SDK Documentation

## API List

### AccountData Class

The AccountData class provides methods to fetch Ginko account data from the blockchain.

#### Constructor
```typescript
constructor(connection: Connection)
```
- Parameters:
  - `connection`: Solana connection instance
- Returns: AccountData instance

#### asset Method
Fetch asset data for a given public key.
```typescript
async asset(publicKey: PublicKey): Promise<Asset>
```
- Parameters:
  - `publicKey`: Public key of the asset account
- Returns: Promise<Asset>
- Type Definition:
```typescript
interface Asset {
  publicKey: PublicKey;
  nonce: number[];
  bump: number;
  mint: PublicKey;
  ceiling: BN;
  quotaPriceOracle: PublicKey;
  paused: boolean;
}
```

#### assets Method
Fetch assets with optional pause status filter.
```typescript
async assets(paused?: boolean): Promise<Asset[]>
```
- Parameters:
  - `paused`: Optional boolean to filter by pause status
- Returns: Promise<Asset[]>

#### order Method
Fetch order data for a given public key.
```typescript
async order(publicKey: PublicKey): Promise<Order>
```
- Parameters:
  - `publicKey`: Public key of the order account
- Returns: Promise<Order>
- Type Definition:
```typescript
interface Order {
  publicKey: PublicKey;
  nonce: number[];
  bump: number;
  owner: PublicKey;
  asset: PublicKey;
  inputHolder: PublicKey;
  paymentMint: PublicKey;
  priceOracle: PublicKey;
  direction: "buy" | "sell";
  type: "market" | "limit";
  limitPrice: Price | null;
  inputQuantity: BN;
  slippageBps: number;
  createdAt: Date;
  expireAt: Date;
  canceledAt: Date | null;
  filledQuantity: BN;
  filledOutputQuantity: BN;
  lastFillSlot: BN;
}
```

#### orders Method
Fetch orders with multiple optional filters.
```typescript
async orders(
  owner?: PublicKey,
  asset?: PublicKey,
  paymentMint?: PublicKey
): Promise<Order[]>
```
- Parameters:
  - `owner`: Optional public key of the order owner
  - `asset`: Optional public key of the asset
  - `paymentMint`: Optional public key of the payment mint (input mint for buy orders, output mint for sell orders)
- Returns: Promise<Order[]>

## API Usage Examples

```typescript
import { Connection, PublicKey } from "@solana/web3.js";
import { AccountData } from "@ginko-dca-bot/sdk";

// Create connection instance
const connection = new Connection("https://api.mainnet-beta.solana.com");

// Initialize AccountData
const accountData = new AccountData(connection);

// Fetch specific asset information
const assetPublicKey = new PublicKey("...");
const asset = await accountData.asset(assetPublicKey);

// Fetch all non-paused assets
const assets = await accountData.assets(false);

// Fetch specific order information
const orderPublicKey = new PublicKey("...");
const order = await accountData.order(orderPublicKey);

// Fetch all orders for a specific user
const userPublicKey = new PublicKey("...");
const userOrders = await accountData.orders(userPublicKey);

// Fetch all orders for a specific asset
const assetOrders = await accountData.orders(undefined, assetPublicKey);
```

## Error List

1. Connection Error
   - Description: Unable to connect to Solana network
   - Solutions:
     - Check network connection
     - Verify RPC node address
     - Try alternative RPC nodes

2. Account Not Found Error
   - Description: Attempting to fetch data for a non-existent account
   - Solutions:
     - Verify account public key
     - Check if account has been created

3. Permission Error
   - Description: Insufficient permissions to access account data
   - Solutions:
     - Ensure wallet has correct permissions
     - Verify account ownership

4. Data Parsing Error
   - Description: Incorrect account data format
   - Solutions:
     - Verify SDK version matches protocol version
     - Check if account data is properly initialized

5. Filter Limit Error
   - Description: Too many filters in orders method
   - Solutions:
     - Reduce number of filters (maximum 4 filters supported)
     - Use alternative query methods 