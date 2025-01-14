import { connectToDb } from "@/libs/connectToDb";
import User from "@/schema/userSchema";
import { NextResponse } from "next/server";

export async function PUT(req) {
  const { name, username, email, bio, profileImg } = await req.json();
  console.log(name, username, email, bio)
  try {
    await connectToDb();
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ status: 404 });
    }
    console.log(user);
    if (name) user.name = name;
    if (username) user.username = username;
    if (bio) user.bio = bio;
    if (profileImg) user.profileImg = profileImg;
    await user.save();
    return NextResponse.json({
      status: 200,
    });
  } catch (error) {
    return NextResponse.json({ status: 500 });
  }
}
