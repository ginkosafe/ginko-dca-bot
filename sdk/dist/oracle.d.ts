/// <reference types="bn.js" />
/// <reference types="node" />
/// <reference types="node" />
import { BN, Program } from "@coral-xyz/anchor";
export type OraclePriceData = {
    price: BN;
    slot: BN;
    confidence: BN;
    hasSufficientNumberOfDataPoints: boolean;
    twap?: BN;
    twapConfidence?: BN;
    maxPrice?: BN;
};
export declare function getSwitchboardOraclePriceDataFromBuffer(program: Program, buffer: Buffer): OraclePriceData;
//# sourceMappingURL=oracle.d.ts.map