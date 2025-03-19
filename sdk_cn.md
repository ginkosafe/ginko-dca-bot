# Ginko DCA Bot SDK 文档

## API 列表

### AccountData 类

AccountData 类提供了从区块链获取 Ginko 账户数据的方法。

#### 构造函数
```typescript
constructor(connection: Connection)
```
- 参数：
  - `connection`: Solana 连接实例
- 返回：AccountData 实例

#### asset 方法
获取指定公钥的资产数据。
```typescript
async asset(publicKey: PublicKey): Promise<Asset>
```
- 参数：
  - `publicKey`: 资产账户的公钥
- 返回：Promise<Asset>
- 类型定义：
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

#### assets 方法
获取资产列表，支持按暂停状态筛选。
```typescript
async assets(paused?: boolean): Promise<Asset[]>
```
- 参数：
  - `paused`: 可选，按暂停状态筛选
- 返回：Promise<Asset[]>

#### order 方法
获取指定公钥的订单数据。
```typescript
async order(publicKey: PublicKey): Promise<Order>
```
- 参数：
  - `publicKey`: 订单账户的公钥
- 返回：Promise<Order>
- 类型定义：
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

#### orders 方法
获取订单列表，支持多个筛选条件。
```typescript
async orders(
  owner?: PublicKey,
  asset?: PublicKey,
  paymentMint?: PublicKey
): Promise<Order[]>
```
- 参数：
  - `owner`: 可选，订单所有者的公钥
  - `asset`: 可选，资产公钥
  - `paymentMint`: 可选，支付代币的公钥（买入订单为输入代币，卖出订单为输出代币）
- 返回：Promise<Order[]>

## API 使用示例

```typescript
import { Connection, PublicKey } from "@solana/web3.js";
import { AccountData } from "@ginko-dca-bot/sdk";

// 创建连接实例
const connection = new Connection("https://api.mainnet-beta.solana.com");

// 初始化 AccountData
const accountData = new AccountData(connection);

// 获取特定资产信息
const assetPublicKey = new PublicKey("...");
const asset = await accountData.asset(assetPublicKey);

// 获取所有未暂停的资产
const assets = await accountData.assets(false);

// 获取特定订单信息
const orderPublicKey = new PublicKey("...");
const order = await accountData.order(orderPublicKey);

// 获取特定用户的所有订单
const userPublicKey = new PublicKey("...");
const userOrders = await accountData.orders(userPublicKey);

// 获取特定资产的所有订单
const assetOrders = await accountData.orders(undefined, assetPublicKey);
```

## 错误列表

1. 连接错误
   - 错误描述：无法连接到 Solana 网络
   - 解决方法：
     - 检查网络连接
     - 确认 RPC 节点地址是否正确
     - 尝试使用其他 RPC 节点

2. 账户不存在错误
   - 错误描述：尝试获取不存在的账户数据
   - 解决方法：
     - 确认账户公钥是否正确
     - 检查账户是否已创建

3. 权限错误
   - 错误描述：没有足够的权限访问账户数据
   - 解决方法：
     - 确认使用的钱包有正确的权限
     - 检查账户所有权

4. 数据解析错误
   - 错误描述：账户数据格式不正确
   - 解决方法：
     - 确认 SDK 版本与协议版本匹配
     - 检查账户数据是否被正确初始化

5. 过滤器限制错误
   - 错误描述：在 orders 方法中使用过多过滤器
   - 解决方法：
     - 减少过滤器数量（最多支持 4 个过滤器）
     - 使用其他查询方式获取数据 