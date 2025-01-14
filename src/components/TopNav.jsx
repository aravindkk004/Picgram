"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

const TopNav = ({ user }) => {
  const { data: session, status } = useSession();
  return (
    <>
      <div className="p-3 flex justify-between items-center w-full">
        <div className="flex items-center gap-2">
          <img src="/logo1.png" />
          <p className="text-light-1 text-2xl font-bold">Picgram</p>
        </div>
        <div className="flex items-center gap-4">
          <img src="/icons/logout.svg" />
          <Link href={`/profile/${session?.user?.id}`}>
            <img
              src={user?.profileImg || "/icons/profile-placeholder.svg"}
              alt="Profile"
              className="lg:w-10 lg:h-10 w-7 h-7 rounded-full"
            />
          </Link>
        </div>
      </div>
    </>
  );
};

export default TopNav;
