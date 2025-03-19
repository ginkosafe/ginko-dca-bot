"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.solConnectionFromEnv = void 0;
const web3_js_1 = require("@solana/web3.js");
function connection(url, commitment = "confirmed") {
    return new web3_js_1.Connection(url, {
        commitment: commitment,
        disableRetryOnRateLimit: false,
    });
}
function solConnectionFromEnv() {
    const ANCHOR_PROVIDER_URL = process.env.ANCHOR_PROVIDER_URL;
    const ANCHOR_COMMITMENT = process.env.ANCHOR_COMMITMENT;
    if (!ANCHOR_PROVIDER_URL) {
        throw new Error("connection url is not provided");
    }
    return connection(ANCHOR_PROVIDER_URL, ANCHOR_COMMITMENT);
}
exports.solConnectionFromEnv = solConnectionFromEnv;
