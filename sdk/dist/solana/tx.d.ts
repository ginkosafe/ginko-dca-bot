import { Connection, PublicKey, TransactionInstruction, VersionedTransaction } from "@solana/web3.js";
export declare function solBuildTx(conn: Connection, payerPublicKey: PublicKey, ixs: TransactionInstruction[], simulate?: boolean): Promise<{
    lastValidHeight: number;
    versionedTx: VersionedTransaction;
}>;
export declare const confirmTransaction: (conn: Connection, lastValidHeight: number, txId: string) => Promise<string>;
//# sourceMappingURL=tx.d.ts.map