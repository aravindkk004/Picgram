import Link from "next/link";
import React from "react";

const UserCard = () => {
  return (
    <>
      <Link href="#" className="flex items-center justify-center flex-col gap-4 border border-dark-4 rounded-[20px] px-5 py-8">
        <img
          src="/icons/profile-placeholder.svg"
          alt="creator"
          className="rounded-full w-14 h-14"
        />

        <div className="flex items-center justify-center flex-col gap-1">
          <p className="base-medium text-light-1 text-center line-clamp-1">
            Aravind
          </p>
          <p className="small-regular text-light-4 text-center line-clamp-1">
            @aravindkk
          </p>
        </div>

        <button type="button" size="sm" className="bg-primary-600 px-5 py-2 rounded-md text-light-1">
          Follow
        </button>
      </Link>
    </>
  );
};

export default UserCard;
