import {
  Connection,
  Keypair,
  LAMPORTS_PER_SOL,
  PublicKey,
} from "@solana/web3.js";
import { WalletBalance } from "../types";
import { logError } from "./logger";
import { decode } from "bs58";

/**
 * Create a Keypair from a private key string
 * @param privateKeyString Private key as string (base58 encoded)
 * @returns Keypair
 */
export const createKeypairFromPrivateKey = (
  privateKeyString: string
): Keypair => {
  try {
    // Decode base58 private key to Uint8Array
    const privateKey = decode(privateKeyString);
    return Keypair.fromSecretKey(privateKey);
  } catch (error) {
    logError("Invalid private key", { error });
    throw new Error("Failed to create keypair from private key");
  }
};

/**
 * Get wallet balance in SOL
 * @param connection Solana connection
 * @param publicKey Wallet public key
 * @returns Wallet balance in SOL
 */
export const getWalletBalanceInSol = async (
  connection: Connection,
  publicKey: PublicKey
): Promise<number> => {
  try {
    const balance = await connection.getBalance(publicKey);
    return balance / LAMPORTS_PER_SOL;
  } catch (error) {
    logError("Failed to get wallet balance", {
      error,
      publicKey: publicKey.toBase58(),
    });
    throw new Error("Failed to get wallet balance");
  }
};

/**
 * Check if wallet has sufficient funds for a transaction
 * @param connection Solana connection
 * @param publicKey Wallet public key
 * @param requiredAmount Required amount in SOL
 * @returns Object with balance info and sufficient funds flag
 */
export const checkWalletBalance = async (
  connection: Connection,
  publicKey: PublicKey,
  requiredAmount: number
): Promise<WalletBalance> => {
  try {
    const balance = await getWalletBalanceInSol(connection, publicKey);
    // We need to leave some SOL for transaction fees (0.001 SOL is a safe amount)
    const sufficientFunds = balance >= requiredAmount + 0.001;

    return {
      publicKey,
      balance,
      sufficientFunds,
    };
  } catch (error) {
    logError("Failed to check wallet balance", {
      error,
      publicKey: publicKey.toBase58(),
    });
    throw new Error("Failed to check wallet balance");
  }
};
