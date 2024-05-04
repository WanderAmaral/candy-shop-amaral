import { getServerSession } from "next-auth";
import Auth from "./_components/auth-page";
import { redirect } from "next/navigation";

const AuthPage = async () => {
  const session = await getServerSession();

  if (session) {
    redirect("/");
  }

  return <Auth />;
};

export default AuthPage;
