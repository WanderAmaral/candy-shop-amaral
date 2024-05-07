import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getServerSession } from "next-auth";
import Image from "next/image";
import Link from "next/link";

export default async function CardProfile() {
  const session = await getServerSession();

  const sessionName = session?.user?.name ?? "";

  return (
    <div className="text-black">
      <Card className=" flex items-center justify-center ">
        <CardContent className="flex flex-col gap-4">
          <CardHeader className="flex items-center gap-5">
            <Image
              src={"/user.jpg"}
              alt={sessionName}
              width={150}
              height={150}
              sizes="100vh"
            />
            <CardTitle className="flex text-wrap font-normal">
              Olá {sessionName}
            </CardTitle>
          </CardHeader>
          <Button asChild>
            <Link href={"/profile/history"}>Histórico de pedidos</Link>
          </Button>
          <Button asChild>
            <Link href={"/profile/products"}>Meus produtos</Link>
          </Button>
          <Button asChild>
            <Link href={"/profile/settings"}>Configurações</Link>
          </Button>
          <Button asChild>
            <Link href={"/profile/about"}>Deletar conta</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
