"use client";
import React, { useEffect, useState } from "react";
import PostCard from "./post/PostCard";
import Loader from "./Loader";
import { toast } from "react-toastify";
import axios from "axios";

const MainBar = () => {
  const [isPostLoading, setIsPostLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    // Fetch all users
    const getAllUsers = async () => {
      try {
        const response = await axios.get("/api/get-all-users");
        if (response.status === 200) {
          setAllUsers(response.data); // Assuming response.data is an array of users
          console.log("All users fetched:", response.data);
        }
      } catch (error) {
        toast.error("Failed to fetch users. Please try again later.");
        console.error("Error fetching users:", error);
      } finally {
        setIsPostLoading(false);
      }
    };

    getAllUsers();
  }, []);

  useEffect(() => {
    if (allUsers.length > 0) {
      const allPosts = allUsers.reduce((acc, user) => {
        if (Array.isArray(user.posts)) {
          const postsWithUserDetails = user.posts.map(post => ({
            ...post,
            user: {
              name: user.name, 
              id: user.id,  
              img: user.profileImg  
            },
          }));
          return [...acc, ...postsWithUserDetails];
        }
        return acc;
      }, []);

      if (allPosts.length > 0) {
        const sortedPosts = allPosts.sort(
          (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
        );
        setPosts(sortedPosts.reverse());
      }
    }
  }, [allUsers]);

  return (
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
          {posts.length > 0 ? (
            posts.map((post, index) => (
              <li className="flex justify-center w-full" key={index}>
                <PostCard post={post} user={post.user} /> 
              </li>
            ))
          ) : (
            <p className="text-light-1 text-center">No posts available</p>
          )}
        </ul>
      )}
    </div>
  );
};

export default MainBar;
