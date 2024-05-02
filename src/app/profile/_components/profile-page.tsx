import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const ProfilePage = async () => {
  const session = await getServerSession();

  if (!session) {
    redirect("/");
  }

  return (
    <div className=" bg-color-lightest py-5 px-32 ">
      <Card className=" rounded-md px-10 py-4">
        <CardContent>
          <div className="flex py-5 justify-around">
            <div className="w-[40%]">
              <Card className=" flex items-center justify-center bg-color-lightest">
                <CardContent className="flex flex-col gap-4">
                  <CardHeader>
                    <CardTitle>Olá {session?.user?.name}</CardTitle>
                  </CardHeader>
                  <Button>Configurações</Button>
                  <Button>Deletar conta</Button>
                </CardContent>
              </Card>
            </div>

            <Card className="w-full ml-20">
              <CardContent>
                <CardHeader className="pt-10">
                  <CardTitle>Histórico de pedidos</CardTitle>
                </CardHeader>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfilePage;
