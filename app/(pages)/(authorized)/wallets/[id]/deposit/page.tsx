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

import { Deposit } from "@/app/containers/Deposit";
import React from "react";

type DepositParams = {
  params: {
    /*
     * Wallet id.
     */
    id: string;
  };
};

export default function DepositPage({ params }: any) {
  const { id }: { id: string } = React.use(params);
  return <Deposit walletId={id} />;
}
