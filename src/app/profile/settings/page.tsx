import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import ProfileForm from "./_components/profile-form";

const ProfilePage = async () => {
  const session = await getServerSession();
  
  if (!session) {
    return 
  }
  return (
    <div>
      <ProfileForm defaultValues={session.user} />
    </div>
  );
};

export default ProfilePage;
