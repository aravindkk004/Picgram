"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import GridPostList from "../saved/GridPostList";
import { useEffect, useState } from "react";

const StatBlock = ({ value, label }) => (
  <div className="flex items-center gap-2">
    <p className="small-semibold lg:body-bold text-primary-500">{value}</p>
    <p className="small-medium lg:base-medium text-light-2">{label}</p>
  </div>
);

const Profile = ({ user, currUser }) => {
  const { data: session } = useSession();
  const [followedBy, setFollowedBy] = useState(false);
  useEffect(() => {
    setFollowedBy(currUser?.following?.includes(user._id));
  }, [currUser, user]);
  return (
    <div className="flex flex-col items-center flex-1 gap-10 overflow-y-scroll py-10 px-5 md:p-14 scrollbar-custom md:mb-0 mb-[40%]">
      <div className="flex items-center md:mb-4 xl:items-start gap-8 flex-col xl:flex-row relative max-w-5xl w-full">
        <div className="flex xl:flex-row flex-col max-xl:items-center flex-1 gap-7">
          <img
            src={user?.profileImg || "/icons/profile-placeholder.svg"}
            alt="profile"
            className="w-28 h-28 lg:h-36 lg:w-36 rounded-full"
          />
          <div className="flex flex-col flex-1 justify-between md:mt-2">
            <div className="flex flex-col w-full">
              <h1 className="text-center xl:text-left font-bold text-xl md:h1-semibold w-full text-light-1">
                {user?.name}
              </h1>
              <p className="small-regular md:body-medium text-light-3 text-center xl:text-left">
                @{user?.username}
              </p>
            </div>
            <p className="tex-medium text-light-2 text-center xl:text-left mt-2 max-w-screen-sm">
              {user?.bio}
            </p>
            <div className="flex gap-8 mt-3 items-center justify-center xl:justify-start flex-wrap z-20">
              <StatBlock value={user?.posts?.length || 0} label="Posts" />
              <StatBlock
                value={user?.followedBy?.length || 0}
                label="Followers"
              />
              <StatBlock
                value={user?.following?.length || 0}
                label="Following"
              />
            </div>
          </div>

          <div className="flex justify-center gap-4">
            {user?._id == session?.user?.id ? (
              <div>
                <Link
                  href={`/profile/edit-profile/${session?.user?.id}`}
                  className={`h-12 bg-dark-4 px-5 text-light-1 flex items-center gap-2 rounded-lg `}
                >
                  <img
                    src={"/icons/edit.svg"}
                    alt="edit"
                    width={20}
                    height={20}
                  />
                  <p className="flex whitespace-nowrap small-medium">
                    Edit Profile
                  </p>
                </Link>
              </div>
            ) : (
              <div>
                <button
                  type="button"
                  className={`px-5 py-2 rounded-md text-light-1 ${
                    followedBy ? "bg-dark-4" : "bg-primary-600"
                  }`}
                  // onClick={followUser}
                  // disabled={followedBy}
                >
                  {followedBy ? "Following" : "Follow"}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex max-w-5xl w-full gap-3">
        <Link
          href="#"
          className={`flex items-center justify-center gap-3 py-4 w-48 bg-dark-2  transition flex-1 xl:flex-initial rounded-l-lg text-light-2 `}
        >
          <img src={"/icons/posts.svg"} alt="posts" width={20} height={20} />
          Posts
        </Link>
        {session?.user.id == user?._id && (
          <Link
            href="#"
            className={`flex items-center justify-center gap-3 py-4 w-48 bg-dark-2  transition flex-1 xl:flex-initial rounded-r-lg text-light-2`}
          >
            <img src={"/icons/like.svg"} alt="like" width={20} height={20} />
            Liked Posts
          </Link>
        )}
      </div>
      <div>
        <ul className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-7 max-w-5xl">
          {user?.posts?.map((post, index) => (
            <GridPostList
              posts={post}
              key={index}
              user={user}
              currUser={currUser}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Profile;
