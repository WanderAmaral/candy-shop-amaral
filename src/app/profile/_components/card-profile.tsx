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
  console.log(session?.user.role);

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
            <Button asChild className="bg-color-primary  hover:bg-color-light ">
              <Link href={"/profile/history"}>Histórico de pedidos</Link>
            </Button>
          )}
          {session?.user.role === "company" && (
            <Button asChild className="bg-color-primary  hover:bg-color-light ">
              <Link href={"/profile/products"}>Meus produtos</Link>
            </Button>
          )}

          <Button asChild className="bg-color-primary  hover:bg-color-light " >
            <Link href={"/profile/settings"}>Configurações</Link>
          </Button>
          <ButtonLogout />
        </CardContent>
      </Card>
    </div>
  );
}
