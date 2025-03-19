"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SWITCHBOARD_IDL = exports.GINKO_IDL = void 0;
exports.GINKO_IDL = {
    address: "GinKo7e13rZF9PmvNnejkexYE37kggTcdpkFMTyNVjke",
    metadata: {
        name: "ginko_protocol",
        version: "0.1.0",
        spec: "0.1.0",
        description: "Created with Anchor",
    },
    instructions: [
        {
            name: "cancel_order",
            discriminator: [95, 129, 237, 240, 8, 49, 223, 132],
            accounts: [
                {
                    name: "owner",
                    signer: true,
                    relations: ["order"],
                },
                {
                    name: "order",
                    writable: true,
                },
                {
                    name: "asset",
                    relations: ["order"],
                },
                {
                    name: "order_input_holder",
                    writable: true,
                },
                {
                    name: "refund_token_holder",
                    writable: true,
                },
                {
                    name: "token_program",
                    address: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
                },
            ],
            args: [],
        },
        {
            name: "fill_order",
            discriminator: [232, 122, 115, 25, 199, 143, 136, 162],
            accounts: [
                {
                    name: "settler",
                    signer: true,
                    relations: ["asset"],
                },
                {
                    name: "asset",
                    relations: ["order"],
                },
                {
                    name: "order",
                    writable: true,
                },
                {
                    name: "price_oracle",
                    relations: ["asset"],
                },
                {
                    name: "input_holder",
                    writable: true,
                    relations: ["order"],
                },
                {
                    name: "asset_payment_token_holder",
                    writable: true,
                },
                {
                    name: "asset_token_mint",
                    writable: true,
                },
                {
                    name: "payment_token_mint",
                },
                {
                    name: "user_output_token_holder",
                    writable: true,
                },
                {
                    name: "token_program",
                    address: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
                },
            ],
            args: [
                {
                    name: "fill_qty",
                    type: "u64",
                },
                {
                    name: "price",
                    type: {
                        defined: {
                            name: "Price",
                        },
                    },
                },
            ],
        },
        {
            name: "gc_order",
            discriminator: [34, 128, 255, 186, 133, 111, 11, 231],
            accounts: [
                {
                    name: "executor",
                    writable: true,
                    signer: true,
                },
                {
                    name: "owner",
                    docs: ["CHECK ."],
                    writable: true,
                },
                {
                    name: "order",
                    writable: true,
                },
                {
                    name: "asset",
                    relations: ["order"],
                },
                {
                    name: "order_input_holder",
                    writable: true,
                },
                {
                    name: "refund_token_holder",
                    writable: true,
                },
                {
                    name: "token_program",
                    address: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
                },
            ],
            args: [],
        },
        {
            name: "init_counter",
            discriminator: [247, 168, 146, 45, 125, 26, 142, 80],
            accounts: [
                {
                    name: "payer",
                    writable: true,
                    signer: true,
                },
                {
                    name: "owner",
                },
                {
                    name: "counter",
                    writable: true,
                    pda: {
                        seeds: [
                            {
                                kind: "const",
                                value: [99, 111, 117, 110, 116, 101, 114],
                            },
                            {
                                kind: "account",
                                path: "owner",
                            },
                        ],
                    },
                },
                {
                    name: "system_program",
                    address: "11111111111111111111111111111111",
                },
                {
                    name: "rent",
                    address: "SysvarRent111111111111111111111111111111111",
                },
            ],
            args: [],
        },
        {
            name: "initialize_asset",
            discriminator: [214, 153, 49, 248, 95, 248, 208, 179],
            accounts: [
                {
                    name: "admin",
                    writable: true,
                    signer: true,
                },
                {
                    name: "asset",
                    writable: true,
                },
                {
                    name: "asset_token_mint",
                    writable: true,
                    pda: {
                        seeds: [
                            {
                                kind: "const",
                                value: [
                                    97, 115, 115, 101, 116, 95, 116, 111, 107, 101, 110, 95, 109,
                                    105, 110, 116,
                                ],
                            },
                            {
                                kind: "account",
                                path: "asset",
                            },
                        ],
                    },
                },
                {
                    name: "payment_token_mint",
                },
                {
                    name: "payment_token_holder",
                    writable: true,
                    pda: {
                        seeds: [
                            {
                                kind: "account",
                                path: "asset",
                            },
                            {
                                kind: "const",
                                value: [
                                    6, 221, 246, 225, 215, 101, 161, 147, 217, 203, 225, 70, 206,
                                    235, 121, 172, 28, 180, 133, 237, 95, 91, 55, 145, 58, 140,
                                    245, 133, 126, 255, 0, 169,
                                ],
                            },
                            {
                                kind: "account",
                                path: "payment_token_mint",
                            },
                        ],
                        program: {
                            kind: "const",
                            value: [
                                140, 151, 37, 143, 78, 36, 137, 241, 187, 61, 16, 41, 20, 142,
                                13, 131, 11, 90, 19, 153, 218, 255, 16, 132, 4, 142, 123, 216,
                                219, 233, 248, 89,
                            ],
                        },
                    },
                },
                {
                    name: "token_program",
                    address: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
                },
                {
                    name: "associated_token_program",
                    address: "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL",
                },
                {
                    name: "system_program",
                    address: "11111111111111111111111111111111",
                },
                {
                    name: "rent",
                    address: "SysvarRent111111111111111111111111111111111",
                },
            ],
            args: [
                {
                    name: "params",
                    type: {
                        defined: {
                            name: "AssetParams",
                        },
                    },
                },
            ],
        },
        {
            name: "place_order",
            discriminator: [51, 194, 155, 175, 109, 130, 96, 106],
            accounts: [
                {
                    name: "owner",
                    writable: true,
                    signer: true,
                    relations: ["counter"],
                },
                {
                    name: "asset",
                },
                {
                    name: "counter",
                    writable: true,
                },
                {
                    name: "order",
                    writable: true,
                    pda: {
                        seeds: [
                            {
                                kind: "const",
                                value: [111, 114, 100, 101, 114],
                            },
                            {
                                kind: "account",
                                path: "owner",
                            },
                            {
                                kind: "account",
                                path: "counter.count",
                                account: "Counter",
                            },
                        ],
                    },
                },
                {
                    name: "price_oracle",
                    relations: ["asset"],
                },
                {
                    name: "input_token_mint",
                },
                {
                    name: "output_token_mint",
                },
                {
                    name: "order_input_holder",
                    writable: true,
                    pda: {
                        seeds: [
                            {
                                kind: "account",
                                path: "order",
                            },
                            {
                                kind: "const",
                                value: [
                                    6, 221, 246, 225, 215, 101, 161, 147, 217, 203, 225, 70, 206,
                                    235, 121, 172, 28, 180, 133, 237, 95, 91, 55, 145, 58, 140,
                                    245, 133, 126, 255, 0, 169,
                                ],
                            },
                            {
                                kind: "account",
                                path: "input_token_mint",
                            },
                        ],
                        program: {
                            kind: "const",
                            value: [
                                140, 151, 37, 143, 78, 36, 137, 241, 187, 61, 16, 41, 20, 142,
                                13, 131, 11, 90, 19, 153, 218, 255, 16, 132, 4, 142, 123, 216,
                                219, 233, 248, 89,
                            ],
                        },
                    },
                },
                {
                    name: "user_input_holder",
                    writable: true,
                },
                {
                    name: "token_program",
                    address: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
                },
                {
                    name: "associated_token_program",
                    address: "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL",
                },
                {
                    name: "system_program",
                    address: "11111111111111111111111111111111",
                },
                {
                    name: "rent",
                    address: "SysvarRent111111111111111111111111111111111",
                },
            ],
            args: [
                {
                    name: "params",
                    type: {
                        defined: {
                            name: "OrderParams",
                        },
                    },
                },
            ],
        },
        {
            name: "transfer_fund",
            discriminator: [104, 35, 18, 77, 186, 252, 139, 236],
            accounts: [
                {
                    name: "admin",
                    signer: true,
                    relations: ["asset"],
                },
                {
                    name: "asset",
                },
                {
                    name: "payment_token_holder",
                    writable: true,
                },
                {
                    name: "receiver",
                    writable: true,
                },
                {
                    name: "token_program",
                    address: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
                },
            ],
            args: [
                {
                    name: "amount",
                    type: "u64",
                },
            ],
        },
        {
            name: "update_asset",
            discriminator: [56, 126, 238, 138, 192, 118, 228, 172],
            accounts: [
                {
                    name: "admin",
                    signer: true,
                    relations: ["asset"],
                },
                {
                    name: "asset",
                    writable: true,
                },
            ],
            args: [
                {
                    name: "params",
                    type: {
                        defined: {
                            name: "AssetUpdateParams",
                        },
                    },
                },
            ],
        },
    ],
    accounts: [
        {
            name: "Asset",
            discriminator: [234, 180, 241, 252, 139, 224, 160, 8],
        },
        {
            name: "Counter",
            discriminator: [255, 176, 4, 245, 188, 253, 124, 25],
        },
        {
            name: "Order",
            discriminator: [134, 173, 223, 185, 77, 86, 28, 51],
        },
    ],
    errors: [
        {
            code: 6000,
            name: "InvalidParams",
            msg: "Invalid params",
        },
        {
            code: 6001,
            name: "InvalidExpiration",
            msg: "Invalid expiration",
        },
        {
            code: 6002,
            name: "InvalidPrice",
            msg: "Invalid price",
        },
        {
            code: 6003,
            name: "OrderExpired",
            msg: "Order expired",
        },
        {
            code: 6004,
            name: "ExceedsCeiling",
            msg: "Exceeds ceiling",
        },
        {
            code: 6005,
            name: "InvalidSlippage",
            msg: "Invalid slippage",
        },
        {
            code: 6006,
            name: "Unauthorized",
            msg: "Unauthorized",
        },
        {
            code: 6007,
            name: "ProgramPaused",
            msg: "Program paused",
        },
        {
            code: 6008,
            name: "InvalidOrderSize",
            msg: "Invalid order size",
        },
        {
            code: 6009,
            name: "OrderAlreadyCanceled",
            msg: "Order already canceled",
        },
        {
            code: 6010,
            name: "OrderAlreadyFilled",
            msg: "Order already filled",
        },
        {
            code: 6011,
            name: "OrderNotReadyForGC",
            msg: "Order not ready for GC",
        },
        {
            code: 6012,
            name: "UnsupportedPriceFeed",
            msg: "Unsupported price feed",
        },
        {
            code: 6013,
            name: "MathOverflow",
            msg: "Math overflow",
        },
        {
            code: 6014,
            name: "PriceTooLarge",
            msg: "Price too large",
        },
    ],
    types: [
        {
            name: "Asset",
            type: {
                kind: "struct",
                fields: [
                    {
                        name: "nonce",
                        type: {
                            array: ["u8", 32],
                        },
                    },
                    {
                        name: "admin",
                        type: "pubkey",
                    },
                    {
                        name: "bump",
                        type: "u8",
                    },
                    {
                        name: "symbol",
                        type: "string",
                    },
                    {
                        name: "asset_token_mint",
                        type: "pubkey",
                    },
                    {
                        name: "payment_token_mint",
                        type: "pubkey",
                    },
                    {
                        name: "settler",
                        type: "pubkey",
                    },
                    {
                        name: "price_oracle",
                        type: "pubkey",
                    },
                    {
                        name: "min_order_value",
                        type: "u64",
                    },
                    {
                        name: "ceiling",
                        type: "u64",
                    },
                    {
                        name: "order_cancel_delay",
                        type: "u32",
                    },
                    {
                        name: "paused",
                        type: "bool",
                    },
                ],
            },
        },
        {
            name: "AssetParams",
            type: {
                kind: "struct",
                fields: [
                    {
                        name: "nonce",
                        type: {
                            array: ["u8", 32],
                        },
                    },
                    {
                        name: "symbol",
                        type: "string",
                    },
                    {
                        name: "asset_token_decimals",
                        type: "u8",
                    },
                    {
                        name: "settler",
                        type: "pubkey",
                    },
                    {
                        name: "price_oracle",
                        type: "pubkey",
                    },
                    {
                        name: "min_order_value",
                        type: "u64",
                    },
                    {
                        name: "ceiling",
                        type: "u64",
                    },
                    {
                        name: "order_cancel_delay",
                        type: "u32",
                    },
                ],
            },
        },
        {
            name: "AssetUpdateParams",
            type: {
                kind: "struct",
                fields: [
                    {
                        name: "settler",
                        type: {
                            option: "pubkey",
                        },
                    },
                    {
                        name: "price_oracle",
                        type: {
                            option: "pubkey",
                        },
                    },
                    {
                        name: "min_order_value",
                        type: {
                            option: "u64",
                        },
                    },
                    {
                        name: "ceiling",
                        type: {
                            option: "u64",
                        },
                    },
                    {
                        name: "order_cancel_delay",
                        type: {
                            option: "u32",
                        },
                    },
                    {
                        name: "paused",
                        type: {
                            option: "bool",
                        },
                    },
                ],
            },
        },
        {
            name: "Counter",
            docs: [
                "Counter is used to track user order count, the count is used to generate order address, this ensure order address always unique",
            ],
            type: {
                kind: "struct",
                fields: [
                    {
                        name: "owner",
                        type: "pubkey",
                    },
                    {
                        name: "count",
                        type: "u64",
                    },
                ],
            },
        },
        {
            name: "Order",
            type: {
                kind: "struct",
                fields: [
                    {
                        name: "owner",
                        type: "pubkey",
                    },
                    {
                        name: "count",
                        type: "u64",
                    },
                    {
                        name: "bump",
                        type: "u8",
                    },
                    {
                        name: "created_at",
                        type: "i64",
                    },
                    {
                        name: "asset",
                        type: "pubkey",
                    },
                    {
                        name: "direction",
                        type: {
                            defined: {
                                name: "OrderDirection",
                            },
                        },
                    },
                    {
                        name: "order_type",
                        type: {
                            defined: {
                                name: "OrderType",
                            },
                        },
                    },
                    {
                        name: "limit_price",
                        type: {
                            option: {
                                defined: {
                                    name: "Price",
                                },
                            },
                        },
                    },
                    {
                        name: "input_holder",
                        type: "pubkey",
                    },
                    {
                        name: "quantity",
                        type: "u64",
                    },
                    {
                        name: "slippage_bps",
                        type: "u16",
                    },
                    {
                        name: "expire_time",
                        type: "i64",
                    },
                    {
                        name: "canceled_at",
                        type: {
                            option: "i64",
                        },
                    },
                    {
                        name: "filled_qty",
                        type: "u64",
                    },
                    {
                        name: "filled_output_qty",
                        type: "u64",
                    },
                    {
                        name: "last_fill_at",
                        type: "u64",
                    },
                ],
            },
        },
        {
            name: "OrderDirection",
            type: {
                kind: "enum",
                variants: [
                    {
                        name: "Buy",
                    },
                    {
                        name: "Sell",
                    },
                ],
            },
        },
        {
            name: "OrderParams",
            type: {
                kind: "struct",
                fields: [
                    {
                        name: "direction",
                        type: {
                            defined: {
                                name: "OrderDirection",
                            },
                        },
                    },
                    {
                        name: "order_type",
                        type: {
                            defined: {
                                name: "OrderType",
                            },
                        },
                    },
                    {
                        name: "limit_price",
                        type: {
                            option: {
                                defined: {
                                    name: "Price",
                                },
                            },
                        },
                    },
                    {
                        name: "quantity",
                        type: "u64",
                    },
                    {
                        name: "slippage_bps",
                        type: "u16",
                    },
                    {
                        name: "expire_time",
                        type: "i64",
                    },
                ],
            },
        },
        {
            name: "OrderType",
            type: {
                kind: "enum",
                variants: [
                    {
                        name: "Market",
                    },
                    {
                        name: "Limit",
                    },
                ],
            },
        },
        {
            name: "Price",
            type: {
                kind: "struct",
                fields: [
                    {
                        name: "mantissa",
                        type: "u64",
                    },
                    {
                        name: "scale",
                        type: "u8",
                    },
                ],
            },
        },
    ],
};
exports.SWITCHBOARD_IDL = {
    address: "SBondMDrcV3K4kxZR1HNVT7osZxAHVHgYXL5Ze1oMUv",
    metadata: {
        name: "sb_on_demand",
        version: "0.1.0",
        spec: "0.1.0",
        description: "Created with Anchor",
    },
    instructions: [
        {
            name: "guardian_quote_verify",
            discriminator: [168, 36, 93, 156, 157, 150, 148, 45],
            accounts: [
                {
                    name: "guardian",
                    writable: true,
                },
                {
                    name: "oracle",
                    writable: true,
                },
                {
                    name: "authority",
                    signer: true,
                    relations: ["oracle"],
                },
                {
                    name: "guardian_queue",
                    writable: true,
                    relations: ["state"],
                },
                {
                    name: "state",
                },
                {
                    name: "recent_slothashes",
                    address: "SysvarS1otHashes111111111111111111111111111",
                },
            ],
            args: [
                {
                    name: "params",
                    type: {
                        defined: {
                            name: "GuardianQuoteVerifyParams",
                        },
                    },
                },
            ],
        },
        {
            name: "guardian_register",
            discriminator: [159, 76, 53, 117, 219, 29, 116, 135],
            accounts: [
                {
                    name: "oracle",
                    writable: true,
                },
                {
                    name: "state",
                },
                {
                    name: "guardian_queue",
                    relations: ["state"],
                },
                {
                    name: "authority",
                    signer: true,
                    relations: ["state"],
                },
            ],
            args: [
                {
                    name: "params",
                    type: {
                        defined: {
                            name: "GuardianRegisterParams",
                        },
                    },
                },
            ],
        },
        {
            name: "guardian_unregister",
            discriminator: [215, 19, 61, 120, 155, 224, 120, 60],
            accounts: [
                {
                    name: "oracle",
                    writable: true,
                },
                {
                    name: "state",
                },
                {
                    name: "guardian_queue",
                    writable: true,
                    relations: ["state"],
                },
                {
                    name: "authority",
                    signer: true,
                    relations: ["state"],
                },
            ],
            args: [
                {
                    name: "params",
                    type: {
                        defined: {
                            name: "GuardianUnregisterParams",
                        },
                    },
                },
            ],
        },
        {
            name: "oracle_heartbeat",
            discriminator: [10, 175, 217, 130, 111, 35, 117, 54],
            accounts: [
                {
                    name: "oracle",
                    writable: true,
                },
                {
                    name: "oracle_stats",
                    writable: true,
                    pda: {
                        seeds: [
                            {
                                kind: "const",
                                value: [79, 114, 97, 99, 108, 101, 83, 116, 97, 116, 115],
                            },
                            {
                                kind: "account",
                                path: "oracle",
                            },
                        ],
                    },
                },
                {
                    name: "oracle_signer",
                    signer: true,
                },
                {
                    name: "queue",
                    writable: true,
                    relations: ["oracle", "gc_node"],
                },
                {
                    name: "gc_node",
                    writable: true,
                },
                {
                    name: "program_state",
                    writable: true,
                },
                {
                    name: "payer",
                    writable: true,
                    signer: true,
                },
                {
                    name: "system_program",
                    address: "11111111111111111111111111111111",
                },
                {
                    name: "token_program",
                    address: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
                },
                {
                    name: "native_mint",
                    address: "So11111111111111111111111111111111111111112",
                },
                {
                    name: "queue_escrow",
                    writable: true,
                },
                {
                    name: "stake_program",
                    address: "SBSTk6t52R89MmCdD739Rdd97HdbTQUFHe41vCX7pTt",
                    relations: ["program_state"],
                },
                {
                    name: "delegation_pool",
                    writable: true,
                },
                {
                    name: "delegation_group",
                    writable: true,
                },
            ],
            args: [
                {
                    name: "params",
                    type: {
                        defined: {
                            name: "OracleHeartbeatParams",
                        },
                    },
                },
            ],
        },
        {
            name: "oracle_init",
            discriminator: [21, 158, 66, 65, 60, 221, 148, 61],
            accounts: [
                {
                    name: "oracle",
                    writable: true,
                    signer: true,
                },
                {
                    name: "oracle_stats",
                    writable: true,
                    pda: {
                        seeds: [
                            {
                                kind: "const",
                                value: [79, 114, 97, 99, 108, 101, 83, 116, 97, 116, 115],
                            },
                            {
                                kind: "account",
                                path: "oracle",
                            },
                        ],
                    },
                },
                {
                    name: "program_state",
                    writable: true,
                },
                {
                    name: "payer",
                    writable: true,
                    signer: true,
                },
                {
                    name: "system_program",
                    address: "11111111111111111111111111111111",
                },
                {
                    name: "token_program",
                    address: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
                },
                {
                    name: "lut_signer",
                },
                {
                    name: "lut",
                    writable: true,
                },
                {
                    name: "address_lookup_table_program",
                    address: "AddressLookupTab1e1111111111111111111111111",
                },
                {
                    name: "stake_program",
                    relations: ["program_state"],
                },
                {
                    name: "stake_pool",
                    relations: ["program_state"],
                },
            ],
            args: [
                {
                    name: "params",
                    type: {
                        defined: {
                            name: "OracleInitParams",
                        },
                    },
                },
            ],
        },
        {
            name: "oracle_set_configs",
            discriminator: [129, 111, 223, 4, 191, 188, 70, 180],
            accounts: [
                {
                    name: "oracle",
                },
                {
                    name: "authority",
                    signer: true,
                    relations: ["oracle"],
                },
            ],
            args: [
                {
                    name: "params",
                    type: {
                        defined: {
                            name: "OracleSetConfigsParams",
                        },
                    },
                },
            ],
        },
        {
            name: "oracle_update_delegation",
            discriminator: [46, 198, 113, 223, 160, 189, 118, 90],
            accounts: [
                {
                    name: "oracle",
                    writable: true,
                },
                {
                    name: "oracle_stats",
                    pda: {
                        seeds: [
                            {
                                kind: "const",
                                value: [79, 114, 97, 99, 108, 101, 83, 116, 97, 116, 115],
                            },
                            {
                                kind: "account",
                                path: "oracle",
                            },
                        ],
                    },
                },
                {
                    name: "queue",
                    relations: ["oracle"],
                },
                {
                    name: "authority",
                    signer: true,
                },
                {
                    name: "program_state",
                    writable: true,
                },
                {
                    name: "payer",
                    writable: true,
                    signer: true,
                },
                {
                    name: "system_program",
                    address: "11111111111111111111111111111111",
                },
                {
                    name: "token_program",
                    address: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
                },
                {
                    name: "delegation_pool",
                    writable: true,
                },
                {
                    name: "lut_signer",
                },
                {
                    name: "lut",
                    writable: true,
                },
                {
                    name: "address_lookup_table_program",
                    address: "AddressLookupTab1e1111111111111111111111111",
                },
                {
                    name: "switch_mint",
                },
                {
                    name: "native_mint",
                    address: "So11111111111111111111111111111111111111112",
                },
                {
                    name: "wsol_vault",
                    writable: true,
                },
                {
                    name: "switch_vault",
                    writable: true,
                },
                {
                    name: "stake_program",
                    relations: ["program_state"],
                },
                {
                    name: "stake_pool",
                },
                {
                    name: "delegation_group",
                },
            ],
            args: [
                {
                    name: "params",
                    type: {
                        defined: {
                            name: "OracleUpdateDelegationParams",
                        },
                    },
                },
            ],
        },
        {
            name: "permission_set",
            discriminator: [211, 122, 185, 120, 129, 182, 55, 103],
            accounts: [
                {
                    name: "authority",
                    signer: true,
                },
                {
                    name: "granter",
                },
            ],
            args: [
                {
                    name: "params",
                    type: {
                        defined: {
                            name: "PermissionSetParams",
                        },
                    },
                },
            ],
        },
        {
            name: "pull_feed_close",
            discriminator: [19, 134, 50, 142, 177, 215, 196, 83],
            accounts: [
                {
                    name: "pull_feed",
                    writable: true,
                },
                {
                    name: "reward_escrow",
                    writable: true,
                },
                {
                    name: "lut",
                    writable: true,
                },
                {
                    name: "lut_signer",
                },
                {
                    name: "payer",
                    writable: true,
                    signer: true,
                },
                {
                    name: "state",
                },
                {
                    name: "authority",
                    writable: true,
                    signer: true,
                    relations: ["pull_feed"],
                },
                {
                    name: "token_program",
                    address: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
                },
                {
                    name: "associated_token_program",
                    address: "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL",
                },
                {
                    name: "system_program",
                    address: "11111111111111111111111111111111",
                },
                {
                    name: "address_lookup_table_program",
                    address: "AddressLookupTab1e1111111111111111111111111",
                },
            ],
            args: [
                {
                    name: "params",
                    type: {
                        defined: {
                            name: "PullFeedCloseParams",
                        },
                    },
                },
            ],
        },
        {
            name: "pull_feed_init",
            discriminator: [198, 130, 53, 198, 235, 61, 143, 40],
            accounts: [
                {
                    name: "pull_feed",
                    writable: true,
                    signer: true,
                },
                {
                    name: "queue",
                },
                {
                    name: "authority",
                },
                {
                    name: "payer",
                    writable: true,
                    signer: true,
                },
                {
                    name: "system_program",
                    address: "11111111111111111111111111111111",
                },
                {
                    name: "program_state",
                },
                {
                    name: "reward_escrow",
                    writable: true,
                    pda: {
                        seeds: [
                            {
                                kind: "account",
                                path: "pull_feed",
                            },
                            {
                                kind: "const",
                                value: [
                                    6, 221, 246, 225, 215, 101, 161, 147, 217, 203, 225, 70, 206,
                                    235, 121, 172, 28, 180, 133, 237, 95, 91, 55, 145, 58, 140,
                                    245, 133, 126, 255, 0, 169,
                                ],
                            },
                            {
                                kind: "account",
                                path: "wrapped_sol_mint",
                            },
                        ],
                        program: {
                            kind: "const",
                            value: [
                                140, 151, 37, 143, 78, 36, 137, 241, 187, 61, 16, 41, 20, 142,
                                13, 131, 11, 90, 19, 153, 218, 255, 16, 132, 4, 142, 123, 216,
                                219, 233, 248, 89,
                            ],
                        },
                    },
                },
                {
                    name: "token_program",
                    address: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
                },
                {
                    name: "associated_token_program",
                    address: "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL",
                },
                {
                    name: "wrapped_sol_mint",
                    address: "So11111111111111111111111111111111111111112",
                },
                {
                    name: "lut_signer",
                },
                {
                    name: "lut",
                    writable: true,
                },
                {
                    name: "address_lookup_table_program",
                    address: "AddressLookupTab1e1111111111111111111111111",
                },
            ],
            args: [
                {
                    name: "params",
                    type: {
                        defined: {
                            name: "PullFeedInitParams",
                        },
                    },
                },
            ],
        },
        {
            name: "pull_feed_set_configs",
            discriminator: [217, 45, 11, 246, 64, 26, 82, 168],
            accounts: [
                {
                    name: "pull_feed",
                    writable: true,
                },
                {
                    name: "authority",
                    signer: true,
                    relations: ["pull_feed"],
                },
            ],
            args: [
                {
                    name: "params",
                    type: {
                        defined: {
                            name: "PullFeedSetConfigsParams",
                        },
                    },
                },
            ],
        },
        {
            name: "pull_feed_submit_response",
            discriminator: [150, 22, 215, 166, 143, 93, 48, 137],
            accounts: [
                {
                    name: "feed",
                    writable: true,
                },
                {
                    name: "queue",
                    relations: ["feed"],
                },
                {
                    name: "program_state",
                },
                {
                    name: "recent_slothashes",
                    address: "SysvarS1otHashes111111111111111111111111111",
                },
                {
                    name: "payer",
                    writable: true,
                    signer: true,
                },
                {
                    name: "system_program",
                    address: "11111111111111111111111111111111",
                },
                {
                    name: "reward_vault",
                    writable: true,
                },
                {
                    name: "token_program",
                    address: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
                },
                {
                    name: "token_mint",
                    address: "So11111111111111111111111111111111111111112",
                },
            ],
            args: [
                {
                    name: "params",
                    type: {
                        defined: {
                            name: "PullFeedSubmitResponseParams",
                        },
                    },
                },
            ],
        },
        {
            name: "pull_feed_submit_response_many",
            discriminator: [47, 156, 45, 25, 200, 71, 37, 215],
            accounts: [
                {
                    name: "queue",
                },
                {
                    name: "program_state",
                },
                {
                    name: "recent_slothashes",
                    address: "SysvarS1otHashes111111111111111111111111111",
                },
                {
                    name: "payer",
                    writable: true,
                    signer: true,
                },
                {
                    name: "system_program",
                    address: "11111111111111111111111111111111",
                },
                {
                    name: "reward_vault",
                    writable: true,
                },
                {
                    name: "token_program",
                    address: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
                },
                {
                    name: "token_mint",
                    address: "So11111111111111111111111111111111111111112",
                },
            ],
            args: [
                {
                    name: "params",
                    type: {
                        defined: {
                            name: "PullFeedSubmitResponseManyParams",
                        },
                    },
                },
            ],
        },
        {
            name: "queue_add_mr_enclave",
            discriminator: [199, 255, 81, 50, 60, 133, 171, 138],
            accounts: [
                {
                    name: "queue",
                    writable: true,
                },
                {
                    name: "authority",
                    signer: true,
                },
                {
                    name: "program_authority",
                },
                {
                    name: "state",
                },
            ],
            args: [
                {
                    name: "params",
                    type: {
                        defined: {
                            name: "QueueAddMrEnclaveParams",
                        },
                    },
                },
            ],
        },
        {
            name: "queue_allow_subsidies",
            discriminator: [94, 203, 82, 157, 188, 138, 202, 108],
            accounts: [
                {
                    name: "queue",
                    writable: true,
                },
                {
                    name: "authority",
                    signer: true,
                    relations: ["state"],
                },
                {
                    name: "state",
                    writable: true,
                },
            ],
            args: [
                {
                    name: "params",
                    type: {
                        defined: {
                            name: "QueueAllowSubsidiesParams",
                        },
                    },
                },
            ],
        },
        {
            name: "queue_garbage_collect",
            discriminator: [187, 208, 104, 247, 16, 91, 96, 98],
            accounts: [
                {
                    name: "queue",
                    writable: true,
                },
                {
                    name: "oracle",
                    writable: true,
                },
                {
                    name: "authority",
                    signer: true,
                },
                {
                    name: "state",
                },
            ],
            args: [
                {
                    name: "params",
                    type: {
                        defined: {
                            name: "QueueGarbageCollectParams",
                        },
                    },
                },
            ],
        },
        {
            name: "queue_init",
            discriminator: [144, 18, 99, 145, 133, 27, 207, 13],
            accounts: [
                {
                    name: "queue",
                    writable: true,
                    signer: true,
                },
                {
                    name: "queue_escrow",
                    writable: true,
                    pda: {
                        seeds: [
                            {
                                kind: "account",
                                path: "queue",
                            },
                            {
                                kind: "const",
                                value: [
                                    6, 221, 246, 225, 215, 101, 161, 147, 217, 203, 225, 70, 206,
                                    235, 121, 172, 28, 180, 133, 237, 95, 91, 55, 145, 58, 140,
                                    245, 133, 126, 255, 0, 169,
                                ],
                            },
                            {
                                kind: "account",
                                path: "native_mint",
                            },
                        ],
                        program: {
                            kind: "const",
                            value: [
                                140, 151, 37, 143, 78, 36, 137, 241, 187, 61, 16, 41, 20, 142,
                                13, 131, 11, 90, 19, 153, 218, 255, 16, 132, 4, 142, 123, 216,
                                219, 233, 248, 89,
                            ],
                        },
                    },
                },
                {
                    name: "authority",
                },
                {
                    name: "payer",
                    writable: true,
                    signer: true,
                },
                {
                    name: "system_program",
                    address: "11111111111111111111111111111111",
                },
                {
                    name: "token_program",
                    address: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
                },
                {
                    name: "native_mint",
                    address: "So11111111111111111111111111111111111111112",
                },
                {
                    name: "program_state",
                },
                {
                    name: "lut_signer",
                    writable: true,
                },
                {
                    name: "lut",
                    writable: true,
                },
                {
                    name: "address_lookup_table_program",
                    address: "AddressLookupTab1e1111111111111111111111111",
                },
                {
                    name: "associated_token_program",
                    address: "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL",
                },
            ],
            args: [
                {
                    name: "params",
                    type: {
                        defined: {
                            name: "QueueInitParams",
                        },
                    },
                },
            ],
        },
        {
            name: "queue_init_delegation_group",
            discriminator: [239, 146, 75, 158, 20, 166, 159, 14],
            accounts: [
                {
                    name: "queue",
                    writable: true,
                },
                {
                    name: "payer",
                    writable: true,
                    signer: true,
                },
                {
                    name: "system_program",
                    address: "11111111111111111111111111111111",
                },
                {
                    name: "program_state",
                },
                {
                    name: "lut_signer",
                },
                {
                    name: "lut",
                    writable: true,
                },
                {
                    name: "address_lookup_table_program",
                    address: "AddressLookupTab1e1111111111111111111111111",
                },
                {
                    name: "delegation_group",
                    writable: true,
                },
                {
                    name: "stake_program",
                    relations: ["program_state"],
                },
                {
                    name: "stake_pool",
                },
            ],
            args: [
                {
                    name: "params",
                    type: {
                        defined: {
                            name: "QueueInitDelegationGroupParams",
                        },
                    },
                },
            ],
        },
        {
            name: "queue_remove_mr_enclave",
            discriminator: [3, 64, 135, 33, 190, 133, 68, 252],
            accounts: [
                {
                    name: "queue",
                    writable: true,
                },
                {
                    name: "authority",
                    signer: true,
                },
                {
                    name: "program_authority",
                },
                {
                    name: "state",
                },
            ],
            args: [
                {
                    name: "params",
                    type: {
                        defined: {
                            name: "QueueRemoveMrEnclaveParams",
                        },
                    },
                },
            ],
        },
        {
            name: "queue_set_configs",
            discriminator: [54, 183, 243, 199, 49, 103, 142, 48],
            accounts: [
                {
                    name: "queue",
                    writable: true,
                },
                {
                    name: "authority",
                    signer: true,
                },
                {
                    name: "state",
                },
            ],
            args: [
                {
                    name: "params",
                    type: {
                        defined: {
                            name: "QueueSetConfigsParams",
                        },
                    },
                },
            ],
        },
        {
            name: "randomness_commit",
            discriminator: [52, 170, 152, 201, 179, 133, 242, 141],
            accounts: [
                {
                    name: "randomness",
                    writable: true,
                },
                {
                    name: "queue",
                    relations: ["randomness", "oracle"],
                },
                {
                    name: "oracle",
                    writable: true,
                },
                {
                    name: "recent_slothashes",
                    address: "SysvarS1otHashes111111111111111111111111111",
                },
                {
                    name: "authority",
                    signer: true,
                    relations: ["randomness"],
                },
            ],
            args: [
                {
                    name: "params",
                    type: {
                        defined: {
                            name: "RandomnessCommitParams",
                        },
                    },
                },
            ],
        },
        {
            name: "randomness_init",
            discriminator: [9, 9, 204, 33, 50, 116, 113, 15],
            accounts: [
                {
                    name: "randomness",
                    writable: true,
                    signer: true,
                },
                {
                    name: "reward_escrow",
                    writable: true,
                    pda: {
                        seeds: [
                            {
                                kind: "account",
                                path: "randomness",
                            },
                            {
                                kind: "const",
                                value: [
                                    6, 221, 246, 225, 215, 101, 161, 147, 217, 203, 225, 70, 206,
                                    235, 121, 172, 28, 180, 133, 237, 95, 91, 55, 145, 58, 140,
                                    245, 133, 126, 255, 0, 169,
                                ],
                            },
                            {
                                kind: "account",
                                path: "wrapped_sol_mint",
                            },
                        ],
                        program: {
                            kind: "const",
                            value: [
                                140, 151, 37, 143, 78, 36, 137, 241, 187, 61, 16, 41, 20, 142,
                                13, 131, 11, 90, 19, 153, 218, 255, 16, 132, 4, 142, 123, 216,
                                219, 233, 248, 89,
                            ],
                        },
                    },
                },
                {
                    name: "authority",
                    signer: true,
                },
                {
                    name: "queue",
                    writable: true,
                },
                {
                    name: "payer",
                    writable: true,
                    signer: true,
                },
                {
                    name: "system_program",
                    address: "11111111111111111111111111111111",
                },
                {
                    name: "token_program",
                    address: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
                },
                {
                    name: "associated_token_program",
                    address: "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL",
                },
                {
                    name: "wrapped_sol_mint",
                    address: "So11111111111111111111111111111111111111112",
                },
                {
                    name: "program_state",
                },
                {
                    name: "lut_signer",
                },
                {
                    name: "lut",
                    writable: true,
                },
                {
                    name: "address_lookup_table_program",
                    address: "AddressLookupTab1e1111111111111111111111111",
                },
            ],
            args: [
                {
                    name: "params",
                    type: {
                        defined: {
                            name: "RandomnessInitParams",
                        },
                    },
                },
            ],
        },
        {
            name: "randomness_reveal",
            discriminator: [197, 181, 187, 10, 30, 58, 20, 73],
            accounts: [
                {
                    name: "randomness",
                    writable: true,
                },
                {
                    name: "oracle",
                    relations: ["randomness"],
                },
                {
                    name: "queue",
                    relations: ["oracle"],
                },
                {
                    name: "stats",
                    writable: true,
                    pda: {
                        seeds: [
                            {
                                kind: "const",
                                value: [
                                    79, 114, 97, 99, 108, 101, 82, 97, 110, 100, 111, 109, 110,
                                    101, 115, 115, 83, 116, 97, 116, 115,
                                ],
                            },
                            {
                                kind: "account",
                                path: "oracle",
                            },
                        ],
                    },
                },
                {
                    name: "authority",
                    signer: true,
                    relations: ["randomness"],
                },
                {
                    name: "payer",
                    writable: true,
                    signer: true,
                },
                {
                    name: "recent_slothashes",
                    address: "SysvarS1otHashes111111111111111111111111111",
                },
                {
                    name: "system_program",
                    address: "11111111111111111111111111111111",
                },
                {
                    name: "reward_escrow",
                    writable: true,
                },
                {
                    name: "token_program",
                    address: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
                },
                {
                    name: "wrapped_sol_mint",
                    address: "So11111111111111111111111111111111111111112",
                },
                {
                    name: "program_state",
                },
            ],
            args: [
                {
                    name: "params",
                    type: {
                        defined: {
                            name: "RandomnessRevealParams",
                        },
                    },
                },
            ],
        },
        {
            name: "state_init",
            discriminator: [103, 241, 106, 190, 217, 153, 87, 105],
            accounts: [
                {
                    name: "state",
                    writable: true,
                    pda: {
                        seeds: [
                            {
                                kind: "const",
                                value: [83, 84, 65, 84, 69],
                            },
                        ],
                    },
                },
                {
                    name: "payer",
                    writable: true,
                    signer: true,
                },
                {
                    name: "system_program",
                    address: "11111111111111111111111111111111",
                },
            ],
            args: [
                {
                    name: "params",
                    type: {
                        defined: {
                            name: "StateInitParams",
                        },
                    },
                },
            ],
        },
        {
            name: "state_set_configs",
            discriminator: [40, 98, 76, 37, 206, 9, 47, 144],
            accounts: [
                {
                    name: "state",
                    writable: true,
                },
                {
                    name: "authority",
                    signer: true,
                    relations: ["state"],
                },
                {
                    name: "queue",
                    writable: true,
                },
                {
                    name: "payer",
                    writable: true,
                    signer: true,
                },
                {
                    name: "system_program",
                    address: "11111111111111111111111111111111",
                },
            ],
            args: [
                {
                    name: "params",
                    type: {
                        defined: {
                            name: "StateSetConfigsParams",
                        },
                    },
                },
            ],
        },
    ],
    accounts: [
        {
            name: "OracleAccountData",
            discriminator: [128, 30, 16, 241, 170, 73, 55, 54],
        },
        {
            name: "OracleStatsAccountData",
            discriminator: [180, 157, 178, 234, 240, 27, 152, 179],
        },
        {
            name: "PullFeedAccountData",
            discriminator: [196, 27, 108, 196, 10, 215, 219, 40],
        },
        {
            name: "QueueAccountData",
            discriminator: [217, 194, 55, 127, 184, 83, 138, 1],
        },
        {
            name: "RandomnessAccountData",
            discriminator: [10, 66, 229, 135, 220, 239, 217, 114],
        },
        {
            name: "State",
            discriminator: [216, 146, 107, 94, 104, 75, 182, 177],
        },
    ],
    events: [
        {
            name: "CostWhitelistEvent",
            discriminator: [56, 107, 191, 127, 116, 6, 138, 149],
        },
        {
            name: "GarbageCollectionEvent",
            discriminator: [232, 235, 2, 188, 8, 143, 145, 237],
        },
        {
            name: "GuardianQuoteVerifyEvent",
            discriminator: [31, 37, 39, 6, 214, 186, 33, 115],
        },
        {
            name: "OracleHeartbeatEvent",
            discriminator: [52, 29, 166, 2, 94, 7, 188, 13],
        },
        {
            name: "OracleInitEvent",
            discriminator: [89, 193, 219, 200, 1, 83, 167, 24],
        },
        {
            name: "OracleQuoteOverrideEvent",
            discriminator: [78, 204, 191, 210, 164, 196, 244, 65],
        },
        {
            name: "OracleQuoteRotateEvent",
            discriminator: [26, 189, 196, 192, 225, 127, 26, 228],
        },
        {
            name: "OracleQuoteVerifyRequestEvent",
            discriminator: [203, 209, 79, 0, 20, 71, 226, 202],
        },
        {
            name: "PermissionSetEvent",
            discriminator: [148, 86, 123, 0, 102, 20, 119, 206],
        },
        {
            name: "PullFeedErrorValueEvent",
            discriminator: [225, 80, 192, 95, 14, 12, 83, 192],
        },
        {
            name: "PullFeedValueEvents",
            discriminator: [86, 7, 231, 28, 122, 161, 117, 69],
        },
        {
            name: "QueueAddMrEnclaveEvent",
            discriminator: [170, 186, 175, 38, 216, 51, 69, 175],
        },
        {
            name: "QueueInitEvent",
            discriminator: [44, 137, 99, 227, 107, 8, 30, 105],
        },
        {
            name: "QueueRemoveMrEnclaveEvent",
            discriminator: [4, 105, 196, 60, 84, 122, 203, 196],
        },
        {
            name: "RandomnessCommitEvent",
            discriminator: [88, 60, 172, 90, 112, 10, 206, 147],
        },
    ],
    errors: [
        {
            code: 6000,
            name: "GenericError",
        },
        {
            code: 6001,
            name: "InvalidQuote",
        },
        {
            code: 6002,
            name: "InsufficientQueue",
        },
        {
            code: 6003,
            name: "QueueFull",
        },
        {
            code: 6004,
            name: "InvalidEnclaveSigner",
        },
        {
            code: 6005,
            name: "InvalidSigner",
        },
        {
            code: 6006,
            name: "MrEnclaveAlreadyExists",
        },
        {
            code: 6007,
            name: "MrEnclaveAtCapacity",
        },
        {
            code: 6008,
            name: "MrEnclaveDoesntExist",
        },
        {
            code: 6009,
            name: "PermissionDenied",
        },
        {
            code: 6010,
            name: "InvalidQueue",
        },
        {
            code: 6011,
            name: "IncorrectMrEnclave",
        },
        {
            code: 6012,
            name: "InvalidAuthority",
        },
        {
            code: 6013,
            name: "InvalidMrEnclave",
        },
        {
            code: 6014,
            name: "InvalidTimestamp",
        },
        {
            code: 6015,
            name: "InvalidOracleIdx",
        },
        {
            code: 6016,
            name: "InvalidSecpSignature",
        },
        {
            code: 6017,
            name: "InvalidGuardianQueue",
        },
        {
            code: 6018,
            name: "InvalidIndex",
        },
        {
            code: 6019,
            name: "InvalidOracleQueue",
        },
        {
            code: 6020,
            name: "InvalidPermission",
        },
        {
            code: 6021,
            name: "InvalidePermissionedAccount",
        },
        {
            code: 6022,
            name: "InvalidEpochRotate",
        },
        {
            code: 6023,
            name: "InvalidEpochFinalize",
        },
        {
            code: 6024,
            name: "InvalidEscrow",
        },
        {
            code: 6025,
            name: "IllegalOracle",
        },
        {
            code: 6026,
            name: "IllegalExecuteAttempt",
        },
        {
            code: 6027,
            name: "IllegalFeedValue",
        },
        {
            code: 6028,
            name: "InvalidOracleFeedStats",
        },
        {
            code: 6029,
            name: "InvalidStateAuthority",
        },
        {
            code: 6030,
            name: "NotEnoughSamples",
        },
        {
            code: 6031,
            name: "OracleIsVerified",
        },
        {
            code: 6032,
            name: "QueueIsEmpty",
        },
        {
            code: 6033,
            name: "SecpRecoverFailure",
        },
        {
            code: 6034,
            name: "StaleSample",
        },
        {
            code: 6035,
            name: "SwitchboardRandomnessTooOld",
        },
        {
            code: 6036,
            name: "EpochIdMismatch",
        },
        {
            code: 6037,
            name: "GuardianAlreadyVoted",
        },
        {
            code: 6038,
            name: "RandomnessNotRequested",
        },
        {
            code: 6039,
            name: "InvalidSlotNumber",
        },
        {
            code: 6040,
            name: "RandomnessOracleKeyExpired",
        },
        {
            code: 6041,
            name: "InvalidAdvisory",
        },
        {
            code: 6042,
            name: "InvalidOracleStats",
        },
        {
            code: 6043,
            name: "InvalidStakeProgram",
        },
        {
            code: 6044,
            name: "InvalidStakePool",
        },
        {
            code: 6045,
            name: "InvalidDelegationPool",
        },
        {
            code: 6046,
            name: "UnparsableAccount",
        },
        {
            code: 6047,
            name: "InvalidInstruction",
        },
        {
            code: 6048,
            name: "OracleAlreadyVerified",
        },
        {
            code: 6049,
            name: "GuardianNotVerified",
        },
        {
            code: 6050,
            name: "InvalidConstraint",
        },
        {
            code: 6051,
            name: "InvalidDelegationGroup",
        },
        {
            code: 6052,
            name: "OracleKeyNotFound",
        },
        {
            code: 6053,
            name: "GuardianReregisterAttempt",
        },
    ],
    types: [
        {
            name: "CompactResult",
            serialization: "bytemuck",
            repr: {
                kind: "c",
            },
            type: {
                kind: "struct",
                fields: [
                    {
                        name: "std_dev",
                        docs: [
                            "The standard deviation of the submissions needed for quorom size",
                        ],
                        type: "f32",
                    },
                    {
                        name: "mean",
                        docs: ["The mean of the submissions needed for quorom size"],
                        type: "f32",
                    },
                    {
                        name: "slot",
                        docs: ["The slot at which this value was signed."],
                        type: "u64",
                    },
                ],
            },
        },
        {
            name: "CostWhitelistEvent",
            type: {
                kind: "struct",
                fields: [
                    {
                        name: "feeds",
                        type: {
                            vec: "pubkey",
                        },
                    },
                    {
                        name: "reward",
                        type: "u32",
                    },
                ],
            },
        },
        {
            name: "CurrentResult",
            serialization: "bytemuck",
            repr: {
                kind: "c",
            },
            type: {
                kind: "struct",
                fields: [
                    {
                        name: "value",
                        docs: [
                            "The median value of the submissions needed for quorom size",
                        ],
                        type: "i128",
                    },
                    {
                        name: "std_dev",
                        docs: [
                            "The standard deviation of the submissions needed for quorom size",
                        ],
                        type: "i128",
                    },
                    {
                        name: "mean",
                        docs: ["The mean of the submissions needed for quorom size"],
                        type: "i128",
                    },
                    {
                        name: "range",
                        docs: ["The range of the submissions needed for quorom size"],
                        type: "i128",
                    },
                    {
                        name: "min_value",
                        docs: [
                            "The minimum value of the submissions needed for quorom size",
                        ],
                        type: "i128",
                    },
                    {
                        name: "max_value",
                        docs: [
                            "The maximum value of the submissions needed for quorom size",
                        ],
                        type: "i128",
                    },
                    {
                        name: "num_samples",
                        docs: ["The number of samples used to calculate this result"],
                        type: "u8",
                    },
                    {
                        name: "submission_idx",
                        docs: [
                            "The index of the submission that was used to calculate this result",
                        ],
                        type: "u8",
                    },
                    {
                        name: "padding1",
                        type: {
                            array: ["u8", 6],
                        },
                    },
                    {
                        name: "slot",
                        docs: ["The slot at which this value was signed."],
                        type: "u64",
                    },
                    {
                        name: "min_slot",
                        docs: [
                            "The slot at which the first considered submission was made",
                        ],
                        type: "u64",
                    },
                    {
                        name: "max_slot",
                        docs: ["The slot at which the last considered submission was made"],
                        type: "u64",
                    },
                ],
            },
        },
        {
            name: "GarbageCollectionEvent",
            type: {
                kind: "struct",
                fields: [
                    {
                        name: "oracle",
                        type: "pubkey",
                    },
                    {
                        name: "queue",
                        type: "pubkey",
                    },
                ],
            },
        },
        {
            name: "GuardianQuoteVerifyEvent",
            type: {
                kind: "struct",
                fields: [
                    {
                        name: "quote",
                        type: "pubkey",
                    },
                    {
                        name: "queue",
                        type: "pubkey",
                    },
                    {
                        name: "oracle",
                        type: "pubkey",
                    },
                ],
            },
        },
        {
            name: "GuardianQuoteVerifyParams",
            type: {
                kind: "struct",
                fields: [
                    {
                        name: "timestamp",
                        type: "i64",
                    },
                    {
                        name: "mr_enclave",
                        type: {
                            array: ["u8", 32],
                        },
                    },
                    {
                        name: "_reserved1",
                        type: "u32",
                    },
                    {
                        name: "ed25519_key",
                        type: "pubkey",
                    },
                    {
                        name: "secp256k1_key",
                        type: {
                            array: ["u8", 64],
                        },
                    },
                    {
                        name: "slot",
                        type: "u64",
                    },
                    {
                        name: "signature",
                        type: {
                            array: ["u8", 64],
                        },
                    },
                    {
                        name: "recovery_id",
                        type: "u8",
                    },
                    {
                        name: "advisories",
                        type: {
                            vec: "u32",
                        },
                    },
                ],
            },
        },
        {
            name: "GuardianRegisterParams",
            type: {
                kind: "struct",
                fields: [],
            },
        },
        {
            name: "GuardianUnregisterParams",
            type: {
                kind: "struct",
                fields: [],
            },
        },
        {
            name: "MegaSlotInfo",
            serialization: "bytemuck",
            repr: {
                kind: "c",
            },
            type: {
                kind: "struct",
                fields: [
                    {
                        name: "reserved1",
                        type: "u64",
                    },
                    {
                        name: "slot_end",
                        type: "u64",
                    },
                    {
                        name: "perf_goal",
                        type: "i64",
                    },
                    {
                        name: "current_signature_count",
                        type: "i64",
                    },
                ],
            },
        },
        {
            name: "MultiSubmission",
            type: {
                kind: "struct",
                fields: [
                    {
                        name: "values",
                        type: {
                            vec: "i128",
                        },
                    },
                    {
                        name: "signature",
                        type: {
                            array: ["u8", 64],
                        },
                    },
                    {
                        name: "recovery_id",
                        type: "u8",
                    },
                ],
            },
        },
        {
            name: "OracleAccountData",
            serialization: "bytemuck",
            repr: {
                kind: "c",
            },
            type: {
                kind: "struct",
                fields: [
                    {
                        name: "enclave",
                        docs: ["Represents the state of the quote verifiers enclave."],
                        type: {
                            defined: {
                                name: "Quote",
                            },
                        },
                    },
                    {
                        name: "authority",
                        docs: [
                            "The authority of the EnclaveAccount which is permitted to make account changes.",
                        ],
                        type: "pubkey",
                    },
                    {
                        name: "queue",
                        docs: [
                            "Queue used for attestation to verify a MRENCLAVE measurement.",
                        ],
                        type: "pubkey",
                    },
                    {
                        name: "created_at",
                        docs: ["The unix timestamp when the quote was created."],
                        type: "i64",
                    },
                    {
                        name: "last_heartbeat",
                        docs: ["The last time the quote heartbeated on-chain."],
                        type: "i64",
                    },
                    {
                        name: "secp_authority",
                        type: {
                            array: ["u8", 64],
                        },
                    },
                    {
                        name: "gateway_uri",
                        docs: ["URI location of the verifier's gateway."],
                        type: {
                            array: ["u8", 64],
                        },
                    },
                    {
                        name: "permissions",
                        type: "u64",
                    },
                    {
                        name: "is_on_queue",
                        docs: [
                            "Whether the quote is located on the AttestationQueues buffer.",
                        ],
                        type: "u8",
                    },
                    {
                        name: "_padding1",
                        type: {
                            array: ["u8", 7],
                        },
                    },
                    {
                        name: "lut_slot",
                        type: "u64",
                    },
                    {
                        name: "last_reward_epoch",
                        type: "u64",
                    },
                    {
                        name: "_ebuf4",
                        type: {
                            array: ["u8", 16],
                        },
                    },
                    {
                        name: "_ebuf3",
                        type: {
                            array: ["u8", 32],
                        },
                    },
                    {
                        name: "_ebuf2",
                        type: {
                            array: ["u8", 64],
                        },
                    },
                    {
                        name: "_ebuf1",
                        type: {
                            array: ["u8", 1024],
                        },
                    },
                ],
            },
        },
        {
            name: "OracleEpochInfo",
            serialization: "bytemuck",
            repr: {
                kind: "c",
            },
            type: {
                kind: "struct",
                fields: [
                    {
                        name: "id",
                        type: "u64",
                    },
                    {
                        name: "reserved1",
                        type: "u64",
                    },
                    {
                        name: "slot_end",
                        type: "u64",
                    },
                    {
                        name: "slash_score",
                        type: "u64",
                    },
                    {
                        name: "reward_score",
                        type: "u64",
                    },
                    {
                        name: "stake_score",
                        type: "u64",
                    },
                ],
            },
        },
        {
            name: "OracleHeartbeatEvent",
            type: {
                kind: "struct",
                fields: [
                    {
                        name: "oracle",
                        type: "pubkey",
                    },
                    {
                        name: "queue",
                        type: "pubkey",
                    },
                ],
            },
        },
        {
            name: "OracleHeartbeatParams",
            type: {
                kind: "struct",
                fields: [
                    {
                        name: "gateway_uri",
                        type: {
                            option: {
                                array: ["u8", 64],
                            },
                        },
                    },
                ],
            },
        },
        {
            name: "OracleInitEvent",
            type: {
                kind: "struct",
                fields: [
                    {
                        name: "oracle",
                        type: "pubkey",
                    },
                ],
            },
        },
        {
            name: "OracleInitParams",
            type: {
                kind: "struct",
                fields: [
                    {
                        name: "recent_slot",
                        type: "u64",
                    },
                    {
                        name: "authority",
                        type: "pubkey",
                    },
                    {
                        name: "queue",
                        type: "pubkey",
                    },
                    {
                        name: "secp_authority",
                        type: {
                            option: {
                                array: ["u8", 64],
                            },
                        },
                    },
                ],
            },
        },
        {
            name: "OracleQuoteOverrideEvent",
            type: {
                kind: "struct",
                fields: [
                    {
                        name: "oracle",
                        type: "pubkey",
                    },
                    {
                        name: "queue",
                        type: "pubkey",
                    },
                ],
            },
        },
        {
            name: "OracleQuoteRotateEvent",
            type: {
                kind: "struct",
                fields: [
                    {
                        name: "oracle",
                        type: "pubkey",
                    },
                ],
            },
        },
        {
            name: "OracleQuoteVerifyRequestEvent",
            type: {
                kind: "struct",
                fields: [
                    {
                        name: "quote",
                        type: "pubkey",
                    },
                    {
                        name: "oracle",
                        type: "pubkey",
                    },
                ],
            },
        },
        {
            name: "OracleSetConfigsParams",
            type: {
                kind: "struct",
                fields: [
                    {
                        name: "new_authority",
                        type: {
                            option: "pubkey",
                        },
                    },
                    {
                        name: "new_secp_authority",
                        type: {
                            option: {
                                array: ["u8", 64],
                            },
                        },
                    },
                ],
            },
        },
        {
            name: "OracleStatsAccountData",
            serialization: "bytemuck",
            repr: {
                kind: "c",
            },
            type: {
                kind: "struct",
                fields: [
                    {
                        name: "owner",
                        type: "pubkey",
                    },
                    {
                        name: "oracle",
                        type: "pubkey",
                    },
                    {
                        name: "finalized_epoch",
                        docs: [
                            "The last epoch that has completed. cleared after registered with the",
                            "staking program.",
                        ],
                        type: {
                            defined: {
                                name: "OracleEpochInfo",
                            },
                        },
                    },
                    {
                        name: "current_epoch",
                        docs: [
                            "The current epoch info being used by the oracle. for stake. Will moved",
                            "to finalized_epoch as soon as the epoch is over.",
                        ],
                        type: {
                            defined: {
                                name: "OracleEpochInfo",
                            },
                        },
                    },
                    {
                        name: "mega_slot_info",
                        type: {
                            defined: {
                                name: "MegaSlotInfo",
                            },
                        },
                    },
                    {
                        name: "last_transfer_slot",
                        type: "u64",
                    },
                    {
                        name: "bump",
                        type: "u8",
                    },
                    {
                        name: "padding1",
                        type: {
                            array: ["u8", 7],
                        },
                    },
                    {
                        name: "_ebuf",
                        docs: ["Reserved."],
                        type: {
                            array: ["u8", 1024],
                        },
                    },
                ],
            },
        },
        {
            name: "OracleSubmission",
            serialization: "bytemuck",
            repr: {
                kind: "c",
            },
            type: {
                kind: "struct",
                fields: [
                    {
                        name: "oracle",
                        docs: ["The public key of the oracle that submitted this value."],
                        type: "pubkey",
                    },
                    {
                        name: "slot",
                        docs: ["The slot at which this value was signed."],
                        type: "u64",
                    },
                    {
                        name: "landed_at",
                        docs: ["The slot at which this value was landed on chain."],
                        type: "u64",
                    },
                    {
                        name: "value",
                        docs: ["The value that was submitted."],
                        type: "i128",
                    },
                ],
            },
        },
        {
            name: "OracleUpdateDelegationParams",
            type: {
                kind: "struct",
                fields: [
                    {
                        name: "_reserved1",
                        type: "u64",
                    },
                ],
            },
        },
        {
            name: "PermissionSetEvent",
            type: {
                kind: "struct",
                fields: [
                    {
                        name: "permission",
                        type: "pubkey",
                    },
                ],
            },
        },
        {
            name: "PermissionSetParams",
            type: {
                kind: "struct",
                fields: [
                    {
                        name: "permission",
                        type: "u8",
                    },
                    {
                        name: "enable",
                        type: "bool",
                    },
                ],
            },
        },
        {
            name: "PullFeedAccountData",
            docs: ["A representation of the data in a pull feed account."],
            serialization: "bytemuck",
            repr: {
                kind: "c",
            },
            type: {
                kind: "struct",
                fields: [
                    {
                        name: "submissions",
                        docs: ["The oracle submissions for this feed."],
                        type: {
                            array: [
                                {
                                    defined: {
                                        name: "OracleSubmission",
                                    },
                                },
                                32,
                            ],
                        },
                    },
                    {
                        name: "authority",
                        docs: [
                            "The public key of the authority that can update the feed hash that",
                            "this account will use for registering updates.",
                        ],
                        type: "pubkey",
                    },
                    {
                        name: "queue",
                        docs: [
                            "The public key of the queue which oracles must be bound to in order to",
                            "submit data to this feed.",
                        ],
                        type: "pubkey",
                    },
                    {
                        name: "feed_hash",
                        docs: [
                            "SHA-256 hash of the job schema oracles will execute to produce data",
                            "for this feed.",
                        ],
                        type: {
                            array: ["u8", 32],
                        },
                    },
                    {
                        name: "initialized_at",
                        docs: ["The slot at which this account was initialized."],
                        type: "i64",
                    },
                    {
                        name: "permissions",
                        type: "u64",
                    },
                    {
                        name: "max_variance",
                        type: "u64",
                    },
                    {
                        name: "min_responses",
                        type: "u32",
                    },
                    {
                        name: "name",
                        type: {
                            array: ["u8", 32],
                        },
                    },
                    {
                        name: "padding1",
                        type: {
                            array: ["u8", 2],
                        },
                    },
                    {
                        name: "historical_result_idx",
                        type: "u8",
                    },
                    {
                        name: "min_sample_size",
                        type: "u8",
                    },
                    {
                        name: "last_update_timestamp",
                        type: "i64",
                    },
                    {
                        name: "lut_slot",
                        type: "u64",
                    },
                    {
                        name: "_reserved1",
                        type: {
                            array: ["u8", 32],
                        },
                    },
                    {
                        name: "result",
                        type: {
                            defined: {
                                name: "CurrentResult",
                            },
                        },
                    },
                    {
                        name: "max_staleness",
                        type: "u32",
                    },
                    {
                        name: "padding2",
                        type: {
                            array: ["u8", 12],
                        },
                    },
                    {
                        name: "historical_results",
                        type: {
                            array: [
                                {
                                    defined: {
                                        name: "CompactResult",
                                    },
                                },
                                32,
                            ],
                        },
                    },
                    {
                        name: "_ebuf4",
                        type: {
                            array: ["u8", 8],
                        },
                    },
                    {
                        name: "_ebuf3",
                        type: {
                            array: ["u8", 24],
                        },
                    },
                    {
                        name: "_ebuf2",
                        type: {
                            array: ["u8", 256],
                        },
                    },
                ],
            },
        },
        {
            name: "PullFeedCloseParams",
            type: {
                kind: "struct",
                fields: [],
            },
        },
        {
            name: "PullFeedErrorValueEvent",
            type: {
                kind: "struct",
                fields: [
                    {
                        name: "feed",
                        type: "pubkey",
                    },
                    {
                        name: "oracle",
                        type: "pubkey",
                    },
                ],
            },
        },
        {
            name: "PullFeedInitParams",
            type: {
                kind: "struct",
                fields: [
                    {
                        name: "feed_hash",
                        type: {
                            array: ["u8", 32],
                        },
                    },
                    {
                        name: "max_variance",
                        type: "u64",
                    },
                    {
                        name: "min_responses",
                        type: "u32",
                    },
                    {
                        name: "name",
                        type: {
                            array: ["u8", 32],
                        },
                    },
                    {
                        name: "recent_slot",
                        type: "u64",
                    },
                    {
                        name: "ipfs_hash",
                        type: {
                            array: ["u8", 32],
                        },
                    },
                    {
                        name: "min_sample_size",
                        type: "u8",
                    },
                    {
                        name: "max_staleness",
                        type: "u32",
                    },
                ],
            },
        },
        {
            name: "PullFeedSetConfigsParams",
            type: {
                kind: "struct",
                fields: [
                    {
                        name: "feed_hash",
                        type: {
                            option: {
                                array: ["u8", 32],
                            },
                        },
                    },
                    {
                        name: "authority",
                        type: {
                            option: "pubkey",
                        },
                    },
                    {
                        name: "max_variance",
                        type: {
                            option: "u64",
                        },
                    },
                    {
                        name: "min_responses",
                        type: {
                            option: "u32",
                        },
                    },
                    {
                        name: "name",
                        type: {
                            option: {
                                array: ["u8", 32],
                            },
                        },
                    },
                    {
                        name: "ipfs_hash",
                        type: {
                            option: {
                                array: ["u8", 32],
                            },
                        },
                    },
                    {
                        name: "min_sample_size",
                        type: {
                            option: "u8",
                        },
                    },
                    {
                        name: "max_staleness",
                        type: {
                            option: "u32",
                        },
                    },
                ],
            },
        },
        {
            name: "PullFeedSubmitResponseManyParams",
            type: {
                kind: "struct",
                fields: [
                    {
                        name: "slot",
                        type: "u64",
                    },
                    {
                        name: "submissions",
                        type: {
                            vec: {
                                defined: {
                                    name: "MultiSubmission",
                                },
                            },
                        },
                    },
                ],
            },
        },
        {
            name: "PullFeedSubmitResponseParams",
            type: {
                kind: "struct",
                fields: [
                    {
                        name: "slot",
                        type: "u64",
                    },
                    {
                        name: "submissions",
                        type: {
                            vec: {
                                defined: {
                                    name: "Submission",
                                },
                            },
                        },
                    },
                ],
            },
        },
        {
            name: "PullFeedValueEvents",
            type: {
                kind: "struct",
                fields: [
                    {
                        name: "feeds",
                        type: {
                            vec: "pubkey",
                        },
                    },
                    {
                        name: "oracles",
                        type: {
                            vec: "pubkey",
                        },
                    },
                    {
                        name: "values",
                        type: {
                            vec: {
                                vec: "i128",
                            },
                        },
                    },
                    {
                        name: "reward",
                        type: "u32",
                    },
                ],
            },
        },
        {
            name: "QueueAccountData",
            docs: [
                "An Queue represents a round-robin queue of oracle oracles who attest on-chain",
                "whether a Switchboard Function was executed within an enclave against an expected set of",
                "enclave measurements.",
                "",
                "For an oracle to join the queue, the oracle must first submit their enclave quote on-chain and",
                "wait for an existing oracle to attest their quote. If the oracle's quote matches an expected",
                "measurement within the queues mr_enclaves config, it is granted permissions and will start",
                "being assigned update requests.",
            ],
            serialization: "bytemuck",
            repr: {
                kind: "c",
            },
            type: {
                kind: "struct",
                fields: [
                    {
                        name: "authority",
                        docs: [
                            "The address of the authority which is permitted to add/remove allowed enclave measurements.",
                        ],
                        type: "pubkey",
                    },
                    {
                        name: "mr_enclaves",
                        docs: ["Allowed enclave measurements."],
                        type: {
                            array: [
                                {
                                    array: ["u8", 32],
                                },
                                32,
                            ],
                        },
                    },
                    {
                        name: "oracle_keys",
                        docs: [
                            "The addresses of the quote oracles who have a valid",
                            "verification status and have heartbeated on-chain recently.",
                        ],
                        type: {
                            array: ["pubkey", 128],
                        },
                    },
                    {
                        name: "max_quote_verification_age",
                        docs: [
                            "The maximum allowable time until a EnclaveAccount needs to be re-verified on-chain.",
                        ],
                        type: "i64",
                    },
                    {
                        name: "last_heartbeat",
                        docs: [
                            "The unix timestamp when the last quote oracle heartbeated on-chain.",
                        ],
                        type: "i64",
                    },
                    {
                        name: "node_timeout",
                        type: "i64",
                    },
                    {
                        name: "oracle_min_stake",
                        docs: [
                            "The minimum number of lamports a quote oracle needs to lock-up in order to heartbeat and verify other quotes.",
                        ],
                        type: "u64",
                    },
                    {
                        name: "allow_authority_override_after",
                        type: "i64",
                    },
                    {
                        name: "mr_enclaves_len",
                        docs: ["The number of allowed enclave measurements."],
                        type: "u32",
                    },
                    {
                        name: "oracle_keys_len",
                        docs: [
                            "The length of valid quote oracles for the given attestation queue.",
                        ],
                        type: "u32",
                    },
                    {
                        name: "reward",
                        docs: ["The reward paid to quote oracles for attesting on-chain."],
                        type: "u32",
                    },
                    {
                        name: "curr_idx",
                        docs: [
                            "Incrementer used to track the current quote oracle permitted to run any available functions.",
                        ],
                        type: "u32",
                    },
                    {
                        name: "gc_idx",
                        docs: [
                            "Incrementer used to garbage collect and remove stale quote oracles.",
                        ],
                        type: "u32",
                    },
                    {
                        name: "require_authority_heartbeat_permission",
                        type: "u8",
                    },
                    {
                        name: "require_authority_verify_permission",
                        type: "u8",
                    },
                    {
                        name: "require_usage_permissions",
                        type: "u8",
                    },
                    {
                        name: "signer_bump",
                        type: "u8",
                    },
                    {
                        name: "mint",
                        type: "pubkey",
                    },
                    {
                        name: "lut_slot",
                        type: "u64",
                    },
                    {
                        name: "allow_subsidies",
                        type: "u8",
                    },
                    {
                        name: "_ebuf6",
                        docs: ["Reserved."],
                        type: {
                            array: ["u8", 23],
                        },
                    },
                    {
                        name: "_ebuf5",
                        type: {
                            array: ["u8", 32],
                        },
                    },
                    {
                        name: "_ebuf4",
                        type: {
                            array: ["u8", 64],
                        },
                    },
                    {
                        name: "_ebuf3",
                        type: {
                            array: ["u8", 128],
                        },
                    },
                    {
                        name: "_ebuf2",
                        type: {
                            array: ["u8", 256],
                        },
                    },
                    {
                        name: "_ebuf1",
                        type: {
                            array: ["u8", 512],
                        },
                    },
                ],
            },
        },
        {
            name: "QueueAddMrEnclaveEvent",
            type: {
                kind: "struct",
                fields: [
                    {
                        name: "queue",
                        type: "pubkey",
                    },
                    {
                        name: "mr_enclave",
                        type: {
                            array: ["u8", 32],
                        },
                    },
                ],
            },
        },
        {
            name: "QueueAddMrEnclaveParams",
            type: {
                kind: "struct",
                fields: [
                    {
                        name: "mr_enclave",
                        type: {
                            array: ["u8", 32],
                        },
                    },
                ],
            },
        },
        {
            name: "QueueAllowSubsidiesParams",
            type: {
                kind: "struct",
                fields: [
                    {
                        name: "allow_subsidies",
                        type: "u8",
                    },
                ],
            },
        },
        {
            name: "QueueGarbageCollectParams",
            type: {
                kind: "struct",
                fields: [
                    {
                        name: "idx",
                        type: "u32",
                    },
                ],
            },
        },
        {
            name: "QueueInitDelegationGroupParams",
            type: {
                kind: "struct",
                fields: [],
            },
        },
        {
            name: "QueueInitEvent",
            type: {
                kind: "struct",
                fields: [
                    {
                        name: "queue",
                        type: "pubkey",
                    },
                ],
            },
        },
        {
            name: "QueueInitParams",
            type: {
                kind: "struct",
                fields: [
                    {
                        name: "allow_authority_override_after",
                        type: "u32",
                    },
                    {
                        name: "require_authority_heartbeat_permission",
                        type: "bool",
                    },
                    {
                        name: "require_usage_permissions",
                        type: "bool",
                    },
                    {
                        name: "max_quote_verification_age",
                        type: "u32",
                    },
                    {
                        name: "reward",
                        type: "u32",
                    },
                    {
                        name: "node_timeout",
                        type: "u32",
                    },
                    {
                        name: "recent_slot",
                        type: "u64",
                    },
                ],
            },
        },
        {
            name: "QueueRemoveMrEnclaveEvent",
            type: {
                kind: "struct",
                fields: [
                    {
                        name: "queue",
                        type: "pubkey",
                    },
                    {
                        name: "mr_enclave",
                        type: {
                            array: ["u8", 32],
                        },
                    },
                ],
            },
        },
        {
            name: "QueueRemoveMrEnclaveParams",
            type: {
                kind: "struct",
                fields: [
                    {
                        name: "mr_enclave",
                        type: {
                            array: ["u8", 32],
                        },
                    },
                ],
            },
        },
        {
            name: "QueueSetConfigsParams",
            type: {
                kind: "struct",
                fields: [
                    {
                        name: "authority",
                        type: {
                            option: "pubkey",
                        },
                    },
                    {
                        name: "reward",
                        type: {
                            option: "u32",
                        },
                    },
                    {
                        name: "node_timeout",
                        type: {
                            option: "i64",
                        },
                    },
                ],
            },
        },
        {
            name: "Quote",
            serialization: "bytemuck",
            repr: {
                kind: "c",
            },
            type: {
                kind: "struct",
                fields: [
                    {
                        name: "enclave_signer",
                        docs: ["The address of the signer generated within an enclave."],
                        type: "pubkey",
                    },
                    {
                        name: "mr_enclave",
                        docs: [
                            "The quotes MRENCLAVE measurement dictating the contents of the secure enclave.",
                        ],
                        type: {
                            array: ["u8", 32],
                        },
                    },
                    {
                        name: "verification_status",
                        docs: ["The VerificationStatus of the quote."],
                        type: "u8",
                    },
                    {
                        name: "padding1",
                        type: {
                            array: ["u8", 7],
                        },
                    },
                    {
                        name: "verification_timestamp",
                        docs: ["The unix timestamp when the quote was last verified."],
                        type: "i64",
                    },
                    {
                        name: "valid_until",
                        docs: [
                            "The unix timestamp when the quotes verification status expires.",
                        ],
                        type: "i64",
                    },
                    {
                        name: "quote_registry",
                        docs: [
                            "The off-chain registry where the verifiers quote can be located.",
                        ],
                        type: {
                            array: ["u8", 32],
                        },
                    },
                    {
                        name: "registry_key",
                        docs: [
                            "Key to lookup the buffer data on IPFS or an alternative decentralized storage solution.",
                        ],
                        type: {
                            array: ["u8", 64],
                        },
                    },
                    {
                        name: "secp256k1_signer",
                        docs: [
                            "The secp256k1 public key of the enclave signer. Derived from the enclave_signer.",
                        ],
                        type: {
                            array: ["u8", 64],
                        },
                    },
                    {
                        name: "last_ed25519_signer",
                        type: "pubkey",
                    },
                    {
                        name: "last_secp256k1_signer",
                        type: {
                            array: ["u8", 64],
                        },
                    },
                    {
                        name: "last_rotate_slot",
                        type: "u64",
                    },
                    {
                        name: "guardian_approvers",
                        type: {
                            array: ["pubkey", 64],
                        },
                    },
                    {
                        name: "guardian_approvers_len",
                        type: "u8",
                    },
                    {
                        name: "padding2",
                        type: {
                            array: ["u8", 7],
                        },
                    },
                    {
                        name: "staging_ed25519_signer",
                        type: "pubkey",
                    },
                    {
                        name: "staging_secp256k1_signer",
                        type: {
                            array: ["u8", 64],
                        },
                    },
                    {
                        name: "_ebuf4",
                        docs: ["Reserved."],
                        type: {
                            array: ["u8", 32],
                        },
                    },
                    {
                        name: "_ebuf3",
                        type: {
                            array: ["u8", 128],
                        },
                    },
                    {
                        name: "_ebuf2",
                        type: {
                            array: ["u8", 256],
                        },
                    },
                    {
                        name: "_ebuf1",
                        type: {
                            array: ["u8", 512],
                        },
                    },
                ],
            },
        },
        {
            name: "RandomnessAccountData",
            serialization: "bytemuck",
            repr: {
                kind: "c",
            },
            type: {
                kind: "struct",
                fields: [
                    {
                        name: "authority",
                        type: "pubkey",
                    },
                    {
                        name: "queue",
                        type: "pubkey",
                    },
                    {
                        name: "seed_slothash",
                        type: {
                            array: ["u8", 32],
                        },
                    },
                    {
                        name: "seed_slot",
                        type: "u64",
                    },
                    {
                        name: "oracle",
                        type: "pubkey",
                    },
                    {
                        name: "reveal_slot",
                        type: "u64",
                    },
                    {
                        name: "value",
                        type: {
                            array: ["u8", 32],
                        },
                    },
                    {
                        name: "lut_slot",
                        type: "u64",
                    },
                    {
                        name: "_ebuf3",
                        type: {
                            array: ["u8", 24],
                        },
                    },
                    {
                        name: "_ebuf2",
                        type: {
                            array: ["u8", 64],
                        },
                    },
                    {
                        name: "_ebuf1",
                        type: {
                            array: ["u8", 128],
                        },
                    },
                    {
                        name: "active_secp256k1_signer",
                        type: {
                            array: ["u8", 64],
                        },
                    },
                    {
                        name: "active_secp256k1_expiration",
                        type: "i64",
                    },
                ],
            },
        },
        {
            name: "RandomnessCommitEvent",
            type: {
                kind: "struct",
                fields: [
                    {
                        name: "randomness_account",
                        type: "pubkey",
                    },
                    {
                        name: "oracle",
                        type: "pubkey",
                    },
                    {
                        name: "slot",
                        type: "u64",
                    },
                    {
                        name: "slothash",
                        type: {
                            array: ["u8", 32],
                        },
                    },
                ],
            },
        },
        {
            name: "RandomnessCommitParams",
            type: {
                kind: "struct",
                fields: [],
            },
        },
        {
            name: "RandomnessInitParams",
            type: {
                kind: "struct",
                fields: [
                    {
                        name: "recent_slot",
                        type: "u64",
                    },
                ],
            },
        },
        {
            name: "RandomnessRevealParams",
            type: {
                kind: "struct",
                fields: [
                    {
                        name: "signature",
                        type: {
                            array: ["u8", 64],
                        },
                    },
                    {
                        name: "recovery_id",
                        type: "u8",
                    },
                    {
                        name: "value",
                        type: {
                            array: ["u8", 32],
                        },
                    },
                ],
            },
        },
        {
            name: "State",
            serialization: "bytemuck",
            repr: {
                kind: "c",
            },
            type: {
                kind: "struct",
                fields: [
                    {
                        name: "bump",
                        type: "u8",
                    },
                    {
                        name: "test_only_disable_mr_enclave_check",
                        type: "u8",
                    },
                    {
                        name: "enable_staking",
                        type: "u8",
                    },
                    {
                        name: "padding1",
                        type: {
                            array: ["u8", 5],
                        },
                    },
                    {
                        name: "authority",
                        type: "pubkey",
                    },
                    {
                        name: "guardian_queue",
                        type: "pubkey",
                    },
                    {
                        name: "reserved1",
                        type: "u64",
                    },
                    {
                        name: "epoch_length",
                        type: "u64",
                    },
                    {
                        name: "current_epoch",
                        type: {
                            defined: {
                                name: "StateEpochInfo",
                            },
                        },
                    },
                    {
                        name: "next_epoch",
                        type: {
                            defined: {
                                name: "StateEpochInfo",
                            },
                        },
                    },
                    {
                        name: "finalized_epoch",
                        type: {
                            defined: {
                                name: "StateEpochInfo",
                            },
                        },
                    },
                    {
                        name: "stake_pool",
                        type: "pubkey",
                    },
                    {
                        name: "stake_program",
                        type: "pubkey",
                    },
                    {
                        name: "switch_mint",
                        type: "pubkey",
                    },
                    {
                        name: "sgx_advisories",
                        type: {
                            array: ["u16", 32],
                        },
                    },
                    {
                        name: "advisories_len",
                        type: "u8",
                    },
                    {
                        name: "padding2",
                        type: "u8",
                    },
                    {
                        name: "flat_reward_cut_percentage",
                        type: "u8",
                    },
                    {
                        name: "enable_slashing",
                        type: "u8",
                    },
                    {
                        name: "subsidy_amount",
                        type: "u32",
                    },
                    {
                        name: "lut_slot",
                        type: "u64",
                    },
                    {
                        name: "base_reward",
                        type: "u32",
                    },
                    {
                        name: "_ebuf6",
                        type: {
                            array: ["u8", 28],
                        },
                    },
                    {
                        name: "_ebuf5",
                        type: {
                            array: ["u8", 32],
                        },
                    },
                    {
                        name: "_ebuf4",
                        type: {
                            array: ["u8", 64],
                        },
                    },
                    {
                        name: "_ebuf3",
                        type: {
                            array: ["u8", 128],
                        },
                    },
                    {
                        name: "_ebuf2",
                        type: {
                            array: ["u8", 512],
                        },
                    },
                    {
                        name: "cost_whitelist",
                        docs: ["Cost whitelist by authority"],
                        type: {
                            array: ["pubkey", 32],
                        },
                    },
                ],
            },
        },
        {
            name: "StateEpochInfo",
            serialization: "bytemuck",
            repr: {
                kind: "c",
            },
            type: {
                kind: "struct",
                fields: [
                    {
                        name: "id",
                        type: "u64",
                    },
                    {
                        name: "_reserved1",
                        type: "u64",
                    },
                    {
                        name: "slot_end",
                        type: "u64",
                    },
                ],
            },
        },
        {
            name: "StateInitParams",
            type: {
                kind: "struct",
                fields: [],
            },
        },
        {
            name: "StateSetConfigsParams",
            type: {
                kind: "struct",
                fields: [
                    {
                        name: "new_authority",
                        type: "pubkey",
                    },
                    {
                        name: "test_only_disable_mr_enclave_check",
                        type: "u8",
                    },
                    {
                        name: "stake_pool",
                        type: "pubkey",
                    },
                    {
                        name: "stake_program",
                        type: "pubkey",
                    },
                    {
                        name: "add_advisory",
                        type: "u16",
                    },
                    {
                        name: "rm_advisory",
                        type: "u16",
                    },
                    {
                        name: "epoch_length",
                        type: "u32",
                    },
                    {
                        name: "reset_epochs",
                        type: "bool",
                    },
                    {
                        name: "switch_mint",
                        type: "pubkey",
                    },
                    {
                        name: "enable_staking",
                        type: "u8",
                    },
                    {
                        name: "subsidy_amount",
                        type: "u32",
                    },
                    {
                        name: "base_reward",
                        type: "u32",
                    },
                    {
                        name: "add_cost_wl",
                        type: "pubkey",
                    },
                    {
                        name: "rm_cost_wl",
                        type: "pubkey",
                    },
                ],
            },
        },
        {
            name: "Submission",
            type: {
                kind: "struct",
                fields: [
                    {
                        name: "value",
                        type: "i128",
                    },
                    {
                        name: "signature",
                        type: {
                            array: ["u8", 64],
                        },
                    },
                    {
                        name: "recovery_id",
                        type: "u8",
                    },
                    {
                        name: "offset",
                        type: "u8",
                    },
                ],
            },
        },
    ],
};
