"use client"
import BottomNav from "@/components/BottomNav";
import SideBar from "@/components/SideBar";
import TopNav from "@/components/TopNav";
import CreatePost from "@/components/create-post/CreatePost";
import { userDetails } from "@/constants/getUserDetails";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function Home() {
  const { data: session } = useSession();
  const [user, setUser] = useState({});
  useEffect(() => {
    const fetchUserDetails = async () => {
      if (session?.user?.id) {
        const userResult = await userDetails(session?.user?.id);
        if (userResult && typeof userResult !== "string") {
          setUser(userResult);
        }
      }
    };
    fetchUserDetails();
  }, [session]);
  return (
    <div>
      <div className="md:hidden flex bg-dark-3 w-full">
        <TopNav user={user}/>
      </div>
      <div className="w-full flex items-center h-[100vh] fixed">
        <div className="md:w-[10%] lg:w-[17%] bg-dark-2 h-screen hidden md:block">
          <SideBar user={user}/>
        </div>
        <div className="lg:w-[83%] md:w-[90%] w-full bg-dark-1 h-screen overflow-y-scroll scrollbar-custom">
          <CreatePost />
        </div>
      </div>
      <div className="md:hidden flex bg-dark-3 w-full absolute bottom-0">
        <BottomNav />
      </div>
    </div>
  );
}
