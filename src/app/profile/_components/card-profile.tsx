"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import ButtonLogout from "./button-logOut";
import { usePathname } from "next/navigation";

export default function CardProfile() {
  const { data: session } = useSession();

  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path;
  };

  const sessionName = session?.user?.name ?? "";

  return (
    <div className="h-full">
      <Card className=" flex items-center text-black h-full justify-center">
        <CardContent className="flex flex-col gap-5 ">
          <CardHeader className="flex items-center">
            <Image
              src={"/user.jpg"}
              alt={sessionName}
              width={150}
              height={150}
              sizes="100vh"
            />
            <CardTitle className="flex flex-col gap-1 items-center font-normal py-5">
              <p>Olá</p>
              <span className=" capitalize font-semibold text-nowrap">
                {sessionName}
              </span>
            </CardTitle>
          </CardHeader>
          
            <Link href={"/profile/history"}>
              <Button
                className={`${
                  isActive("/profile/history") === true
                    ? " bg-color-dark hover:bg-none text-white w-full"
                    : "bg-color-primary  hover:bg-color-light w-full"
                }`}
              >
                Meu histórico
              </Button>
            </Link>
       

          {session?.user.role === "company" && (
            <Link href={"/profile/products"}>
              <Button
                className={`${
                  isActive("/profile/products") === true
                    ? " bg-color-dark hover:bg-none text-white w-full"
                    : "bg-color-primary  hover:bg-color-light w-full"
                }`}
              >
                Meus produtos
              </Button>
            </Link>
          )}
          <Link href={"/profile/settings"}>
            <Button
              className={`${
                isActive("/profile/settings") === true
                  ? " bg-color-dark hover:bg-none text-white w-full"
                  : "bg-color-primary  hover:bg-color-light w-full"
              }`}
            >
              Configurações
            </Button>
          </Link>
          <ButtonLogout />
        </CardContent>
      </Card>
    </div>
  );
}
