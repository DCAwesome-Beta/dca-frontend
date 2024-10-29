"use client";
import { useAuthContext } from "@/app/components/Providers/AuthProvider";
import { redirect } from "next/navigation";
import { useEffect } from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const {token} = useAuthContext();
  useEffect(() => {
    if (!token) {
      redirect("/signup");
    }
  }, [token]);

  return <>{children}</>;
}
