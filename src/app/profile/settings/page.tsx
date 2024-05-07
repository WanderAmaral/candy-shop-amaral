import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const ProfilePage = async () => {
  const session = await getServerSession();

  if (!session) {
    redirect("/auth");
  }

  return <div className="text-red-500">Seu perfil</div>;
};

export default ProfilePage;
