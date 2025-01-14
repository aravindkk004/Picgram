import Link from "next/link";
import PostStats from "./PostStats";
import { formatDateString } from "@/libs/utils";
import { useSession } from "next-auth/react";

const PostCard = ({ post, user }) => {
  const { data: session } = useSession();
  return (
    <div className="bg-dark-2 rounded-3xl border border-dark-4 p-5 lg:p-7 w-full max-w-screen-sm">
      <div className="flex justify-between">
        <div className="flex items-center gap-3">
          <Link href={`/posts/${post?._id}`}>
            <img
              src={user?.img || "/icons/profile-placeholder.svg"}
              alt="creator"
              className="w-12 lg:h-12 rounded-full"
            />
          </Link>

          <div className="flex flex-col">
            <p className="base-medium lg:body-bold text-light-1">
              {user?.name}
            </p>
            <div className="flex gap-2 text-light-3">
              <p className="subtle-semibold lg:small-regular ">
                {formatDateString(post?.createdAt)}
              </p>
              •
              <p className="subtle-semibold lg:small-regular">
                {post?.location}
              </p>
            </div>
          </div>
        </div>

        {session?.user?.id == user?.id && (
          <Link href="#">
            <img src={"/icons/edit.svg"} alt="edit" width={20} height={20} />
          </Link>
        )}
      </div>

      {/* <Link href="#"> */}
      <div className="small-medium lg:base-medium py-5">
        <p className="text-light-2">{post?.caption}</p>
        <ul className="flex gap-1 mt-2">
          {post.tags.map((tag, index) => (
            <li className="text-light-3 small-regular" key={index}>
              {tag}{" "}
            </li>
          ))}
        </ul>
      </div>

      <img
        src={post?.imgUrl || "/icons/profile-placeholder.svg"}
        alt="post image"
        className="h-64 xs:h-[400px] lg:h-[450px] w-full rounded-[24px] object-cover mb-5"
      />
      {/* </Link> */}

      <PostStats />
    </div>
  );
};

export default PostCard;
