"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSwitchboardOraclePriceDataFromBuffer = void 0;
const anchor_1 = require("@coral-xyz/anchor");
const PRICE_PRECISION_EXP = new anchor_1.BN(2);
const SB_PRECISION_EXP = new anchor_1.BN(18);
const SB_PRECISION = new anchor_1.BN(10).pow(SB_PRECISION_EXP.sub(PRICE_PRECISION_EXP));
function getSwitchboardOraclePriceDataFromBuffer(program, buffer) {
    const pullFeedAccountData = program.coder.accounts.decodeUnchecked("pullFeedAccountData", buffer);
    return {
        price: pullFeedAccountData.result.value.div(SB_PRECISION),
        slot: pullFeedAccountData.result.slot,
        confidence: pullFeedAccountData.result.range.div(SB_PRECISION),
        hasSufficientNumberOfDataPoints: true,
    };
}
exports.getSwitchboardOraclePriceDataFromBuffer = getSwitchboardOraclePriceDataFromBuffer;
