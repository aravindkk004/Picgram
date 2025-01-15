import User from "@/schema/userSchema";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { userId, followedBy } = await req.json();
  try {
    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    if (!user.following) {
      user.followedBy = [];
    }
    if (!user.following.includes(followedBy)) {
      user.following.push(followedBy);
      await user.save();
    }
    const followedUser = await User.findById(followedBy);
    if (!followedUser.followedBy) {
      followedUser.followedBy = [];
    }
    if (!followedUser.followedBy.includes(userId)) {
      followedUser.followedBy.push(userId);
      await followedUser.save();
    }
    return NextResponse.json({ message: "Follow successful", status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Server error", status: 500 });
  }
}
