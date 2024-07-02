"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import ButtonLogout from "./button-logOut";

export default function CardProfile() {
  const { data: session } = useSession();

  const sessionName = session?.user?.name ?? "";

  return (
    <div className="h-full">
      <Card className=" flex items-center justify-between text-black h-full">
        <CardContent className="flex flex-col gap-5">
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
          {session?.user.role === "client" && (
            <Link href={"/profile/history"}>
              <Button className="bg-color-primary  hover:bg-color-light w-full">
                Histórico de pedidos
              </Button>
            </Link>
          )}
          {session?.user.role === "company" && (
            <Link href={"/profile/products"}>
              <Button className="bg-color-primary  hover:bg-color-light w-full">
                Meus produtos
              </Button>
            </Link>
          )}

          <Link href={"/profile/settings"}>
            <Button className="bg-color-primary  hover:bg-color-light w-full">
              Configurações
            </Button>
          </Link>
          <ButtonLogout />
        </CardContent>
      </Card>
    </div>
  );
}
