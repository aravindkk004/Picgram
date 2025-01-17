import Link from "next/link";
import React from "react";
import PostStats from "../post/PostStats";

const GridPostList = ({ posts, user, currUser }) => {
  return (
    <li className="relative min-w-80 h-80">
      <Link
        href={`/profile/${user?._id}`}
        className="flex rounded-[24px] border border-dark-4 overflow-hidden cursor-pointer w-full h-full"
      >
        <img
          src={posts?._doc?.imgUrl || "/icons/profile-placeholder.svg"}
          alt="post"
          className="h-full w-full object-cover"
        />
      </Link>

      <div className="absolute bottom-0 p-5 flex justify-between w-full bg-gradient-to-t from-dark-3 to-transparent rounded-b-[24px] gap-2">
        <div className="flex items-center justify-start gap-2 flex-1">
          <img
            src={user?.profileImg || "/icons/profile-placeholder.svg"}
            alt="creator"
            className="w-8 h-8 rounded-full"
          />
          <p className="line-clamp-1 text-light-1">{user?.name}</p>
        </div>
        <PostStats currUser={currUser} user={user} post={posts} />
      </div>
    </li>
  );
};

export default GridPostList;
