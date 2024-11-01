// Copyright (c) 2024, Circle Technologies, LLC. All rights reserved.
//
// SPDX-License-Identifier: Apache-2.0
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import { axios } from "@/app/axios";
import {
  GasFeeObject,
  Transaction,
  TransactionStateEnum,
  TransactionTypeEnum,
} from "./types";

export const calculateSum = (amounts: string[]): string => {
  const finalSum = amounts.reduce((sum, amount) => Number(amount) + sum, 0);
  return String(finalSum);
};

export const roundNum = (num: string, decimals: number): string => {
  return Number(num).toFixed(decimals);
};

export const formatDate = (date: Date): string => {
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
};

export const findChipColor = (state: TransactionStateEnum) => {
  switch (state) {
    case TransactionStateEnum.INITIATED:
      return "primary";
    case TransactionStateEnum.PENDING_RISK_SCREENING:
      return "primary";
    case TransactionStateEnum.DENIED:
      return "neutral";
    case TransactionStateEnum.QUEUED:
      return "primary";
    case TransactionStateEnum.SENT:
      return "primary";
    case TransactionStateEnum.CONFIRMED:
      return "primary";
    case TransactionStateEnum.COMPLETE:
      return "success";
    case TransactionStateEnum.FAILED:
      return "danger";
    case TransactionStateEnum.CANCELLED:
      return "neutral";
  }
};

export const getAddressAbbreviation = (address: string) => {
  return address.slice(0, 6) + "..." + address.slice(-6);
};

export const calculateEstimatedFee = (estimatedFee: GasFeeObject): number => {
  return (
    (parseFloat(estimatedFee.maxFee ? estimatedFee.maxFee : "0") +
      parseFloat(estimatedFee.priorityFee)) *
    parseFloat(estimatedFee.gasLimit) *
    10 ** -9
  );
};

// only testnet blockchains.
export const blockchainMeta = (blockchain: string | undefined) => {
  switch (blockchain) {
    case "MATIC-AMOY":
      return {
        svg: `/Matic.svg`,
        testnet: "Matic Amoy Testnet",
        nativeTokenName: "AmoyMATIC",
      };
    case "ETH-SEPOLIA":
      return {
        svg: `/Eth.svg`,
        testnet: "Ethereum Sepolia Testnet",
        nativeTokenName: "SepoliaETH",
      };
    case "AVAX-FUJI":
      return {
        svg: `/Avax.svg`,
        testnet: "Avalanche Fuji Testnet",
        nativeTokenName: "FujiAVAX",
      };

    case "SOL-DEVNET":
      return {
        svg: `/Solana.svg`,
        testnet: "Solana Devnet",
        nativeTokenName: "DevnetSOL",
      };
    case "NEAR-TESTNET":
      return {
        svg: `/Near.svg`,
        testnet: "NEAR Testnet",
        nativeTokenName: "NEAR",
      };
    case "ARB-SEPOLIA":
      return {
        svg: `/Arbitrum.svg`,
        testnet: "Arbitrum Sepolia Testnet",
        nativeTokenName: "SepoliaETH",
      };
    default:
      return {
        svg: "",
        testnet: "",
        nativeTokenName: "",
      };
  }
};

export const tokenHelper = (tokenName: string | undefined) => {
  switch (tokenName) {
    case "Ethereum-Sepolia":
      return {
        svg: `/Eth.svg`,
        symbol: "ETH-SEPOLIA",
        name: "SepoliaETH",
      };
    case "Polygon-Amoy":
      return {
        svg: `/Matic.svg`,
        symbol: "MATIC-AMOY",
        name: "AmoyMATIC",
      };
    case "Avalanche-Fuji":
      return {
        svg: `/Avax.svg`,
        symbol: "AVAX-FUJI",
        name: "FujiAVAX",
      };
    case "Solana-Devnet":
      return {
        svg: `/Solana.svg`,
        symbol: "SOL-DEVNET",
        name: "DevnetSOL",
      };
    case "USD Coin":
    case "USDC":
      return {
        svg: `/USDC.svg`,
        symbol: "USDC",
        name: "USDC",
      };
    default:
      return {
        svg: "",
        symbol: "",
      };
  }
};

export const getTransactionOperation = (
  walletAddress: string,
  transaction?: Transaction,
) => {
  const isSend =
    transaction?.sourceAddress === walletAddress &&
    transaction?.transactionType === TransactionTypeEnum.OUTBOUND;
  const operation = isSend ? "Sent" : "Deposited";
  const operator = isSend ? "-" : "+";

  return { operation, operator };
};

// export const validOnboardStatus = async (
//   session: Session,
// ): Promise<boolean> => {
//   try {
//     const response = await axios.get<{
//       user: {
//         securityQuestionStatus: string;
//         pinStatus: string;
//       };
//     }>(`/users/${session.user.userId}`);

//     if (
//       response?.data?.user.pinStatus == "ENABLED" &&
//       response?.data?.user.securityQuestionStatus == "ENABLED"
//     ) {
//       return true;
//     }
//     return false;
//   } catch (error) {
//     return false;
//   }
// };