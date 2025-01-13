import React from "react";

const PostStats = () => {
  return (
    <div
      className={`flex justify-between items-center z-20`}
    >
      <div className="flex gap-2 mr-5">
        <img
          src="/icons/liked.svg"
          alt="like"
          width={20}
          height={20}
          className="cursor-pointer"
        />
        <p className="small-medium lg:base-medium text-light-1">200</p>
      </div>

      <div className="flex gap-2">
        <img
          src={"/icons/saved.svg"}
          alt="share"
          width={20}
          height={20}
          className="cursor-pointer"
        />
      </div>
    </div>
  );
};

export default PostStats;
