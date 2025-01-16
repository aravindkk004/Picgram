import { connectToDb } from "@/libs/connectToDb";
import User from "@/schema/userSchema";
import { NextResponse } from "next/server";

export async function POST(req) {
  await connectToDb();
  const { currentUserId, postId, userId } = await req.json();

  try {
    // Validate input data
    if (!currentUserId || !postId || !userId) {
      return NextResponse.json({
        status: 400,
        message: "Invalid input data",
      });
    }

    // Find the current user
    const currentUser = await User.findById(currentUserId);
    if (!currentUser) {
      return NextResponse.json({
        status: 404,
        message: "Current user not found",
      });
    }

    // Check if the post is already saved
    const isAlreadySaved = currentUser.likedPosts.some(
      (post) => post.postId === postId
    );
    if (isAlreadySaved) {
      return NextResponse.json({
        status: 409,
        message: "Post already saved",
      });
    }

    // Add post to likedPosts
    const saveDetails = { postId, userId };
    currentUser.likedPosts.push(saveDetails);
    await currentUser.save();

    // Find the post's user
    const postUser = await User.findById(userId);
    if (!postUser) {
      return NextResponse.json({
        status: 404,
        message: "Post user not found",
      });
    }

    // Find the post within the postUser's posts array
    const post = postUser.posts.find((p) => p._id.toString() === postId);
    if (!post) {
      return NextResponse.json({
        status: 404,
        message: "Post not found",
      });
    }

    // Add current user's ID to the post's likes
    post.likes.push(currentUserId);

    // Save the changes to the post's user
    await postUser.save();

    return NextResponse.json({
      status: 200,
      message: "Post liked successfully",
    });
  } catch (error) {
    console.error("Error liking post:", error);
    return NextResponse.json({
      status: 500,
      message: "Internal Server Error",
    });
  }
}
