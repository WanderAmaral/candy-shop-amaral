"use client";
import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";
import UserContextProvider from "../_contexts/user/user.context";

const AuthProvider = ({ children }: { children: ReactNode }) => {
  return (
    <SessionProvider>
      <UserContextProvider>{children}</UserContextProvider>
    </SessionProvider>
  );
};

export default AuthProvider;
