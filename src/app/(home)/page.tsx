import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Link href={"/api/logout"}>LogOut</Link>
      <Image src={'https://github.com/WanderAmaral.png'} alt={'image'} width={100} height={100}/>
    </>
  );
}
