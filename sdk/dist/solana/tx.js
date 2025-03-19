"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.confirmTransaction = exports.solBuildTx = void 0;
const web3_js_1 = require("@solana/web3.js");
const on_demand_1 = require("@switchboard-xyz/on-demand");
async function solBuildTx(conn, payerPublicKey, ixs, simulate = false) {
    const latestBlockhash = await conn.getLatestBlockhash();
    const messageV0 = new web3_js_1.TransactionMessage({
        payerKey: payerPublicKey,
        recentBlockhash: latestBlockhash.blockhash,
        instructions: ixs,
    }).compileToV0Message();
    const versionedTx = new web3_js_1.VersionedTransaction(messageV0);
    if (simulate) {
        const sim = await conn.simulateTransaction(versionedTx);
        const logs = sim.value.logs?.join("\n");
        console.log("logs", logs);
        if (sim.value.err) {
            // extract the error message from the logs
            const error = logs?.match(/Error: (.*)/)?.[1];
            throw new Error(error ?? logs);
        }
    }
    return { versionedTx, lastValidHeight: latestBlockhash.lastValidBlockHeight };
}
exports.solBuildTx = solBuildTx;
const confirmTransaction = async (conn, lastValidHeight, txId) => {
    let hashExpired = false;
    let txSuccess = false;
    const START_TIME = new Date();
    while (!hashExpired && !txSuccess) {
        const { value: statuses } = await conn.getSignatureStatuses([txId]);
        if (!statuses || statuses.length === 0) {
            throw new Error("Failed to get signature status");
        }
        const status = statuses[0];
        if (status?.err) {
            throw new Error(`Transaction failed: ${status?.err}`);
        }
        // Break loop if transaction has succeeded
        if (status &&
            (status.confirmationStatus === "confirmed" ||
                status.confirmationStatus === "finalized")) {
            txSuccess = true;
            const endTime = new Date();
            const elapsed = (endTime.getTime() - START_TIME.getTime()) / 1000;
            console.log(`Transaction Success. Elapsed time: ${elapsed} seconds.`);
            console.log(`https://explorer.solana.com/tx/${txId}`);
            break;
        }
        hashExpired = await isBlockhashExpired(conn, lastValidHeight);
        // Break loop if blockhash has expired
        if (hashExpired) {
            const endTime = new Date();
            const elapsed = (endTime.getTime() - START_TIME.getTime()) / 1000;
            console.log(`Blockhash has expired. Elapsed time: ${elapsed} seconds.`);
            // (add your own logic to Fetch a new blockhash and resend the transaction or throw an error)
            break;
        }
        await (0, on_demand_1.sleep)(300);
    }
    if (!txSuccess) {
        throw new Error("Transaction failed, try to send it again");
    }
    return txId;
};
exports.confirmTransaction = confirmTransaction;
async function isBlockhashExpired(connection, lastValidBlockHeight) {
    const currentBlockHeight = await connection.getBlockHeight("finalized");
    // console.log('                           ');
    // console.log('Current Block height:             ', currentBlockHeight);
    // console.log(
    //   'Last Valid Block height - 150:     ',
    //   lastValidBlockHeight - 150
    // );
    // console.log('--------------------------------------------');
    // console.log(
    //   'Difference:                      ',
    //   currentBlockHeight - (lastValidBlockHeight - 150)
    // ); // If Difference is positive, blockhash has expired.
    // console.log('                           ');
    return currentBlockHeight > lastValidBlockHeight - 150;
}
