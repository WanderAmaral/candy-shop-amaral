"use client";

import { useSession } from "next-auth/react";
import { redirect, usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

interface AuthenticationGuardProps {
  children: React.ReactNode;
}

const AuthenticationGuard = ({ children }: AuthenticationGuardProps) => {
  const session = useSession();

  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path;
  };

  const url = isActive("/profile/history");

  useEffect(() => {
    if (!session) redirect("/");
  });

  return(
  <>{children}</>);
};

export default AuthenticationGuard;
