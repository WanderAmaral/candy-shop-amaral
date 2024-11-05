import { getServerSession } from "next-auth";
import ProfileForm from "./_components/profile-form";
import { authOptions } from "@/_lib/auth";

const ProfilePage = async () => {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    return null
  }
  return (
    <div>
      <ProfileForm defaultValues={session.user} />
    </div>
  );
};

export default ProfilePage;
