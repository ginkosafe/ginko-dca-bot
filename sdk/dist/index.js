"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GinkoSDK = exports.ORDER_TYPE = exports.DIRECTION = void 0;
const anchor_1 = require("@coral-xyz/anchor");
const web3_js_1 = require("@solana/web3.js");
const on_demand_1 = require("@switchboard-xyz/on-demand");
const idl_1 = require("./idl");
const json_1 = require("./json/json");
const solana_1 = require("./solana");
__exportStar(require("./solana"), exports);
exports.DIRECTION = {
    BUY: { buy: {} },
    SELL: { sell: {} },
};
exports.ORDER_TYPE = {
    MARKET: { market: {} },
    LIMIT: { limit: {} },
};
class GinkoSDK {
    constructor(connection, wallet) {
        const provider = new anchor_1.AnchorProvider(connection, wallet);
        this.program = new anchor_1.Program(idl_1.GINKO_IDL, provider);
        this.programSwitchboard = new anchor_1.Program(idl_1.SWITCHBOARD_IDL, provider);
        this.wallet = wallet;
        this.connection = connection;
        this.assetCache = new Map();
        this.tokensCache = new Map();
        this.trackedTokens = new Set();
    }
    getOwner() {
        const owner = this.wallet.publicKey;
        if (!owner) {
            throw new Error("Wallet not connected");
        }
        return owner;
    }
    async getToken(mint) {
        // Check cache first
        const cached = this.tokensCache.get(mint);
        if (cached) {
            return cached;
        }
        // Fetch and cache
        const mintPubkey = new web3_js_1.PublicKey(mint);
        const mintInfo = await (0, solana_1.getTokenMintInfo)(this.connection, mintPubkey);
        this.tokensCache.set(mintPubkey.toBase58(), mintInfo);
        this.trackedTokens.add(mintPubkey.toBase58());
        return mintInfo;
    }
    async getAsset(asset) {
        // Check cache first
        const cached = this.assetCache.get(asset.toLowerCase());
        if (cached) {
            return cached;
        }
        // Fetch and cache
        const assetPubkey = new web3_js_1.PublicKey(asset);
        const assetAccount = await this.program.account.asset.fetch(assetPubkey);
        const result = [assetPubkey, assetAccount];
        this.assetCache.set(asset.toLowerCase(), result);
        return result;
    }
    async formatAsset(address, asset) {
        // Track token mints
        const assetTokenMint = asset.assetTokenMint.toBase58();
        const paymentTokenMint = asset.paymentTokenMint.toBase58();
        // Get token info
        const [assetTokenInfo, paymentTokenInfo] = await Promise.all([
            this.getToken(assetTokenMint),
            this.getToken(paymentTokenMint),
        ]);
        return {
            address: address.toBase58(),
            symbol: asset.symbol,
            admin: asset.admin.toBase58(),
            assetTokenMint: assetTokenMint,
            assetTokenDecimals: assetTokenInfo.decimals,
            paymentTokenMint: paymentTokenMint,
            paymentTokenDecimals: paymentTokenInfo.decimals,
            settler: asset.settler.toBase58(),
            priceOracle: asset.priceOracle.toBase58(),
            minOrderValue: (0, solana_1.toUINumber)(asset.minOrderValue, paymentTokenInfo.decimals),
            ceiling: (0, solana_1.toUINumber)(asset.ceiling, paymentTokenInfo.decimals),
            orderCancelDelay: asset.orderCancelDelay,
            paused: asset.paused,
        };
    }
    /**
     * Fetch all assets in the Ginko protocol
     * @param useCache Whether to use cached data (default: true)
     * @returns List of formatted assets with their current prices
     */
    async assets(useCache = true) {
        try {
            if (useCache && this.assetCache.size > 0) {
                const formattedAssets = await Promise.all(Array.from(this.assetCache.values()).map(([assetPK, asset]) => this.formatAsset(assetPK, asset)));
                return formattedAssets.sort((a, b) => a.symbol.localeCompare(b.symbol));
            }
            // Fetch all assets
            const assets = await this.program.account.asset.all();
            // Cache assets
            assets.forEach(({ publicKey, account }) => {
                this.assetCache.set(publicKey.toBase58().toLowerCase(), [
                    publicKey,
                    account,
                ]);
            });
            // Format and cache all assets
            const formattedAssets = await Promise.all(assets.map(({ publicKey, account }) => this.formatAsset(publicKey, account)));
            return formattedAssets.sort((a, b) => a.symbol.localeCompare(b.symbol));
        }
        catch (error) {
            console.error("Error fetching assets:", error);
            throw error;
        }
    }
    formatMint(mintInfo) {
        return {
            address: mintInfo.address.toBase58(),
            decimals: mintInfo.decimals,
            symbol: "",
            name: "",
        };
    }
    /**
     * Get all tracked token information
     * @returns List of formatted token information
     */
    async tokens() {
        const tokenInfos = await Promise.all(Array.from(this.trackedTokens).map((mint) => this.getToken(mint)));
        return tokenInfos.map((token) => this.formatMint(token));
    }
    /**
     * Fetch all orders for a given wallet
     * @param walletAddress The wallet address to fetch orders for
     * @returns List of formatted orders
     */
    async orders(walletAddress) {
        const publicKey = new web3_js_1.PublicKey(walletAddress);
        const orders = await this.program.account.order.all([
            {
                memcmp: {
                    offset: 8, // After discriminator
                    bytes: publicKey.toBase58(),
                },
            },
        ]);
        const formattedOrders = await Promise.all(orders.map(({ account }) => this.formatOrder(account)));
        console.log("Formatted orders:", formattedOrders);
        return formattedOrders.sort((a, b) => {
            const aSlot = a.createdAt.getTime();
            const bSlot = b.createdAt.getTime();
            return bSlot - aSlot; // Most recent first
        });
    }
    async formatOrder(order) {
        const now = Date.now();
        const createdAt = new Date(Number(order.createdAt) * 1000);
        const expireTime = new Date(Number(order.expireTime) * 1000);
        const canceledAt = order.canceledAt
            ? new Date(Number(order.canceledAt) * 1000)
            : null;
        const lastFillAt = new Date(Number(order.lastFillAt) * 1000);
        const isBuy = order.direction.buy;
        let status = "active";
        if (order.canceledAt) {
            status = "canceled";
        }
        else if (order.filledQty.eq(order.quantity)) {
            status = "filled";
        }
        else if (expireTime.getTime() < now) {
            status = "expired";
        }
        const address = this.getOrderPDA(order.owner, order.count.toNumber());
        const [_, asset] = await this.getAsset(order.asset.toBase58());
        if (!asset) {
            throw new Error("Asset not found");
        }
        const quantityTokenMint = isBuy
            ? asset.paymentTokenMint
            : asset.assetTokenMint;
        const outputTokenMint = isBuy
            ? asset.assetTokenMint
            : asset.paymentTokenMint;
        const quantityTokenInfo = await this.getToken(quantityTokenMint.toBase58());
        const outputTokenInfo = await this.getToken(outputTokenMint.toBase58());
        const filledQuantity = (0, solana_1.toUINumber)(order.filledQty, quantityTokenInfo.decimals);
        const filledOutputQuantity = (0, solana_1.toUINumber)(order.filledOutputQty, outputTokenInfo.decimals);
        let filledPrice = null;
        if (status === "filled") {
            filledPrice = isBuy
                ? filledQuantity / filledOutputQuantity
                : filledOutputQuantity / filledQuantity;
        }
        return {
            address: address.toBase58(),
            count: order.count.toNumber(),
            owner: order.owner.toBase58(),
            asset: order.asset.toBase58(),
            symbol: asset.symbol ?? "-",
            direction: isBuy ? "buy" : "sell",
            type: order.orderType.market ? "market" : "limit",
            price: order.limitPrice
                ? (0, solana_1.toUINumber)(order.limitPrice.mantissa, order.limitPrice.scale)
                : null,
            quantity: (0, solana_1.toUINumber)(order.quantity, quantityTokenInfo.decimals),
            filledQuantity,
            filledOutputQuantity,
            slippageBps: order.slippageBps,
            status,
            expireTime,
            createdAt,
            canceledAt,
            lastFillAt,
            inputHolder: order.inputHolder.toBase58(),
            isPartialFill: order.filledQty.toNumber() > 0 && order.filledQty != order.quantity,
            filledPrice,
        };
    }
    /**
     * Get current price from the oracle for a given asset
     * @param asset The asset public key
     * @returns Current price from oracle
     */
    async getPrice(assetAddress) {
        try {
            const [, assetAccount] = await this.getAsset(assetAddress);
            const priceOracle = assetAccount.priceOracle;
            // TODO: fetch account info, check if owner is switchboard or pyth
            // const oracleAccount = await this.connection.getAccountInfo(priceOracle);
            // if (!oracleAccount) {
            //   throw new Error("Price oracle not found");
            // }
            const pf = new on_demand_1.PullFeed(this.programSwitchboard, priceOracle);
            const data = await pf.loadData();
            const decimals = 6;
            const PRICE_PRECISION_EXP = new anchor_1.BN(decimals);
            const SB_PRECISION_EXP = new anchor_1.BN(18);
            const SB_PRECISION = new anchor_1.BN(10).pow(SB_PRECISION_EXP.sub(PRICE_PRECISION_EXP));
            const price = data.result.value.div(SB_PRECISION);
            return (0, solana_1.toUINumber)(price, decimals);
        }
        catch (error) {
            console.error("Failed to fetch price:", error);
            return 0;
        }
    }
    /**
     * Cancel an order
     * @param order Order public key to cancel
     * @returns Transaction signature
     */
    async cancelOrder(order) {
        try {
            const { asset, direction, inputHolder, address } = order;
            const owner = this.getOwner();
            const [assetPubkey, assetAccount] = await this.getAsset(asset);
            // Ensure user has token accounts to get back their tokens
            const [ownerAssetAccountIx, ownerAssetAccount] = await (0, solana_1.solGetOrCreateAssociatedTokenAccountIx)(this.connection, owner, assetAccount.assetTokenMint, owner);
            const [ownerPaymentAccountIx, ownerPaymentAccount] = await (0, solana_1.solGetOrCreateAssociatedTokenAccountIx)(this.connection, owner, assetAccount.paymentTokenMint, owner);
            const refundTokenHolder = direction === "buy" ? ownerPaymentAccount : ownerAssetAccount;
            const cancelIx = await this.program.methods
                .cancelOrder()
                .accountsPartial({
                owner,
                order: new web3_js_1.PublicKey(address),
                asset: assetPubkey,
                orderInputHolder: new web3_js_1.PublicKey(inputHolder),
                refundTokenHolder: refundTokenHolder,
            })
                .instruction();
            return [...ownerAssetAccountIx, ...ownerPaymentAccountIx, cancelIx];
        }
        catch (error) {
            console.error("Error cancelling order:", error);
            throw error;
        }
    }
    async gcOrder(order) {
        try {
            const { asset, inputHolder, address, direction } = order;
            const owner = this.getOwner();
            const [assetPubkey, assetAccount] = await this.getAsset(asset);
            // Ensure user has token accounts to get back their tokens
            const [ownerAssetAccountIx, ownerAssetAccount] = await (0, solana_1.solGetOrCreateAssociatedTokenAccountIx)(this.connection, owner, assetAccount.assetTokenMint, owner);
            const [ownerPaymentAccountIx, ownerPaymentAccount] = await (0, solana_1.solGetOrCreateAssociatedTokenAccountIx)(this.connection, owner, assetAccount.paymentTokenMint, owner);
            const refundTokenHolder = direction === "buy" ? ownerPaymentAccount : ownerAssetAccount;
            const gcIx = await this.program.methods
                .gcOrder()
                .accountsPartial({
                owner,
                order: new web3_js_1.PublicKey(address),
                asset: assetPubkey,
                orderInputHolder: new web3_js_1.PublicKey(inputHolder),
                refundTokenHolder,
            })
                .instruction();
            return [...ownerAssetAccountIx, ...ownerPaymentAccountIx, gcIx];
        }
        catch (error) {
            console.error("Error gc order:", error);
            throw error;
        }
    }
    getOrderPDA(owner, count) {
        // order address is the PDA of the order
        // equivalent to count.to_le_bytes()
        const countBuffer = Buffer.alloc(8);
        countBuffer.writeUInt32LE(count);
        const [address] = web3_js_1.PublicKey.findProgramAddressSync([Buffer.from("order"), owner.toBuffer(), countBuffer], this.program.programId);
        return address;
    }
    getCounterPDA(owner) {
        const [address] = web3_js_1.PublicKey.findProgramAddressSync([Buffer.from("counter"), owner.toBuffer()], this.program.programId);
        return address;
    }
    /**
     * Clear the asset cache. Call this if you need to force a refresh of asset data.
     */
    clearAssetCache() {
        this.assetCache.clear();
    }
    async placeOrder(asset, direction, orderType, quantityFloat, limitPriceFloat, slippageBps, expireTime) {
        try {
            const owner = this.getOwner();
            const [assetPubkey, assetAccount] = await this.getAsset(asset);
            if (assetAccount.paused) {
                throw new Error("Asset is paused");
            }
            if (orderType == "limit" &&
                (isNaN(limitPriceFloat) || limitPriceFloat <= 0)) {
                throw new Error("Invalid price");
            }
            if (isNaN(quantityFloat) || quantityFloat <= 0) {
                throw new Error("Invalid quantity");
            }
            const quantityMint = direction === "buy"
                ? assetAccount.paymentTokenMint
                : assetAccount.assetTokenMint;
            const quantityMintInfo = await this.getToken(quantityMint.toBase58());
            const quantity = (0, solana_1.fromUINumber)(quantityFloat, quantityMintInfo.decimals);
            if (direction === "buy" && quantity < assetAccount.minOrderValue) {
                throw new Error(`Order value must be at least ${(0, solana_1.toUINumber)(assetAccount.minOrderValue, 6)}`);
            }
            const inputTokenMint = direction === "buy"
                ? assetAccount.paymentTokenMint
                : assetAccount.assetTokenMint;
            const outputTokenMint = direction === "buy"
                ? assetAccount.assetTokenMint
                : assetAccount.paymentTokenMint;
            // Create asset token account for owner
            const [ownerAssetAccountIx, ownerAssetAccount] = await (0, solana_1.solGetOrCreateAssociatedTokenAccountIx)(this.connection, owner, assetAccount.assetTokenMint, owner);
            const [ownerPaymentAccountIx, ownerPaymentAccount] = await (0, solana_1.solGetOrCreateAssociatedTokenAccountIx)(this.connection, owner, assetAccount.paymentTokenMint, owner);
            const userInputHolder = direction === "buy" ? ownerPaymentAccount : ownerAssetAccount;
            const params = {
                direction: direction === "buy" ? exports.DIRECTION.BUY : exports.DIRECTION.SELL,
                orderType: orderType === "limit" ? exports.ORDER_TYPE.LIMIT : exports.ORDER_TYPE.MARKET,
                limitPrice: orderType === "limit"
                    ? {
                        mantissa: (0, solana_1.fromUINumber)(limitPriceFloat, 2),
                        scale: 2,
                    }
                    : null,
                quantity,
                slippageBps: slippageBps ?? 0,
                expireTime: new anchor_1.BN(expireTime ?? Math.floor(Date.now() / 1000) + 3600 * 3), // default to 3 hour from now
            };
            const counterPK = this.getCounterPDA(owner);
            let currentCount = 0;
            try {
                const counterAccount = await this.program.account.counter.fetch(counterPK);
                currentCount = counterAccount.count.toNumber();
            }
            catch (error) {
                if (`${error}`.includes("Account does not exist")) {
                    currentCount = 0;
                }
                else {
                    throw error;
                }
            }
            const orderPDA = this.getOrderPDA(owner, currentCount);
            // Initialize counter if not exists
            let initCounterIx = [];
            if (currentCount == 0) {
                initCounterIx.push(await this.program.methods
                    .initCounter()
                    .accountsPartial({
                    owner,
                    payer: owner,
                    counter: counterPK,
                })
                    .instruction());
            }
            console.log("placeOrderParams", currentCount, (0, json_1.toJSON)(params));
            const placeOrderIx = await this.program.methods
                .placeOrder(params)
                .accountsPartial({
                owner,
                asset: assetPubkey,
                counter: counterPK,
                order: orderPDA,
                // pass in the oracle public key, to avoid fetching the assetAccount again
                priceOracle: assetAccount.priceOracle,
                inputTokenMint,
                outputTokenMint,
                userInputHolder,
            })
                .instruction();
            console.log("placeOrderIx", (0, json_1.toJSON)(placeOrderIx));
            return [
                ...ownerAssetAccountIx,
                ...ownerPaymentAccountIx,
                ...initCounterIx,
                placeOrderIx,
            ];
        }
        catch (error) {
            console.error("Error placing order:", error);
            throw error;
        }
    }
}
exports.GinkoSDK = GinkoSDK;
