// import { connectToDb } from "@/libs/connectToDb";
// import User from "@/schema/userSchema";
// import { NextResponse } from "next/server";

// export async function GET(req, {params}) {
//   const { userId } = await params;
//   console.log("our userid is",userId)
//   try {
//     await connectToDb();
//     const user = await User.findById(userId);
//     if (!user) {
//       return NextResponse.json({ status: 404 });
//     }
//     const postsId = user.savedPosts.postId;
//     const postUserId = user.savedPosts.userId;

//     return NextResponse.json(
//       { user, posts: user.savedPosts || [] },
//       { status: 200 }
//     );
//   } catch (error) {
//     return NextResponse.json({ status: 500 });
//   }
// }

import { connectToDb } from "@/libs/connectToDb";
import User from "@/schema/userSchema";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  const { userId } = await params;

  console.log("Our userId is", userId);

  try {
    await connectToDb();

    // Fetch the user by ID
    const user = await User.findById(userId).select("savedPosts");
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Extract post IDs and user IDs from saved posts
    const savedPosts = user.savedPosts || [];
    const postIds = savedPosts.map((sp) => sp.postId);
    const userIds = savedPosts.map((sp) => sp.userId);

    // Fetch all users and posts in one go
    const [allUsers, allPosts] = await Promise.all([
      User.find({ _id: { $in: userIds } }).select("name username profileImg"),
      User.find({ "posts._id": { $in: postIds } }, { posts: 1 }),
    ]);

    // Create maps for quick lookup
    const userMap = new Map(allUsers.map((u) => [u._id.toString(), u]));
    const postMap = new Map();
    allPosts.forEach((u) => {
      u.posts.forEach((post) => {
        postMap.set(post._id.toString(), { ...post, ownerId: u._id });
      });
    });

    // Prepare saved posts details
    const savedPostsDetails = savedPosts.map((sp) => {
      const post = postMap.get(sp.postId) || null;
      const postOwner = userMap.get(sp.userId) || null;

      return {
        postId: sp.postId,
        postUserId: sp.userId,
        postInfo: post,
        postOwner,
      };
    });

    return NextResponse.json(
      { user, savedPosts: savedPostsDetails },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
} 
