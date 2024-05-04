import { getServerSession } from "next-auth";
import CreateAcount from "./_components/create-account";
import { redirect } from "next/navigation";

const RegisterAuth = async () => {
  const session = await getServerSession();

  if (session) {
    redirect("/");
  }
  return <CreateAcount />;
};

export default RegisterAuth;
