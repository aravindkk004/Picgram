import { connectToDb } from "@/libs/connectToDb";
import User from "@/schema/userSchema";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { caption, location, tags, imageSrc, email } = await req.json();
  try {
    await connectToDb();

    if (!caption || !location || !tags || !imageSrc || !email) {
      return NextResponse.json({ message: "Missing fields" }, { status: 400 });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const newPost = {
      imgUrl: imageSrc,
      caption,
      location,
      tags: tags.split(",").map((tag) => tag.trim()), // Convert tags to an array
    };

    user.posts.push(newPost);
    await user.save();
    console.log("saved success")
    return NextResponse.json(
      { message: "Post added successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error adding post:", error);
    return NextResponse.json(
      { message: "Internal Server Error", error: error.message },
      { status: 500 }
    );
  }
}
