"use client"
import React, { useState } from "react";
import PostCard from "./post/PostCard";
import Loader from "./Loader";

const MainBar = () => {
  const [isPostLoading, setIsPostLoading] = useState(false);
  return (
    <>
      <div className="flex flex-col items-center">
        <div className="flex md:items-start justify-center w-full md:pl-28">
          <h2 className="text-light-1 text-left font-semibold text-3xl my-6">
            Home Feed
          </h2>
        </div>
        {isPostLoading ? (
          <Loader />
        ) : (
          <ul className="flex flex-col flex-1 gap-9 w-full md:mb-0 mb-[50%] md:p-0 px-6">
              <li className="flex justify-center w-full">
                <PostCard />
              </li>
              <li className="flex justify-center w-full">
                <PostCard />
              </li>
              <li className="flex justify-center w-full">
                <PostCard />
              </li>
              <li className="flex justify-center w-full">
                <PostCard />
              </li>
          </ul>
        )}
      </div>
    </>
  );
};

export default MainBar;
