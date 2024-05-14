import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { PropsWithChildren } from "react";
import CardProfile from "./_components/card-profile";

const Profile = async ({ children }: PropsWithChildren) => {
  const session = await getServerSession();

  // if (!session) {
  //   redirect("/auth");
  // }
  return (
    <div className=" bg-color-lightest py-5  container">
      <Card className=" rounded-md px-10 py-4">
        <CardContent className="flex py-5 gap-7 h-full">
          <div>
            <CardProfile />
          </div>

          <Card className="w-full bg-color-lightest px-5">
            <CardContent>{children}</CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;
