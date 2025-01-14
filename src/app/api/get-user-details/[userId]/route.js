import User from "@/schema/userSchema";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  const { userId } = await params;
  try {
    const user = await User.findOne({ _id: userId });
    if (user) {
      return NextResponse.json(user, { status: 200 });
    }
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  } catch (error) {
    return NextResponse.json({ status: 500 });
  }
}
