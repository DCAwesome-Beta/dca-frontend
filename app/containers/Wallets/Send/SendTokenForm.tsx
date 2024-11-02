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

"use client";
import { cctpChainData, quoteCrossChainDeposit, tokenHelper } from "@/app/shared/utils";
import Image from "next/image";
import { useForm } from "react-hook-form";
import {
  BackButton,
  Content,
  LoadingWrapper,
  useSendTokenContext,
  TextField,
} from "@/app/components";
import {
  useCreateContractTransactionMutation,
  useEstimateContractFeesMutation,
  useEstimateFeeMutation,
  useValidateAddressMutation,
} from "@/app/axios/transactions";
import { useRouter } from "next/navigation";
import { useWallet, useWalletBalances } from "@/app/axios";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Option, Select, Typography } from "@mui/joy";
import { useState } from "react";
import { ethers } from "ethers";

export const SendTokenForm = () => {
  const {
    tokenName,
    walletId,
    tokenAndRecipient,
    setTokenAndRecipient,
    setStep,
    setEstimatedFee,
    setChain,
    setQuote,
    chain
  } = useSendTokenContext();
  const imageSymbol = tokenHelper(tokenName);
  const router = useRouter();
  const { data: wallet } = useWallet(walletId);
  const estimateFeeMutation = useEstimateFeeMutation();
  const estimateContractFeeMutation =  useEstimateContractFeesMutation();
  const contractMutation = useCreateContractTransactionMutation();
  const { data: tokenBalanceData, isLoading } = useWalletBalances(walletId, {
    name: tokenName,
  });

  const token = tokenBalanceData?.data.tokenBalances[0];

  const FormInputs = yup.object().shape({
    address: yup.string().required("Wallet Address required"),
    amount: yup
      .string()
      .test("Check positive nonzero integer", function (val, ctx) {
        if (val) {
          const num = parseFloat(val);
          return num > 0
            ? true
            : ctx.createError({
                message: "Enter a number that is larger than zero",
              });
        } else {
          return true;
        }
      })
      .test("Check less than the wallet balance", function (val, ctx) {
        if (val && token) {
          const num = parseFloat(val);
          return num <= parseFloat(token.amount)
            ? true
            : ctx.createError({
                message: "Cannot send more than the wallet balance",
              });
        } else {
          return true;
        }
      })
      .required("Amount required"),
  });

  type FormInputSchema = yup.InferType<typeof FormInputs>;

  const { register, handleSubmit, setValue, formState, setError, watch } =
    useForm<FormInputSchema>({
      resolver: yupResolver(FormInputs),
      defaultValues: {
        amount: tokenAndRecipient.amount,
        address: tokenAndRecipient.address,
      },
    });

  const validateAddressMutation = useValidateAddressMutation();

  const submitHandler = async (data: FormInputSchema) => {
    const resp = await validateAddressMutation.mutateAsync({
      address: data.address,
      blockchain: token?.token.blockchain ?? "",
    });

    if (resp.isValid === false) {
      setError("address", {
        message: "The address you entered is invalid. Please double-check it.",
      });
      return;
    }
    const tokenId = token?.token.id ?? "";

   
    if (chain && chain !== wallet?.data.wallet.blockchain) {
      console.log("here")
      const chainData = cctpChainData[token?.token.blockchain as "ETH-SEPOLIA" | "AVAX-FUJI" | "ARB-SEPOLIA" | "BASE-SEPOLIA" | "OP-SEPOLIA" ?? ""];
      const destChainData = cctpChainData[chain as "ETH-SEPOLIA" | "AVAX-FUJI" | "ARB-SEPOLIA" | "BASE-SEPOLIA" | "OP-SEPOLIA" ?? ""];
      const quote = await quoteCrossChainDeposit(token?.token.blockchain as "ETH-SEPOLIA" | "AVAX-FUJI" | "ARB-SEPOLIA" | "BASE-SEPOLIA" | "OP-SEPOLIA" ?? "", chain as "ETH-SEPOLIA" | "AVAX-FUJI" | "ARB-SEPOLIA" | "BASE-SEPOLIA" | "OP-SEPOLIA" ?? "")
      setQuote(quote);
      await contractMutation.mutateAsync({
        contractAddress: chainData.usdc,
        walletId: walletId,
        abiFunctionSignature: "approve(address,uint256)",
        abiParameters: [chainData.cctpTransferContract, ethers.parseUnits(data.amount, 6).toString()],
        feeLevel: "LOW",
        amount: undefined
      })
    } else {
      const estimatedFee = await estimateFeeMutation.mutateAsync({
        destinationAddress: data.address,
        tokenId: tokenId,
        walletId,
        amount: [data.amount],
      });
      setEstimatedFee(estimatedFee.low);

    }

    setTokenAndRecipient({
      network: token?.token.blockchain ?? "",
      tokenId: tokenId,
      ...data,
    });
    setStep(2);
  };

  const supportedChains = ["ARB-SEPOLIA", "AVAX-FUJI", "BASE-SEPOLIA", "ETH-SEPOLIA", "OP-SEPOLIA"];

  return (
    <LoadingWrapper isLoading={isLoading}>
      <form
        onSubmit={handleSubmit(submitHandler)}
        className="h-full flex flex-col"
      >
        <div className="grow">
          <Content>
            <nav>
              <BackButton onClick={router.back}>
                Send {token?.token.symbol}
              </BackButton>
            </nav>
            <div className="grow flex flex-col items-center gap-y-4 p-2">
              <Image
                alt="token icon"
                height={80}
                width={80}
                src={imageSymbol.svg}
              />

              <Typography level="body-lg" fontWeight={500}>
                {token?.amount} {token?.token.symbol} available
              </Typography>
              {(chain && chain !== wallet?.data.wallet.blockchain) && (
                <span className="text-sm text-center font-bold text-red-500	">
                  Cross Chain Transactions may take 15-30 minutes to complete
                </span>

              )}

              {token?.token.symbol === "USDC" && 
                supportedChains.includes(wallet?.data.wallet.blockchain || "") && (
                  <Select
                    onChange={(
                      event: React.SyntheticEvent | null,
                      newValue: string | null,
                    ) => {
                      if (newValue) {
                        setChain(newValue as string);
                      }
                    }
                  }
                    placeholder="Select Destination Chain"
                    className="w-full"
                  >
                    <Option value="ARB-SEPOLIA">Arbitrum Sepolia Testnet</Option>
                    <Option value="AVAX-FUJI">Avalanche testnet fuji</Option>
                    <Option value="BASE-SEPOLIA">Base Sepolia Testnet</Option>
                    <Option value="ETH-SEPOLIA">Ethereum Sepolia Testnet</Option>
                    <Option value="OP-SEPOLIA">Optimism Sepolia Testnet</Option>
                  </Select>
                )}
              <TextField
                {...register("address")}
                className="w-full"
                error={!!formState.errors.address?.message}
                helperText={formState.errors.address?.message}
                placeholder="Recipient Address"
              />
              <TextField
                {...register("amount")}
                error={!!formState.errors.amount?.message}
                placeholder="Amount"
                endDecorator={
                  <Button
                    size="sm"
                    onClick={() => {
                      setValue("amount", token?.amount ?? "");
                    }}
                  >
                    Max
                  </Button>
                }
                helperText={formState.errors.amount?.message}
              />
            </div>
            <Button
              loading={formState.isSubmitting}
              disabled={token?.amount === "0"}
              type="submit"
            >
              Next
            </Button>
          </Content>
        </div>
      </form>
    </LoadingWrapper>
  );
};
