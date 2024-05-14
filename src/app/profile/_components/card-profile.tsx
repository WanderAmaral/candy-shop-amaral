"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

export default function CardProfile() {
  const { data: session } = useSession();

  const handleClickSigout = () => {
    signOut();
  };

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
              <span className=" capitalize font-semibold">{sessionName}</span>
            </CardTitle>
          </CardHeader>
          {session?.user.role === "client" && (
            <Button asChild>
              <Link href={"/profile/history"}>Histórico de pedidos</Link>
            </Button>
          )}
          {session?.user.role === "company" && (
            <Button asChild>
              <Link href={"/profile/products"}>Meus produtos</Link>
            </Button>
          )}
          <Button asChild>
            <Link href={"/profile/settings"}>Configurações</Link>
          </Button>
          <Button onClick={handleClickSigout}>Sair</Button>
        </CardContent>
      </Card>
    </div>
  );
}
