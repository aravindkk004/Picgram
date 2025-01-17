import Loader from "../Loader";
import GridPostList from "./GridPostList";

const SavedPosts = ({ user, posts, currUser, loading }) => {
  return (
    <div className="flex flex-col flex-1 items-center gap-10 py-10 px-5 md:p-14 ">
      <div className="flex gap-2 w-full max-w-5xl">
        <img
          src="/icons/save.svg"
          width={36}
          height={36}
          alt="edit"
          className="invert-white"
        />
        <h2 className="text-[24px] font-bold text-light-1 md:h2-bold text-left w-full">
          Saved Posts
        </h2>
      </div>

      {/* <Loader /> */}
      {/* {loading && <Loader />} */}
      <ul className="w-full flex max-w-5xl gap-9">
        {posts.map((post, index) => (
          <GridPostList
            posts={post}
            user={user[index]}
            key={index}
            currUser={currUser}
          />
        ))}
      </ul>
    </div>
  );
};

export default SavedPosts;
