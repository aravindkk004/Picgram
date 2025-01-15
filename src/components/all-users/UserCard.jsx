"use client";
import axios from "axios";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const UserCard = ({ userDetail, currentUser }) => {
  const { data: session } = useSession();
  const [followedBy, setFollowedBy] = useState(false);

  useEffect(() => {
    if (currentUser && userDetail?._id) {
      const isFollowing = currentUser?.following?.includes(userDetail._id)
      setFollowedBy(isFollowing);
    }
  }, [currentUser, userDetail]);

  const followUser = async () => {
    try {
      const response = await axios.post("/api/user/follow", {
        userId: session?.user?.id,
        followedBy: userDetail?._id,
      });

      if (response.status === 200) {
        setFollowedBy(true);
        toast.success("User followed successfully!");
      } else {
        toast.error(response.data.message || "Failed to follow user.");
      }
    } catch (error) {
      toast.error("Server error while updating follow status.");
    }
  };

  return (
    <div className="flex items-center justify-center flex-col gap-4 border border-dark-4 rounded-[20px] px-5 py-8">
      <Link href={`/profile/${userDetail?._id}`} passHref>
        <div className="flex items-center justify-center flex-col gap-4">
          <img
            src={userDetail?.profileImg || "/icons/profile-placeholder.svg"}
            alt="creator"
            className="rounded-full w-14 h-14"
          />
          <div className="flex items-center justify-center flex-col gap-1">
            <p className="base-medium text-light-1 text-center line-clamp-1">
              {userDetail?.name}
            </p>
            <p className="small-regular text-light-4 text-center line-clamp-1">
              @{userDetail?.username}
            </p>
          </div>
        </div>
      </Link>
      <button
        type="button"
        className={`px-5 py-2 rounded-md text-light-1 ${
          followedBy ? "bg-dark-4" : "bg-primary-600"
        }`}
        onClick={followUser}
        disabled={followedBy}
      >
        {followedBy ? "Following" : "Follow"}
      </button>
    </div>
  );
};

export default UserCard;
