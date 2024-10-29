"use client";

import { AuthenticationForm } from "@/app/components";
import { useAuthContext } from "@/app/components/Providers/AuthProvider";
import { redirect } from "next/navigation";
import { useEffect } from "react";

export default function SigninPage() {
  const {token} = useAuthContext();
  useEffect(() => {
    if (token) {
      redirect("/wallets");
    }
  }, [token]);
  return <AuthenticationForm />;
}
