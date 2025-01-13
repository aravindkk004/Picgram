import PostForm from "./PostForm";

const CreatePost = () => {
  return (
    <div className="flex flex-1">
      <div className="flex flex-col flex-1 items-center gap-10 py-10 px-5 md:px-8 lg:p-14">
        <div className="max-w-5xl flex items-start gap-3 justify-start w-full">
          <img src="/icons/add-post.svg" width={36} height={36} alt="add" />
          <h2 className="text-[24px] font-bold text-light-1 md:h2-bold text-left w-full">
            Create Post
          </h2>
        </div>

        <PostForm action="Create" />
      </div>
    </div>
  );
};

export default CreatePost;
