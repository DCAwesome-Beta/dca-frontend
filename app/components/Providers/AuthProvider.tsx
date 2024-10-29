"use client";
import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext<{
    token: string | null;
    setToken: (f: string) => void;
    signout: () => void;
  }>({
    token: "",
    setToken: () => {},
    signout: () => {},
  });
  
  export const useAuthContext = () => useContext(AuthContext);
  
  export const AuthProvider = ({
    children
  }: {
    children: React.ReactNode;
  }) => {
    const [token, setToken] = useState<string | null>(null);
  
    useEffect(() => {
        const localToken = localStorage.getItem("token");
        if (localToken) setToken(localToken);
    }, [])

    useEffect(() => {
      if (token) {
        const payload = JSON.parse(atob(token.split('.')[1]));
      
        const currentTime = Math.floor(Date.now() / 1000);
        if (payload.exp < currentTime) {
          localStorage.removeItem("token");
          setToken(null)
        };
      };
  }, [token])

  const signout = () => {
    localStorage.removeItem("token");
    setToken(null);
  }

    return (
      <AuthContext.Provider
        value={{
          token,
          setToken,
          signout
        }}
      >
        {children}
      </AuthContext.Provider>
    );
  };
  