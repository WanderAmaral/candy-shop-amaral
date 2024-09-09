"use client";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";
import { Card, CardContent } from "@/components/ui/card";
import { PropsWithChildren, Suspense } from "react";
import CardProfile from "./_components/card-profile";
import AuthenticationGuard from "./authentication/authentication";

const Profile = ({ children }: PropsWithChildren) => {
  return (
    <AuthenticationGuard>
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
    </AuthenticationGuard>
  );
};

export default Profile;
