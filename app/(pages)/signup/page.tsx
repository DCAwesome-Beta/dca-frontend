"use client";
import { redirect } from "next/navigation";
import { AuthenticationForm } from "@/app/components";
import { useAuthContext } from "@/app/components/Providers/AuthProvider";
import { useEffect } from "react";

export default function SignupPage() {
  const {token} = useAuthContext();
  useEffect(() => {
    if (token) {
      redirect("/wallets");
    }
  }, [token]);
  return <AuthenticationForm isSignIn={false} />;
}
