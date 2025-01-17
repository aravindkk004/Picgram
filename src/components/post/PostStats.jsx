import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const PostStats = ({ currUser, post, user }) => {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const postId = post?._id || post?._doc?._id;
    console.log(postId)
    console.log(currUser?.likedPosts?.some((item) => item.postId === postId))
    console.log(currUser?.savedPosts?.some((item) => item.postId === postId))
    setLiked(currUser?.likedPosts?.some((item) => item.postId === postId));
    setSaved(currUser?.savedPosts?.some((item) => item.postId === postId));
    setLikeCount(post?.likes?.length || post?._doc?.likes.length);
  }, [post, user, currUser]);

  const likePost = async () => {
    setLiked(true);
    setLikeCount(likeCount + 1);
    try {
      const resp = await axios.post("/api/post/like", {
        currentUserId: currUser?._id,
        postId: post._id,
        userId: user?.id,
      });
      if (resp.status == 200) {
        setLiked(true);
      } else {
        setLiked(false);
      }
    } catch (error) {
      toast.error("Error while liking");
      setLiked(false);
    }
  };

  const savePost = async () => {
    setSaved(true);
    try {
      const resp = await axios.post("/api/post/save", {
        currentUserId: currUser?._id,
        postId: post._id,
        userId: user?.id,
      });
      if (resp.status == 200) {
        setSaved(true);
      }
    } catch (error) {
      toast.error("Error while saving");
      setSaved(false);
    }
  };
  return (
    <div className={`flex justify-between items-center z-20`}>
      <div className="flex gap-2 mr-5" onClick={likePost}>
        <img
          src={liked ? "/icons/liked.svg" : "/icons/like.svg"}
          alt="like"
          width={20}
          height={20}
          className="cursor-pointer"
        />
        <p className="small-medium lg:base-medium text-light-1">
          {likeCount || 0}
        </p>
      </div>

      <div className="flex gap-2" onClick={savePost}>
        <img
          src={saved ? "/icons/saved.svg" : "/icons/save.svg"}
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
