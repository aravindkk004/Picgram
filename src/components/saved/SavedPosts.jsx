import Loader from "../Loader";
import GridPostList from "./GridPostList";

const SavedPosts = () => {
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

      <ul className="w-full flex justify-center max-w-5xl gap-9">
        {/* <p className="text-light-4">No available posts</p> */}

        <GridPostList showStats={false} />
      </ul>
    </div>
  );
};

export default SavedPosts;
