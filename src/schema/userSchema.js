import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  imgUrl: {
    type: String,
    required: true,
  },
  caption: {
    type: String,
    required: true,
  },
  location: { type: String },
  tags: [{ type: String }],
  likes: [
    {
      type: Object,
      ref: "User",
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    profileImg: {
      type: String,
    },
    bio: {
      type: String,
    },
    posts: [postSchema],
    savedPosts: [{ type: Object }],
    likedPosts: [{ type: Object }],
    following: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    followedBy: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
