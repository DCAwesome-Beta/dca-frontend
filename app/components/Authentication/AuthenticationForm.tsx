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
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import Button from "@mui/joy/Button";
import { TextField } from "@/app/components/TextField";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/16/solid";
import { IconButton, Typography } from "@mui/joy";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Content } from "..";
import { useLoginMutation, useSignupMutation } from "@/app/axios";
import { useAuthContext } from "../Providers/AuthProvider";

const formSchema = yup.object({
  email: yup
    .string()
    .email("Please enter a valid email.")
    .required("Email required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .required("Password required"),
});

type FormInputs = yup.InferType<typeof formSchema>;

interface AuthenticationFormProps {
  /**
   * Is the form a sign in form
   */
  isSignIn?: boolean;
}

export const AuthenticationForm: React.FC<AuthenticationFormProps> = ({
  isSignIn = true,
}) => {
  const { register, handleSubmit, formState } = useForm<FormInputs>({
    resolver: yupResolver(formSchema),
  });
  const [loading, setLoading] = useState(false);
  const [isMasked, setIsMasked] = useState(true);
  const [formMessage, setFormMessage] = useState<string | undefined>(undefined);
  const [redirect, setRedirect] = useState<boolean>(false);
  const router = useRouter();
  const signup = useSignupMutation();
  const signin = useLoginMutation();
  const {setToken} = useAuthContext();
  useEffect(() => {
    if (redirect) {
      router.push("/wallets");
      setLoading(false);
    }
  }, [redirect, router]);

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    setLoading(true);
    if (!isSignIn) {
      const res = await signup.mutateAsync(data);
      if (res) {
        setToken(res.token)
        return setRedirect(true);
      } else {
        setFormMessage("An error occurred on Sign Up. Please try again.");
      }
      setLoading(false);
    } else {
      const res = await signin.mutateAsync(data);
      
      if (res) {
        setToken(res.token)
        return setRedirect(true);
      } else {
        setFormMessage("Invalid Credentials.");
      }
      setLoading(false);
    }
  };
  return (
    <Content>
      <h1 className='text-center font-bold text-3xl my-2 pt-8'>
        {isSignIn ? "Sign In" : "Sign Up"}
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col'>
        <div className='space-y-4'>
          <TextField
            placeholder='Email'
            type='email'
            className='flex'
            error={!!formState.errors.email?.message}
            helperText={formState.errors.email?.message}
            {...register("email")}
          />
          <TextField
            placeholder='Password'
            type={isMasked ? "password" : "text"}
            className='flex'
            error={!!formState.errors.password?.message}
            helperText={formState.errors.password?.message}
            endDecorator={
              <IconButton onClick={() => setIsMasked((f) => !f)}>
                {isMasked ? <EyeSlashIcon /> : <EyeIcon />}
              </IconButton>
            }
            {...register("password")}
          />
          <Button
            variant='solid'
            className='w-full'
            size='lg'
            type='submit'
            loading={loading}
          >
            {isSignIn ? "Sign In" : "Sign Up"}
          </Button>
          <p className='text-yellow-500'>{formMessage ? formMessage : ""}</p>
        </div>
      </form>

      <Typography className='text-center text-sm font-medium'>
        {isSignIn ? "Don't have an account?" : "Already have an account?"}
      </Typography>

      <Button
        variant='plain'
        className='w-full'
        onClick={
          isSignIn ? () => router.push("/signup") : () => router.push("/signin")
        }
      >
        {!isSignIn ? "Sign In" : "Sign Up"}
      </Button>
    </Content>
  );
};
