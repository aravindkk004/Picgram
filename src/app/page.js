"use client";
import BottomNav from "@/components/BottomNav";
import Creators from "@/components/Creators";
import Loader from "@/components/Loader";
import MainBar from "@/components/MainBar";
import SideBar from "@/components/SideBar";
import TopNav from "@/components/TopNav";
import { userDetails } from "@/constants/getUserDetails";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function Home() {
  const { data: session } = useSession();
  const [user, setUser] = useState({});
  const [allUsers, setAllUsers] = useState();
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

    const getAllUsers = async () => {
      try {
        const response = await axios.get("/api/get-all-users");
        if (response.status == 200) {
          setAllUsers(response.data);
        }
      } catch (error) {
        toast.error(error);
      }
    };
    getAllUsers();
  }, [session]);

  return (
    <div>
      <div className="md:hidden flex bg-dark-3 w-full">
        <TopNav user={user} />
      </div>
      <div className="w-full flex items-center h-[100vh] fixed">
        <div className="lg:w-[17%] md:w-[10%] bg-dark-2 h-screen hidden md:block">
          <SideBar user={user} />
        </div>
        <div className="lg:w-[56%] md:w-[70%] w-full bg-dark-1 h-screen overflow-y-scroll scrollbar-custom pb-[3%]">
          {allUsers ? <MainBar userDetails={allUsers} /> : <Loader />}
        </div>
        <div className="lg:w-[27%] md:w-[20%] md:block hidden bg-dark-2 h-screen">
          {allUsers ? <Creators userDetails={allUsers} /> : <Loader />}
        </div>
      </div>
      <div className="md:hidden flex bg-dark-3 w-full absolute bottom-0">
        <BottomNav />
      </div>
    </div>
  );
}
