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

import {
  BackButton,
  Content,
  CopyButton,
  useSendTokenContext,
} from "@/app/components";
import Image from "next/image";
import {
  calculateEstimatedFee,
  roundNum,
  tokenHelper,
} from "@/app/shared/utils";
import { Button, Chip } from "@mui/joy";
import { useCreateTransferMutation, useScreenAddressMutation } from "@/app/axios";
import { BlockchainEnum, blockchainNames } from "@/app/shared/types";
import { TextField } from "@/app/components/TextField";
import { useEffect, useState } from "react";
import { PaperAirplaneIcon } from "@heroicons/react/16/solid";

export const SendTokenConfirm = () => {
  const { tokenName, walletId, setStep, tokenAndRecipient, estimatedFee } =
    useSendTokenContext();
  const [loading, setLoading] = useState(false);
  const [risk, setRisk] = useState("");
  const transferMutation = useCreateTransferMutation();
  const screeningMutation = useScreenAddressMutation();

  const imageSymbol = tokenHelper(tokenName);

  useEffect(() => {
    const fetchRisk = async () => {
      setLoading(true);
      const response = await screeningMutation.mutateAsync({
        address: tokenAndRecipient.address,
        chain: tokenAndRecipient.network as any,
      });
      if (response.data.decision.reasons) {
        setRisk(response.data.decision.reasons[0].riskScore);
      } else {
        setRisk("LOW");
      }
      setLoading(false)
    };
    fetchRisk()
  }, [])

  const handleSubmit = async () => {
    setLoading(true);
    try {

      await transferMutation.mutateAsync({
        destinationAddress: tokenAndRecipient.address,
        tokenId: tokenAndRecipient.tokenId,
        walletId,
        amount: tokenAndRecipient.amount,
        feeLevel: "LOW",
      });
      setStep(3);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  return (
    <>
      <Content>
        <nav>
          <BackButton onClick={() => setStep(1)}>Summary</BackButton>
        </nav>

        <div className='flex flex-col items-center mb-4'>
          <Image
            className='mb-4'
            src={imageSymbol.svg}
            width={80}
            height={80}
            alt='coin alt'
          />

          <span className='text-3xl text-center font-semibold max-w-80'>
            {tokenAndRecipient.amount} {imageSymbol.symbol}
          </span>
          {(risk === "HIGH" || risk === "SEVERE") && (
            <span className="text-md text-center font-bold text-red-500	">
              This transaction has been flagged as {risk} risk. <br/> Please proceed carefully.
            </span>
          )}
        </div>

        {/* Some table here for the amounts */}
        <div className='grow flex flex-col gap-y-2'>
          <TextField
            value={tokenAndRecipient.address}
            label='To'
            endDecorator={<CopyButton copyValue={tokenAndRecipient.address} />}
            readOnly
          />
          <TextField
            value={blockchainNames[tokenAndRecipient.network as BlockchainEnum]}
            label='Network'
            readOnly
          />
          <TextField
            readOnly
            startDecorator={
              <Chip color='success' size='md' variant='solid'>
                Paid By Circle
              </Chip>
            }
            label='Estimated Gas Fee'
            value={`${roundNum(String(calculateEstimatedFee(estimatedFee)), 8)} ${tokenAndRecipient.network}`}
          />
        </div>

        <Button
          className='w-full'
          variant='solid'
          onClick={handleSubmit}
          loading={loading}
          endDecorator={<PaperAirplaneIcon width={16} />}
        >
          Send
        </Button>
      </Content>
    </>
  );
};
