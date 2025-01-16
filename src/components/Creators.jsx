"use client";
import React, { useState } from "react";
import Loader from "./Loader";
import UserCard from "./all-users/UserCard";
import { useSession } from "next-auth/react";

const Creators = ({ userDetails }) => {
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const filteredUsers = userDetails
    ?.filter((user) => user._id !== session?.user?.id)
    .slice(0, 5);
  const currentUser = userDetails?.filter(
    (user) => user._id == session?.user?.id
  );
  return (
    <>
      <div className="px-5 py-7">
        <h2 className="text-light-1 text-2xl font-medium">Top creators</h2>
        <div>
          {isLoading ? (
            <Loader />
          ) : (
            <ul className="w-full mt-4 grid grid-cols-1 xs:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-7 max-w-5xl">
              {filteredUsers?.map((user, index) => (
                <li className="flex-1 min-w-[150px] w-full" key={index}>
                  <UserCard userDetail={user} currentUser={currentUser[0]} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
};

export default Creators;
