/// <reference types="bn.js" />
import { BN } from "@coral-xyz/anchor";
import { Mint } from "@solana/spl-token";
import { Connection, PublicKey, Commitment, TransactionInstruction } from "@solana/web3.js";
export type MintAccount = Mint;
export declare function getTokenMintInfo(connection: Connection, mint: PublicKey): Promise<MintAccount>;
export declare function getTokenAccountBalance(connection: Connection, owner: PublicKey, mint: PublicKey, decimals?: number): Promise<number>;
export declare function solGetAssociatedTokenAccountAddress(connection: Connection, mint: PublicKey, owner: PublicKey, allowOwnerOffCurve?: boolean, commitment?: Commitment, programId?: PublicKey, associatedTokenProgramId?: PublicKey): Promise<PublicKey>;
export declare function solGetOrCreateAssociatedTokenAccountIx(connection: Connection, payerPublicKey: PublicKey, mint: PublicKey, owner: PublicKey, allowOwnerOffCurve?: boolean, commitment?: Commitment, programId?: PublicKey, associatedTokenProgramId?: PublicKey): Promise<[TransactionInstruction[], PublicKey]>;
export declare function toUINumber(num: BN, decimals: number): number;
export declare function fromUINumber(num: number, decimals: number): BN;
//# sourceMappingURL=token.d.ts.map