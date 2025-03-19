"use strict";
/* eslint-disable @typescript-eslint/no-explicit-any */
Object.defineProperty(exports, "__esModule", { value: true });
exports.toJSON = exports.fromJSON = void 0;
const buffer_1 = require("buffer");
const web3_js_1 = require("@solana/web3.js");
const anchor_1 = require("@coral-xyz/anchor");
const replaceReg = /\d*$/;
// because of the typescript will add number suffix to obj.constructor.name, we need to remove it before matching
function stripNumberSuffix(key) {
    return key.replace(replaceReg, "");
}
const defaultJSONFormat = "go";
const fromJSONModifiers = {
    PublicKey: (data) => new web3_js_1.PublicKey(data),
    BN: (data) => new anchor_1.BN(data),
    Buffer: (data) => buffer_1.Buffer.from(data, "hex"),
    // u64: (data: string) => {
    //   return new u64()
    // },
};
function fromJSON(obj) {
    if (obj == null) {
        return obj;
    }
    if (Array.isArray(obj)) {
        return Array.prototype.map.call(obj, (element) => fromJSON(element));
    }
    if (typeof obj == "object") {
        const modifier = fromJSONModifiers[obj?.type];
        if (!!modifier) {
            return modifier(obj.data);
        }
        const newobj = {};
        for (const tuple of Object.entries(obj)) {
            const [k, v] = tuple;
            newobj[k] = fromJSON(v);
        }
        return newobj;
    }
    return obj;
}
exports.fromJSON = fromJSON;
const toJSONModifiers = {
    js: {
        PublicKey: (instance) => ({
            type: "PublicKey",
            data: instance.toBase58(),
        }),
        CachedPublicKey: (instance) => ({
            type: "PublicKey",
            data: instance.toBase58(),
        }),
        BN: (instance) => ({
            type: "BN",
            data: instance.toString(),
        }),
        Buffer: (instance) => ({
            type: "Buffer",
            data: instance.toString("hex"),
        }),
        u64: (instance) => ({
            type: "u64",
            data: instance.toString(),
        }),
    },
    go: {
        PublicKey: (instance) => instance.toBase58(),
        CachedPublicKey: (instance) => instance.toBase58(),
        BN: (instance) => instance.toString(),
        Buffer: (instance) => instance.toString("hex"),
        u64: (instance) => instance.toString(),
    },
};
function toJSONObj(obj, format = defaultJSONFormat) {
    if (obj == null || obj == undefined) {
        return obj;
    }
    if (Array.isArray(obj)) {
        return Array.prototype.map.call(obj, (element) => toJSONObj(element, format));
    }
    if (typeof obj == "object") {
        const modifier = toJSONModifiers[format][stripNumberSuffix(obj.constructor.name)];
        if (!!modifier) {
            return modifier(obj);
        }
        const newobj = {};
        for (const tuple of Object.entries(obj)) {
            const [k, v] = tuple;
            newobj[k] = toJSONObj(v, format);
        }
        return newobj;
    }
    return obj;
}
function toJSON(obj, format) {
    return JSON.stringify(toJSONObj(obj, format), null, 2);
}
exports.toJSON = toJSON;
