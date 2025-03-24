# DCA bot 功能列表

基于"定投"策略（Dollar-Cost Averaging，简称 DCA）的自动化交易程序。它的核心理念是按照固定时间间隔（例如每天、每周或每月），以固定金额或固定数量买入某种资产（如比特币或股票），而不去关注短期市场波动。

我们会使用 @solana/web3.js@1 通过调用 ./sdk 创建 DCA bot

## 技术栈

- bun.sh
- typescript
- solana/web3.js@1

---

- 确保所有代码都使用 typescript，而不是 javascript
- 按照需求添加必须的依赖库
- 依赖库必须支持 typescript并且类型安全


## 文档

### SDK

应该严格按照 llms.txt 中的描述构建代码
[sdk_llms_txt](./sdk/llms.txt)

### Bun.sh

[bun_sh_llms_txt](https://bun.sh/llms.txt)

### Solana

我们使用 @solana/web3.js 和 @coral-xyz/anchor 构建与 solana 相关的代码

- 使用 VersionTransaction 发送交易
- 需要确认 Transaction 状态变为 confirmed
- 所有交易必须使用 Versioned Transaction（version 0）以支持更多功能
  - 使用 TransactionMessage 构建消息
  - 使用 VersionedTransaction 创建交易
  - 在发送交易前完成签名

## 配置参数

### 环境变量

- DCA_BOT_RPC_ENDPOINT: solana rpc 节点地址
- DCA_BOT_PRIVATE_KEYS，key: solana 使用的钱包private key, 以 "," 分隔

### json config

可以配置多种交易资产，每个资产都应该有一个配置参数

```
[{
  "wallet": "wallet public key",
  "asset": {
    "mint": "asset mint public key",
    "symbol": "asset symbol"
  },
  "buy_frequency": "cron expression",
  "buy_settings": {
    "type": "worth or amount"
    "number": "buy worth or buy amount"
  },
  "slippage": "same as the sdk slippage"
}]
```

## 交易流程

1. 获取钱包余额
2. 获取价格
3. 获取滑点
4. 如果符合交易条件，那么交易

## 设计要求:

1. 我们使用 Bun.sh 构建和运行 bot
2. 如果交易失败应该自动重试，最多重试5次，然后跳过
3. 每个交易可以使用子进程运行
4. 如果钱包余额不足，那么记录错误信息，然后跳过
5. 包含单次交易的脚本，用于测试一次交易功能
6. 定时任务执行时应该尽量记录日志
7. 日志应该保存到 ./logs/ 目录，`{YYYY-MM-DD}.log`
   1. 需要记录市场价，交易数量，交易次数，交易 tx
   2. 日志应该包括记录的时间信息，精确到秒
8. 如果有错误需要记录错误信息到 ./errors/ 目录，文件名为 `{YYYY-MM-DD-HH-mm-ss}.log`

## 目录结构

- sdk: 和sdk相关的代码，不应该做任何修改
- scripts: 存放单次运行的脚本
- src/
  - services
    - scheduler.service.ts: 和 scheduler 相关的代码
    - trade.service.ts: 调用 ./sdk 完成业务的代码
  - types
    - config.ts 类型定义和检查
  - utils
    - logger.ts: 日志输出工具
  - index.ts: 入口文件，启动 dca-bot

### scripts

应该包括的脚本:

- placeOrder.ts: 使用 config.json 中的第一个配置创建 Order
- cancelOrder.ts: 通过 publicKey 取消订单
- getAssetPrice.ts: 通过 asset symbol 获取 Price
- getAssets.ts: 获取所有支持的 assets
- getOrderByPublicKey.ts: 通过 order publicKey 获取订单信息

所有脚本使用的方法应该来源于 src/services/ ,以保持和 src/index 启动后的表现一致。

例子:
```
import { Connection, Keypair, PublicKey } from '@solana/web3.js';
import { config } from 'dotenv';
import fs from 'fs';
import path from 'path';
import bs58 from 'bs58';
import { validateEnv, validateConfig, parseConfig } from '../src/types/config';
import { TradeService } from '../src/services/trade.service';
import { logger, logError } from '../src/utils/logger';

// Load environment variables
config();

async function main() {
  try {
    // Load configuration
    const configPath = path.join(process.cwd(), 'config.json');
    const configFile = fs.readFileSync(configPath, 'utf-8');
    const configJson = JSON.parse(configFile);
    const configs = validateConfig(configJson);

    // Get first configuration
    const config = configs[0];
    if (!config) {
      throw new Error('No configuration found in config.json');
    }

    // Parse configuration
    const parsedConfig = parseConfig(config);

    // Validate environment variables
    const env = validateEnv();

    // Create Solana connection
    const connection = new Connection(env.DCA_BOT_RPC_ENDPOINT);

    // Load private key (use first key)
    const privateKey = env.DCA_BOT_PRIVATE_KEYS.split(',')[0].trim();
    const wallet = Keypair.fromSecretKey(bs58.decode(privateKey));

    // Create trade service
    const tradeService = new TradeService(connection, wallet);

    // Execute trade
    logger.info('Executing trade...');
    logger.info(`Using configuration for asset: ${parsedConfig.asset.toString()}`);
    const success = await tradeService.executeTrade(parsedConfig);

    if (!success) {
      throw new Error('Trade failed after maximum retries');
    }

    logger.info('Trade executed successfully');

  } catch (error) {
    logError(error as Error);
    process.exit(1);
  }
}

main(); 
```

### config

config 应该包含以下属性:

```
{
  "wallet": "public_key",
  "asset": {
    "mint": "asset_public_key",
    "symbol": "asset_symbol"
  },
  "trade_mint": "public_key",
  "buy_frequency": "*/5 * * * *",
  "buy_settings": {
    "type": "amount",
    "number": "1000000"
  },
  "slippage": 100
}
```

- trade_mint 应该是可配置的，对应 sdk 中的 trade_mint
- publicKey 应该检查是否符合 solana/web3.js 中 publicKey 的标准

### getAssetPrice

应该根据 [price_api](./price_api.md) 示例修改代码

代码使用 fetch price api

```
const response = await fetch(`${PRICE_API_URL}/price/${symbol}`);
        const price: PriceInfo = await response.json();
        return price;
```

所有代码和注释应该以英语输出。