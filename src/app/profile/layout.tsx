"use client";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { PropsWithChildren, Suspense } from "react";
import CardProfile from "./_components/card-profile";

const Profile = ({ children }: PropsWithChildren) => {
  return (
    <div className=" bg-color-lightest py-5  container ">
      <Suspense>
        <ProgressBar
          height="4px"
          color="#FFDEAA"
          options={{ showSpinner: false }}
        />
      </Suspense>
      <Card className=" rounded-md px-10 py-4  h-auto">
        <CardContent className="flex py-5 gap-7   h-[550px]">
          <CardProfile />

          <Card className="w-full bg-color-lightest px-5">
            <CardContent>{children}</CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;
