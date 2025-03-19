/// <reference types="bn.js" />
import { BN, Wallet } from "@coral-xyz/anchor";
import { Connection, PublicKey, TransactionInstruction } from "@solana/web3.js";
export * from "./solana";
export type OrderDirection = "buy" | "sell";
export type OrderMode = "market" | "limit";
export type Price = {
    mantissa: BN;
    scale: number;
};
export declare const DIRECTION: {
    BUY: {
        buy: {};
    };
    SELL: {
        sell: {};
    };
};
export declare const ORDER_TYPE: {
    MARKET: {
        market: {};
    };
    LIMIT: {
        limit: {};
    };
};
export type OrderParams = {
    direction: typeof DIRECTION.BUY | typeof DIRECTION.SELL;
    orderType: typeof ORDER_TYPE.LIMIT | typeof ORDER_TYPE.MARKET;
    limitPrice: Price | null;
    quantity: BN;
    slippageBps: number;
    expireTime: BN;
};
export type OrderAccount = {
    owner: PublicKey;
    bump: number;
    count: BN;
    createdAt: BN;
    asset: PublicKey;
    direction: typeof DIRECTION.BUY | typeof DIRECTION.SELL;
    orderType: typeof ORDER_TYPE.LIMIT | typeof ORDER_TYPE.MARKET;
    limitPrice?: Price;
    inputHolder: PublicKey;
    quantity: BN;
    slippageBps: number;
    expireTime: BN;
    canceledAt?: BN;
    filledQty: BN;
    filledOutputQty: BN;
    lastFillAt: BN;
};
export type FormattedOrder = {
    address: string;
    owner: string;
    asset: string;
    symbol: string;
    count: number;
    direction: OrderDirection;
    type: OrderMode;
    price: number | null;
    quantity: number;
    filledQuantity: number;
    filledOutputQuantity: number;
    slippageBps: number;
    status: "active" | "filled" | "canceled" | "expired";
    createdAt: Date;
    expireTime: Date;
    canceledAt: Date | null;
    lastFillAt: Date;
    inputHolder: string;
    isPartialFill: boolean;
    filledPrice: number | null;
};
export type AssetAccount = {
    nonce: number[];
    admin: PublicKey;
    bump: number;
    symbol: string;
    assetTokenMint: PublicKey;
    paymentTokenMint: PublicKey;
    settler: PublicKey;
    priceOracle: PublicKey;
    minOrderValue: BN;
    ceiling: BN;
    orderCancelDelay: number;
    paused: boolean;
};
export type FormattedAsset = {
    address: string;
    symbol: string;
    admin: string;
    assetTokenMint: string;
    assetTokenDecimals: number;
    paymentTokenMint: string;
    paymentTokenDecimals: number;
    settler: string;
    priceOracle: string;
    minOrderValue: number;
    ceiling: number;
    orderCancelDelay: number;
    paused: boolean;
};
export type FormattedMint = {
    address: string;
    decimals: number;
    symbol: string;
    name: string;
};
export declare class GinkoSDK {
    private program;
    private connection;
    private wallet;
    private assetCache;
    private tokensCache;
    private trackedTokens;
    private programSwitchboard;
    constructor(connection: Connection, wallet: Wallet);
    private getOwner;
    private getToken;
    private getAsset;
    private formatAsset;
    /**
     * Fetch all assets in the Ginko protocol
     * @param useCache Whether to use cached data (default: true)
     * @returns List of formatted assets with their current prices
     */
    assets(useCache?: boolean): Promise<FormattedAsset[]>;
    private formatMint;
    /**
     * Get all tracked token information
     * @returns List of formatted token information
     */
    tokens(): Promise<FormattedMint[]>;
    /**
     * Fetch all orders for a given wallet
     * @param walletAddress The wallet address to fetch orders for
     * @returns List of formatted orders
     */
    orders(walletAddress: string): Promise<FormattedOrder[]>;
    private formatOrder;
    /**
     * Get current price from the oracle for a given asset
     * @param asset The asset public key
     * @returns Current price from oracle
     */
    getPrice(assetAddress: string): Promise<number>;
    /**
     * Cancel an order
     * @param order Order public key to cancel
     * @returns Transaction signature
     */
    cancelOrder(order: FormattedOrder): Promise<TransactionInstruction[]>;
    gcOrder(order: FormattedOrder): Promise<TransactionInstruction[]>;
    private getOrderPDA;
    private getCounterPDA;
    /**
     * Clear the asset cache. Call this if you need to force a refresh of asset data.
     */
    clearAssetCache(): void;
    placeOrder(asset: string, direction: OrderDirection, orderType: OrderMode, quantityFloat: number, limitPriceFloat: number, slippageBps?: number, expireTime?: number): Promise<TransactionInstruction[]>;
}
//# sourceMappingURL=index.d.ts.map