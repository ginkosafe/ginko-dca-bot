"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.u64 = void 0;
const anchor_1 = require("@coral-xyz/anchor");
const assert_1 = __importDefault(require("assert"));
class u64 extends anchor_1.BN {
    toBuffer() {
        const a = super.toArray().reverse();
        const b = Buffer.from(a);
        if (b.length === 8) {
            return b;
        }
        (0, assert_1.default)(b.length < 8, "u64 too large");
        const zeroPad = Buffer.alloc(8);
        b.copy(zeroPad);
        return zeroPad;
    }
}
exports.u64 = u64;
