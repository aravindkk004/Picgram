import { connectToDb } from "@/libs/connectToDb";
import User from "@/schema/userSchema";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    await connectToDb();
    const users = await User.find();
    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    return NextResponse.json({ status: 500 });
  }
}
