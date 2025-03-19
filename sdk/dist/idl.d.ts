import { Idl } from "@coral-xyz/anchor";
export type GinkoProtocol = {
    address: "GinKo7e13rZF9PmvNnejkexYE37kggTcdpkFMTyNVjke";
    metadata: {
        name: "ginkoProtocol";
        version: "0.1.0";
        spec: "0.1.0";
        description: "Created with Anchor";
    };
    instructions: [
        {
            name: "cancelOrder";
            discriminator: [95, 129, 237, 240, 8, 49, 223, 132];
            accounts: [
                {
                    name: "owner";
                    signer: true;
                    relations: ["order"];
                },
                {
                    name: "order";
                    writable: true;
                },
                {
                    name: "asset";
                    relations: ["order"];
                },
                {
                    name: "orderInputHolder";
                    writable: true;
                },
                {
                    name: "refundTokenHolder";
                    writable: true;
                },
                {
                    name: "tokenProgram";
                    address: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA";
                }
            ];
            args: [];
        },
        {
            name: "fillOrder";
            discriminator: [232, 122, 115, 25, 199, 143, 136, 162];
            accounts: [
                {
                    name: "settler";
                    signer: true;
                    relations: ["asset"];
                },
                {
                    name: "asset";
                    relations: ["order"];
                },
                {
                    name: "order";
                    writable: true;
                },
                {
                    name: "priceOracle";
                    relations: ["asset"];
                },
                {
                    name: "inputHolder";
                    writable: true;
                    relations: ["order"];
                },
                {
                    name: "assetPaymentTokenHolder";
                    writable: true;
                },
                {
                    name: "assetTokenMint";
                    writable: true;
                },
                {
                    name: "paymentTokenMint";
                },
                {
                    name: "userOutputTokenHolder";
                    writable: true;
                },
                {
                    name: "tokenProgram";
                    address: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA";
                }
            ];
            args: [
                {
                    name: "fillQty";
                    type: "u64";
                },
                {
                    name: "price";
                    type: {
                        defined: {
                            name: "price";
                        };
                    };
                }
            ];
        },
        {
            name: "gcOrder";
            discriminator: [34, 128, 255, 186, 133, 111, 11, 231];
            accounts: [
                {
                    name: "executor";
                    writable: true;
                    signer: true;
                },
                {
                    name: "owner";
                    docs: ["CHECK ."];
                    writable: true;
                },
                {
                    name: "order";
                    writable: true;
                },
                {
                    name: "asset";
                    relations: ["order"];
                },
                {
                    name: "orderInputHolder";
                    writable: true;
                },
                {
                    name: "refundTokenHolder";
                    writable: true;
                },
                {
                    name: "tokenProgram";
                    address: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA";
                }
            ];
            args: [];
        },
        {
            name: "initCounter";
            discriminator: [247, 168, 146, 45, 125, 26, 142, 80];
            accounts: [
                {
                    name: "payer";
                    writable: true;
                    signer: true;
                },
                {
                    name: "owner";
                },
                {
                    name: "counter";
                    writable: true;
                    pda: {
                        seeds: [
                            {
                                kind: "const";
                                value: [99, 111, 117, 110, 116, 101, 114];
                            },
                            {
                                kind: "account";
                                path: "owner";
                            }
                        ];
                    };
                },
                {
                    name: "systemProgram";
                    address: "11111111111111111111111111111111";
                },
                {
                    name: "rent";
                    address: "SysvarRent111111111111111111111111111111111";
                }
            ];
            args: [];
        },
        {
            name: "initializeAsset";
            discriminator: [214, 153, 49, 248, 95, 248, 208, 179];
            accounts: [
                {
                    name: "admin";
                    writable: true;
                    signer: true;
                },
                {
                    name: "asset";
                    writable: true;
                },
                {
                    name: "assetTokenMint";
                    writable: true;
                    pda: {
                        seeds: [
                            {
                                kind: "const";
                                value: [
                                    97,
                                    115,
                                    115,
                                    101,
                                    116,
                                    95,
                                    116,
                                    111,
                                    107,
                                    101,
                                    110,
                                    95,
                                    109,
                                    105,
                                    110,
                                    116
                                ];
                            },
                            {
                                kind: "account";
                                path: "asset";
                            }
                        ];
                    };
                },
                {
                    name: "paymentTokenMint";
                },
                {
                    name: "paymentTokenHolder";
                    writable: true;
                    pda: {
                        seeds: [
                            {
                                kind: "account";
                                path: "asset";
                            },
                            {
                                kind: "const";
                                value: [
                                    6,
                                    221,
                                    246,
                                    225,
                                    215,
                                    101,
                                    161,
                                    147,
                                    217,
                                    203,
                                    225,
                                    70,
                                    206,
                                    235,
                                    121,
                                    172,
                                    28,
                                    180,
                                    133,
                                    237,
                                    95,
                                    91,
                                    55,
                                    145,
                                    58,
                                    140,
                                    245,
                                    133,
                                    126,
                                    255,
                                    0,
                                    169
                                ];
                            },
                            {
                                kind: "account";
                                path: "paymentTokenMint";
                            }
                        ];
                        program: {
                            kind: "const";
                            value: [
                                140,
                                151,
                                37,
                                143,
                                78,
                                36,
                                137,
                                241,
                                187,
                                61,
                                16,
                                41,
                                20,
                                142,
                                13,
                                131,
                                11,
                                90,
                                19,
                                153,
                                218,
                                255,
                                16,
                                132,
                                4,
                                142,
                                123,
                                216,
                                219,
                                233,
                                248,
                                89
                            ];
                        };
                    };
                },
                {
                    name: "tokenProgram";
                    address: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA";
                },
                {
                    name: "associatedTokenProgram";
                    address: "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL";
                },
                {
                    name: "systemProgram";
                    address: "11111111111111111111111111111111";
                },
                {
                    name: "rent";
                    address: "SysvarRent111111111111111111111111111111111";
                }
            ];
            args: [
                {
                    name: "params";
                    type: {
                        defined: {
                            name: "assetParams";
                        };
                    };
                }
            ];
        },
        {
            name: "placeOrder";
            discriminator: [51, 194, 155, 175, 109, 130, 96, 106];
            accounts: [
                {
                    name: "owner";
                    writable: true;
                    signer: true;
                    relations: ["counter"];
                },
                {
                    name: "asset";
                },
                {
                    name: "counter";
                    writable: true;
                },
                {
                    name: "order";
                    writable: true;
                    pda: {
                        seeds: [
                            {
                                kind: "const";
                                value: [111, 114, 100, 101, 114];
                            },
                            {
                                kind: "account";
                                path: "owner";
                            },
                            {
                                kind: "account";
                                path: "counter.count";
                                account: "counter";
                            }
                        ];
                    };
                },
                {
                    name: "priceOracle";
                    relations: ["asset"];
                },
                {
                    name: "inputTokenMint";
                },
                {
                    name: "outputTokenMint";
                },
                {
                    name: "orderInputHolder";
                    writable: true;
                    pda: {
                        seeds: [
                            {
                                kind: "account";
                                path: "order";
                            },
                            {
                                kind: "const";
                                value: [
                                    6,
                                    221,
                                    246,
                                    225,
                                    215,
                                    101,
                                    161,
                                    147,
                                    217,
                                    203,
                                    225,
                                    70,
                                    206,
                                    235,
                                    121,
                                    172,
                                    28,
                                    180,
                                    133,
                                    237,
                                    95,
                                    91,
                                    55,
                                    145,
                                    58,
                                    140,
                                    245,
                                    133,
                                    126,
                                    255,
                                    0,
                                    169
                                ];
                            },
                            {
                                kind: "account";
                                path: "inputTokenMint";
                            }
                        ];
                        program: {
                            kind: "const";
                            value: [
                                140,
                                151,
                                37,
                                143,
                                78,
                                36,
                                137,
                                241,
                                187,
                                61,
                                16,
                                41,
                                20,
                                142,
                                13,
                                131,
                                11,
                                90,
                                19,
                                153,
                                218,
                                255,
                                16,
                                132,
                                4,
                                142,
                                123,
                                216,
                                219,
                                233,
                                248,
                                89
                            ];
                        };
                    };
                },
                {
                    name: "userInputHolder";
                    writable: true;
                },
                {
                    name: "tokenProgram";
                    address: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA";
                },
                {
                    name: "associatedTokenProgram";
                    address: "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL";
                },
                {
                    name: "systemProgram";
                    address: "11111111111111111111111111111111";
                },
                {
                    name: "rent";
                    address: "SysvarRent111111111111111111111111111111111";
                }
            ];
            args: [
                {
                    name: "params";
                    type: {
                        defined: {
                            name: "orderParams";
                        };
                    };
                }
            ];
        },
        {
            name: "transferFund";
            discriminator: [104, 35, 18, 77, 186, 252, 139, 236];
            accounts: [
                {
                    name: "admin";
                    signer: true;
                    relations: ["asset"];
                },
                {
                    name: "asset";
                },
                {
                    name: "paymentTokenHolder";
                    writable: true;
                },
                {
                    name: "receiver";
                    writable: true;
                },
                {
                    name: "tokenProgram";
                    address: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA";
                }
            ];
            args: [
                {
                    name: "amount";
                    type: "u64";
                }
            ];
        },
        {
            name: "updateAsset";
            discriminator: [56, 126, 238, 138, 192, 118, 228, 172];
            accounts: [
                {
                    name: "admin";
                    signer: true;
                    relations: ["asset"];
                },
                {
                    name: "asset";
                    writable: true;
                }
            ];
            args: [
                {
                    name: "params";
                    type: {
                        defined: {
                            name: "assetUpdateParams";
                        };
                    };
                }
            ];
        }
    ];
    accounts: [
        {
            name: "asset";
            discriminator: [234, 180, 241, 252, 139, 224, 160, 8];
        },
        {
            name: "counter";
            discriminator: [255, 176, 4, 245, 188, 253, 124, 25];
        },
        {
            name: "order";
            discriminator: [134, 173, 223, 185, 77, 86, 28, 51];
        }
    ];
    errors: [
        {
            code: 6000;
            name: "invalidParams";
            msg: "Invalid params";
        },
        {
            code: 6001;
            name: "invalidExpiration";
            msg: "Invalid expiration";
        },
        {
            code: 6002;
            name: "invalidPrice";
            msg: "Invalid price";
        },
        {
            code: 6003;
            name: "orderExpired";
            msg: "Order expired";
        },
        {
            code: 6004;
            name: "exceedsCeiling";
            msg: "Exceeds ceiling";
        },
        {
            code: 6005;
            name: "invalidSlippage";
            msg: "Invalid slippage";
        },
        {
            code: 6006;
            name: "unauthorized";
            msg: "unauthorized";
        },
        {
            code: 6007;
            name: "programPaused";
            msg: "Program paused";
        },
        {
            code: 6008;
            name: "invalidOrderSize";
            msg: "Invalid order size";
        },
        {
            code: 6009;
            name: "orderAlreadyCanceled";
            msg: "Order already canceled";
        },
        {
            code: 6010;
            name: "orderAlreadyFilled";
            msg: "Order already filled";
        },
        {
            code: 6011;
            name: "orderNotReadyForGc";
            msg: "Order not ready for GC";
        },
        {
            code: 6012;
            name: "unsupportedPriceFeed";
            msg: "Unsupported price feed";
        },
        {
            code: 6013;
            name: "mathOverflow";
            msg: "Math overflow";
        },
        {
            code: 6014;
            name: "priceTooLarge";
            msg: "Price too large";
        }
    ];
    types: [
        {
            name: "asset";
            type: {
                kind: "struct";
                fields: [
                    {
                        name: "nonce";
                        type: {
                            array: ["u8", 32];
                        };
                    },
                    {
                        name: "admin";
                        type: "pubkey";
                    },
                    {
                        name: "bump";
                        type: "u8";
                    },
                    {
                        name: "symbol";
                        type: "string";
                    },
                    {
                        name: "assetTokenMint";
                        type: "pubkey";
                    },
                    {
                        name: "paymentTokenMint";
                        type: "pubkey";
                    },
                    {
                        name: "settler";
                        type: "pubkey";
                    },
                    {
                        name: "priceOracle";
                        type: "pubkey";
                    },
                    {
                        name: "minOrderValue";
                        type: "u64";
                    },
                    {
                        name: "ceiling";
                        type: "u64";
                    },
                    {
                        name: "orderCancelDelay";
                        type: "u32";
                    },
                    {
                        name: "paused";
                        type: "bool";
                    }
                ];
            };
        },
        {
            name: "assetParams";
            type: {
                kind: "struct";
                fields: [
                    {
                        name: "nonce";
                        type: {
                            array: ["u8", 32];
                        };
                    },
                    {
                        name: "symbol";
                        type: "string";
                    },
                    {
                        name: "assetTokenDecimals";
                        type: "u8";
                    },
                    {
                        name: "settler";
                        type: "pubkey";
                    },
                    {
                        name: "priceOracle";
                        type: "pubkey";
                    },
                    {
                        name: "minOrderValue";
                        type: "u64";
                    },
                    {
                        name: "ceiling";
                        type: "u64";
                    },
                    {
                        name: "orderCancelDelay";
                        type: "u32";
                    }
                ];
            };
        },
        {
            name: "assetUpdateParams";
            type: {
                kind: "struct";
                fields: [
                    {
                        name: "settler";
                        type: {
                            option: "pubkey";
                        };
                    },
                    {
                        name: "priceOracle";
                        type: {
                            option: "pubkey";
                        };
                    },
                    {
                        name: "minOrderValue";
                        type: {
                            option: "u64";
                        };
                    },
                    {
                        name: "ceiling";
                        type: {
                            option: "u64";
                        };
                    },
                    {
                        name: "orderCancelDelay";
                        type: {
                            option: "u32";
                        };
                    },
                    {
                        name: "paused";
                        type: {
                            option: "bool";
                        };
                    }
                ];
            };
        },
        {
            name: "counter";
            docs: [
                "Counter is used to track user order count, the count is used to generate order address, this ensure order address always unique"
            ];
            type: {
                kind: "struct";
                fields: [
                    {
                        name: "owner";
                        type: "pubkey";
                    },
                    {
                        name: "count";
                        type: "u64";
                    }
                ];
            };
        },
        {
            name: "order";
            type: {
                kind: "struct";
                fields: [
                    {
                        name: "owner";
                        type: "pubkey";
                    },
                    {
                        name: "count";
                        type: "u64";
                    },
                    {
                        name: "bump";
                        type: "u8";
                    },
                    {
                        name: "createdAt";
                        type: "i64";
                    },
                    {
                        name: "asset";
                        type: "pubkey";
                    },
                    {
                        name: "direction";
                        type: {
                            defined: {
                                name: "orderDirection";
                            };
                        };
                    },
                    {
                        name: "orderType";
                        type: {
                            defined: {
                                name: "orderType";
                            };
                        };
                    },
                    {
                        name: "limitPrice";
                        type: {
                            option: {
                                defined: {
                                    name: "price";
                                };
                            };
                        };
                    },
                    {
                        name: "inputHolder";
                        type: "pubkey";
                    },
                    {
                        name: "quantity";
                        type: "u64";
                    },
                    {
                        name: "slippageBps";
                        type: "u16";
                    },
                    {
                        name: "expireTime";
                        type: "i64";
                    },
                    {
                        name: "canceledAt";
                        type: {
                            option: "i64";
                        };
                    },
                    {
                        name: "filledQty";
                        type: "u64";
                    },
                    {
                        name: "filledOutputQty";
                        type: "u64";
                    },
                    {
                        name: "lastFillAt";
                        type: "u64";
                    }
                ];
            };
        },
        {
            name: "orderDirection";
            type: {
                kind: "enum";
                variants: [
                    {
                        name: "buy";
                    },
                    {
                        name: "sell";
                    }
                ];
            };
        },
        {
            name: "orderParams";
            type: {
                kind: "struct";
                fields: [
                    {
                        name: "direction";
                        type: {
                            defined: {
                                name: "orderDirection";
                            };
                        };
                    },
                    {
                        name: "orderType";
                        type: {
                            defined: {
                                name: "orderType";
                            };
                        };
                    },
                    {
                        name: "limitPrice";
                        type: {
                            option: {
                                defined: {
                                    name: "price";
                                };
                            };
                        };
                    },
                    {
                        name: "quantity";
                        type: "u64";
                    },
                    {
                        name: "slippageBps";
                        type: "u16";
                    },
                    {
                        name: "expireTime";
                        type: "i64";
                    }
                ];
            };
        },
        {
            name: "orderType";
            type: {
                kind: "enum";
                variants: [
                    {
                        name: "market";
                    },
                    {
                        name: "limit";
                    }
                ];
            };
        },
        {
            name: "price";
            type: {
                kind: "struct";
                fields: [
                    {
                        name: "mantissa";
                        type: "u64";
                    },
                    {
                        name: "scale";
                        type: "u8";
                    }
                ];
            };
        }
    ];
};
export declare const GINKO_IDL: Idl;
export declare const SWITCHBOARD_IDL: Idl;
//# sourceMappingURL=idl.d.ts.map