import { getServerSession } from "next-auth";

export default async function CardProfile() {
  const session = await getServerSession();

  return <div className="text-black">{session?.user?.name}</div>;
}
