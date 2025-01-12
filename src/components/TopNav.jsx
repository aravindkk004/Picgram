"use client"
import { useUser } from "@clerk/nextjs";
import React from "react";

const TopNav = () => {
    const { user } = useUser();
  return (
    <>
      <div className="p-3 flex justify-between items-center w-full">
        <div className="flex items-center gap-2">
          <img src="/logo1.png" />
          <p className="text-light-1 text-2xl font-bold">Picgram</p>
        </div>
        <div className="flex items-center gap-4">
          <img src="/icons/logout.svg" />
          <img
            src={user?.imageUrl}
            alt="Profile"
            className="lg:w-10 lg:h-10 w-7 h-7 rounded-full"
          />
        </div>
      </div>
    </>
  );
};

export default TopNav;
