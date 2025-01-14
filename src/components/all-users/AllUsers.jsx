"use client";
import React, { useState, useEffect } from "react";
import Loader from "../Loader";
import UserCard from "./UserCard";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import axios from "axios";

const AllUsers = () => {
  const { data: session } = useSession();
  const [allUsers, setAllUsers] = useState();
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
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
    setIsLoading(false);
  }, [session]);

  const filteredUsers = allUsers?.filter(
    (user) => user._id !== session?.user?.id
  );
  return (
    <div className="flex flex-col flex-1 items-center gap-10 py-10 px-5 md:px-8 lg:p-14">
      <div className="max-w-5xl flex flex-col items-start w-full gap-6 md:gap-9">
        <div className="flex gap-2 w-full max-w-5xl">
          <img
            src="/icons/people.svg"
            width={36}
            height={36}
            alt="edit"
            className="invert-white"
          />
          <h2 className="text-[24px] font-bold text-light-1 md:h2-bold text-left w-full">
            All Users
          </h2>
        </div>
        {isLoading ? (
          <Loader />
        ) : (
          <ul className="w-full grid grid-cols-1 xs:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-7 max-w-5xl">
            {filteredUsers?.map((user, index) => (
              <li className="flex-1 min-w-[200px] w-full " key={index}>
                <UserCard userDetail={user} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AllUsers;
