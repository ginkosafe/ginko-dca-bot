# DCA bot 功能列表

基于“定投”策略（Dollar-Cost Averaging，简称 DCA）的自动化交易程序。它的核心理念是按照固定时间间隔（例如每天、每周或每月），以固定金额或固定数量买入某种资产（如比特币或股票），而不去关注短期市场波动。

我们会使用 @solana/web3.js@1 通过调用 ginko-sdk 创建 DCA bot

## 配置参数

可以配置多种交易资产，每个资产都应该有一个配置参数

- 交易钱包: 配置钱包的 private_key
- Asset: DCA bot 只购买配置中的 asset
- 买入频率: 使用 cron 表达式设置买入频率
- 单次买入金额 / 数量: 配置单次买入的金额或者数量
  - type: worth | amount 设置类型
  - number: 购买数量
- 滑点: 设置允许相比当前市价的滑点

## @solana/web3.js

- 从环境变量中获取所有的 private_keys
  - Key 为 DCA_BOT_PRIVATE_KEYS，key 之间以 "," 分隔
- 从环境变量中获取 rpc_endpoint
  - Key 为 DCA_BOT_RPC_ENDPOINT
- 使用 VersionTransaction 发送交易
- 需要确认 Transaction 状态变为 confirmed

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

所有代码和注释应该以英语输出。