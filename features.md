# DCA bot 功能列表

基于"定投"策略（Dollar-Cost Averaging，简称 DCA）的自动化交易程序。它的核心理念是按照固定时间间隔（例如每天、每周或每月），以固定金额或固定数量买入某种资产（如比特币或股票），而不去关注短期市场波动。

我们会使用 @solana/web3.js@1 通过调用 ./sdk 创建 DCA bot

## 文档

### SDK

应该严格按照 llms.txt 中的描述构建代码
[sdk_llms_txt](./llms.txt)

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
  "asset": "asset public key",
  "buy_frequency": "cron expression",
  "buy_settings": {
    "type": "worth or amount"
    "number": "buy worth or buy amount"
  },
  "slippage": "same as the sdk slippage"
}]
```

## 单次交易流程

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

./sdk: 和sdk相关的代码，不应该做任何修改
./src: 和 dca bot 相关的代码
./scripts: 存放单次执行的代码

## 额外要求

1. 在 "./scripts" 中生成单次操作的函数，这个函数应该调用与 "./src" 中的相同的服务
2. "./scripts"中应该包括:
  - placeOrder
  - cancelOrder
  - getAssets
  - getAssetPrice
  - getOrders
  - getOrderByPublicKey
3. dca-bot 依赖应该参考 "./sdk/package.json"，以确保 sdk 可以运行

所有代码和注释应该以英语输出。
