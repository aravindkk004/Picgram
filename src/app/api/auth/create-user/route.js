import { connectToDb } from "@/libs/connectToDb";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import User from "@/schema/userSchema";

export async function POST(req) {
  try {
    await connectToDb();
    const { name, username, email, password } = await req.json();
    if (!name || !username || !email || !password) {
      return NextResponse.json({ status: 404 });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const username_exist = await User.findOne({ username: username });
    if (username_exist) {
      return NextResponse.json(
        { message: "Already exist username. Try different one." },
        { status: 409 }
      );
    }
    const email_exist = await User.findOne({ email });
    if (email_exist) {
      return NextResponse.json(
        { message: "Already exist Email. Try different One." },
        { status: 409 }
      );
    }
    const user = await User.create({
      name,
      username,
      email,
      password: hashedPassword,
    });
    if (user) {
      return NextResponse.json({ status: 200 });
    } else {
      return NextResponse.json({ status: 404 });
    }
  } catch (error) {
    return NextResponse.json({ status: 500 });
  }
}
