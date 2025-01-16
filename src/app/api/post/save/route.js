import { connectToDb } from "@/libs/connectToDb";
import User from "@/schema/userSchema";
import { NextResponse } from "next/server";

export async function POST(req) {
  await connectToDb();
  const { currentUserId, postId, userId } = await req.json();
  try {
    if (!currentUserId || !postId || !userId) {
      return NextResponse.json({ status: 400, message: "Invalid input data" });
    }
    const userDetails = await User.findById(currentUserId);
    if (!userDetails) {
      return NextResponse.json({ status: 404, message: "User not found" });
    }
    const saveDetails = {
      postId,
      userId,
    };
    const isAlreadySaved = userDetails.savedPosts.some(
      (post) => post.postId === postId
    );
    if (isAlreadySaved) {
      return NextResponse.json({ status: 409, message: "Post already saved" });
    }
    userDetails.savedPosts.push(saveDetails);
    await userDetails.save();
    return NextResponse.json({
      status: 200,
      message: "Post saved successfully",
    });
  } catch (error) {
    console.error("Error saving post:", error);
    return NextResponse.json({ status: 500, message: "Internal Server Error" });
  }
}
