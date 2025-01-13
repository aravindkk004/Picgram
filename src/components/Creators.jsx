"use client"
import React, { useState } from "react";
import Loader from "./Loader";
import UserCard from "./all-users/UserCard";

const Creators = () => {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <>
      <div className="px-5 py-7">
        <h2 className="text-light-1 text-2xl font-medium">Top creators</h2>
        <div>
        {isLoading ? (
          <Loader />
        ) : (
          <ul className="w-full mt-4 grid grid-cols-1 xs:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-7 max-w-5xl">
            <li className="flex-1 min-w-[150px] w-full  ">
              <UserCard />
            </li>
            <li className="flex-1 min-w-[150px] w-full  ">
              <UserCard />
            </li>
            <li className="flex-1 min-w-[150px] w-full  ">
              <UserCard />
            </li>
          </ul>
        )}
        </div>
      </div>
    </>
  );
};

export default Creators;
