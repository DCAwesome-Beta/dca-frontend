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
import { ethers } from "ethers";

export const calculateSum = (amounts: string[]): string => {
  const finalSum = amounts.reduce((sum, amount) => Number(amount) + sum, 0);
  return String(finalSum);
};

export const cctpChainData = {
  "ETH-SEPOLIA": {
    name: "Ethereum Sepolia",
    chainId: 10002,
    rpc: "https://rpc2.sepolia.org",
    cctpTransferContract: "0x5881772157BbfcCd4921Fc54De405055505BB35E",
    usdc: "0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238"
  },
  "ARB-SEPOLIA": {
    name: "Arbitrum Sepolia",
    chainId: 10003,
    rpc: "https://sepolia-rollup.arbitrum.io/rpc",
    cctpTransferContract: "0x545345799636f78E4fdB44049a4BD78368DBdf59",
    usdc: "0x75faf114eafb1BDbe2F0316DF893fd58CE46AA4d"
  },
  "BASE-SEPOLIA": {
    name: "Base Sepolia",
    chainId: 10004,
    rpc: "https://base-sepolia.blockpi.network/v1/rpc/public",
    cctpTransferContract: "0xC7b3CB66bD715468cE712437f69eAC82fFA1Da86",
    usdc: "0x036CbD53842c5426634e7929541eC2318f3dCF7e"
  },
  "OP-SEPOLIA": {
    name: "Optimism Sepolia",
    chainId: 10005,
    rpc: "https://optimism-sepolia.blockpi.network/v1/rpc/public",
    cctpTransferContract: "0x314b679BbB9a27326B3999e2E32fF1f6D1698176",
    usdc: "0x5fd84259d66Cd46123540766Be93DFE6D43130D7"
  },
  "AVAX-FUJI": {
    name: "Avalanche Fuji",
    chainId: 6,
    rpc: "https://api.avax-test.network/ext/bc/C/rpc",
    cctpTransferContract: "0xc73409F861755e3cf413b010296944535FA62Ef4",
    usdc: "0x5425890298aed601595a70AB815c96711a31Bc65"
  }
};

export const quoteCrossChainDeposit = async (
  sourceChain: keyof typeof cctpChainData,
  targetChain: keyof typeof cctpChainData,
): Promise<string> => {
  const provider = new ethers.JsonRpcProvider(cctpChainData[sourceChain].rpc);
  const abi = [
    "function quoteCrossChainDeposit(uint16 targetChain) view returns (uint256)"
  ];

  const contract = new ethers.Contract(cctpChainData[sourceChain].cctpTransferContract, abi, provider);

  const cost = await contract.quoteCrossChainDeposit(cctpChainData[targetChain].chainId);
  return ethers.formatEther(cost)
}

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