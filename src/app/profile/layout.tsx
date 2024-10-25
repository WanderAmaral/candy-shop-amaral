"use client";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";
import { Card, CardContent } from "@/components/ui/card";
import { PropsWithChildren, Suspense } from "react";
import CardProfile from "./_components/card-profile";
import AuthenticationGuard from "./authentication/authentication";

const Profile = ({ children }: PropsWithChildren) => {
  return (
    <AuthenticationGuard>
      <div className="bg-color-lightest py-5 container mx-auto px-4 md:px-0">
        <Suspense>
          <ProgressBar
            height="4px"
            color="#FFDEAA"
            options={{ showSpinner: false }}
          />
        </Suspense>
        <Card className="rounded-md px-4 py-4 h-auto">
          <CardContent className="flex flex-col md:flex-row py-5 gap-5 h-auto md:h-[550px]">
            <CardProfile />

            <Card className="w-full bg-color-lightest px-4">
              <CardContent>{children}</CardContent>
            </Card>
          </CardContent>
        </Card>
      </div>
    </AuthenticationGuard>
  );
};

export default Profile;
