"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fromUINumber = exports.toUINumber = exports.solGetOrCreateAssociatedTokenAccountIx = exports.solGetAssociatedTokenAccountAddress = exports.getTokenAccountBalance = exports.getTokenMintInfo = void 0;
const anchor_1 = require("@coral-xyz/anchor");
const spl_token_1 = require("@solana/spl-token");
const bignumber_js_1 = __importDefault(require("bignumber.js"));
bignumber_js_1.default.config({ EXPONENTIAL_AT: 30 });
async function getTokenMintInfo(connection, mint) {
    const mintInfo = await (0, spl_token_1.getMint)(connection, mint);
    return mintInfo;
}
exports.getTokenMintInfo = getTokenMintInfo;
async function getTokenAccountBalance(connection, owner, mint, decimals = 6) {
    try {
        const tokenAccount = (0, spl_token_1.getAssociatedTokenAddressSync)(mint, owner);
        const account = await (0, spl_token_1.getAccount)(connection, tokenAccount);
        return toUINumber(new anchor_1.BN(account.amount.toString()), decimals);
    }
    catch (e) {
        if (e instanceof spl_token_1.TokenAccountNotFoundError ||
            e instanceof spl_token_1.TokenInvalidAccountOwnerError) {
            return 0;
        }
        throw e;
    }
}
exports.getTokenAccountBalance = getTokenAccountBalance;
async function solGetAssociatedTokenAccountAddress(connection, mint, owner, allowOwnerOffCurve = false, commitment, programId = spl_token_1.TOKEN_PROGRAM_ID, associatedTokenProgramId = spl_token_1.ASSOCIATED_TOKEN_PROGRAM_ID) {
    const associatedToken = (0, spl_token_1.getAssociatedTokenAddressSync)(mint, owner, allowOwnerOffCurve, programId, associatedTokenProgramId);
    try {
        await (0, spl_token_1.getAccount)(connection, associatedToken, commitment, programId);
    }
    catch (error) {
        throw error;
    }
    return associatedToken;
}
exports.solGetAssociatedTokenAccountAddress = solGetAssociatedTokenAccountAddress;
async function solGetOrCreateAssociatedTokenAccountIx(connection, payerPublicKey, mint, owner, allowOwnerOffCurve = false, commitment, programId = spl_token_1.TOKEN_PROGRAM_ID, associatedTokenProgramId = spl_token_1.ASSOCIATED_TOKEN_PROGRAM_ID) {
    const associatedToken = (0, spl_token_1.getAssociatedTokenAddressSync)(mint, owner, allowOwnerOffCurve, programId, associatedTokenProgramId);
    let account;
    try {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        account = await (0, spl_token_1.getAccount)(connection, associatedToken, commitment, programId);
    }
    catch (error) {
        if (error instanceof spl_token_1.TokenAccountNotFoundError ||
            error instanceof spl_token_1.TokenInvalidAccountOwnerError) {
            const ix = (0, spl_token_1.createAssociatedTokenAccountInstruction)(payerPublicKey, associatedToken, owner, mint, programId, associatedTokenProgramId);
            return [[ix], associatedToken];
        }
        else {
            throw error;
        }
    }
    return [[], associatedToken];
}
exports.solGetOrCreateAssociatedTokenAccountIx = solGetOrCreateAssociatedTokenAccountIx;
function toUINumber(num, decimals) {
    if (!num) {
        return 0;
    }
    return new bignumber_js_1.default(num.toString()).shiftedBy(-decimals).toNumber();
}
exports.toUINumber = toUINumber;
function fromUINumber(num, decimals) {
    if (!num) {
        return new anchor_1.BN(0);
    }
    let big = new bignumber_js_1.default(num)
        .shiftedBy(decimals)
        .decimalPlaces(0, bignumber_js_1.default.ROUND_FLOOR);
    return new anchor_1.BN(big.toString());
}
exports.fromUINumber = fromUINumber;
