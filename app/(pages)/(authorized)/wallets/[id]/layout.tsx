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
import { CopyButton } from "@/app/components";
import { blockchainMeta, getAddressAbbreviation } from "@/app/shared/utils";
import {
  CircularProgress,
  Dropdown,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  Tooltip,
} from "@mui/joy";
import { useRestorePinMutation, useWallet, useWallets } from "@/app/axios";
import Image from "next/image";
import {
  ArrowRightStartOnRectangleIcon,
  Cog6ToothIcon,
  EllipsisVerticalIcon,
  PlusIcon,
  QuestionMarkCircleIcon,
} from "@heroicons/react/16/solid";
import { useRouter } from "next/navigation";
import { blockchainNames } from "@/app/shared/types";
import { useAuthContext } from "@/app/components/Providers/AuthProvider";
import React from "react";

type WalletLayoutParams = {
  /*
   * Wallet id.
   */
  id: string;
};

export default function WalletLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: any;
}) {
  const router = useRouter();
  const { id }: WalletLayoutParams = React.use(params);
  const { data: wallet } = useWallet(id);
  const { data: wallets } = useWallets();
  const restorePin = useRestorePinMutation();
  const { signout } = useAuthContext();

  const blockchainInfo = blockchainMeta(wallet?.data.wallet.blockchain);
  const walletAddress = wallet?.data.wallet.address ?? "";

  const handleSignOut = () => {
    signout();
  }

  return (
    <>
      {/* Wallet Address */}
      <div className='flex p-5 justify-between items-center relative gap-x-4'>
        <Tooltip title={blockchainInfo.testnet} placement='bottom-start'>
          <IconButton>
            {blockchainInfo.svg ? (
              <Image
                alt='blockchain'
                src={blockchainInfo.svg}
                width={20}
                height={20}
              />
            ) : (
              <QuestionMarkCircleIcon width={20} className='text-gray-400' />
            )}
          </IconButton>
        </Tooltip>

        <CopyButton
          copyValue={walletAddress}
          copyLabel={getAddressAbbreviation(walletAddress)}
        />

        <Dropdown>
          <MenuButton
            disabled={restorePin.isLoading}
            variant='plain'
            className='px-2 text-slate-600 hover:bg-gray-600'
          >
            {restorePin.isLoading ? (
              <CircularProgress color='neutral' />
            ) : (
              <EllipsisVerticalIcon className='text-slate-600' height={20} />
            )}
          </MenuButton>
          <Menu placement='bottom-end' size='sm' 
          sx={{ 
            bgcolor: '#000', // Set the background color
            '& .MuiMenuItem-root': {
              color: 'white', // Set text color for menu items
              '&:hover': {
                bgcolor: 'rgba(255, 255, 255, 0.2)', // Optional hover effect
                color: 'white'
              },
            },
          }}>
            {wallets?.data.wallets.filter(wallet => blockchainNames[wallet.blockchain]).map((wallet) => {
              // hide currently selected wallet
              if (wallet.id === id) return null;
              return (
                <MenuItem
                  key={wallet.id}
                  onClick={() => {
                    router.push(`/wallets/${wallet.id}`);
                  }}
                >
                  <Image
                    src={blockchainMeta(wallet.blockchain).svg}
                    alt={`${wallet.blockchain}-icon`}
                    width={16}
                    height={16}
                  />{" "}
                  {blockchainNames[wallet.blockchain]}
                </MenuItem>
              );
            })}
            <MenuItem
              onClick={() => {
                router.push("/wallets/create");
              }}
              sx={{ color: 'white' }}
            >
              <PlusIcon width={16}/> Create new wallet
            </MenuItem>
            <MenuItem onClick={handleSignOut} sx={{ color: 'white' }}>
              <ArrowRightStartOnRectangleIcon width={16} />
              Sign out
            </MenuItem>
          </Menu>
        </Dropdown>
      </div>
      {children}
    </>
  );
}
