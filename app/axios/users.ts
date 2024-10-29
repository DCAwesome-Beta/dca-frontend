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
import { axios } from "@/app/axios";
import { useMutation } from "react-query";

export const restorePinHelper = async () => {
  const response = await axios.post<{ challengeId: string }>(
    "/users/pin/restore",
  );

  return response.data.challengeId;
};

export const useRestorePinMutation = () => {
  return useMutation({
    mutationKey: ["restorePin"],
    mutationFn: () => restorePinHelper(),
  });
};

export const loginHelper = async (input: {email: string, password: string}) => {
  const response = await axios.post<{ email: string, token: string }>(
    "/signin",
    { email: input.email, password: input.password }
  );
  localStorage.setItem("token", response.data.token);
  return response.data;
}

export const useLoginMutation = () => {
  return useMutation(loginHelper);
}

export const signupHelper = async (input: {email: string, password: string}) => {
  try {
    const response = await axios.post<{ email: string, token: string }>(
      "/signup",
      { email: input.email, password: input.password }
    );
    localStorage.setItem("token", response.data.token);

    return response.data;
  } catch (error: any) {
    return error.message;
  
  }
}

export const useSignupMutation = () => {
  return useMutation(signupHelper);
}