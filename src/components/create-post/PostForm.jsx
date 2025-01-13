"use client";
import { useState } from "react";

const PostForm = ({ action }) => {
  const [isLoadingCreate, setIsLoadingCreate] = useState(false);
  return (
    <>
      <form className="flex flex-col gap-9 w-full  max-w-5xl md:mb-0 mb-[40%]">
        <div>
          <label className="text-light-1">Caption</label>
          <textarea
            placeholder="caption here..."
            className="w-full h-[150px] bg-dark-4 px-3 py-3 rounded-md resize-none text-light-1 mt-2"
          ></textarea>
        </div>
        <div>
          <p className="text-light-1 mb-2">Add photos</p>
          <div className="bg-dark-4 rounded-md flex flex-col items-center justify-center md:h-[600px] h-[400px]">
            <img src="/icons/file-upload.svg" />
            <p className="text-light-1">Drag photo here</p>
            <p className="text-light-3 mb-3">SVG, PNG, JPG</p>
            <button className="bg-dark-3 text-light-1 px-2 py-2 rounded-md">
              Select from computer
            </button>
          </div>
        </div>
        <div className="w-full">
          <label className="text-light-1">Location</label>
          <input
            type="text"
            placeholder="Eg: #Madurai"
            className="w-full bg-dark-4 px-3 py-3 rounded-md text-light-1 mt-2"
          />
        </div>
        <div className="w-full">
          <label className="text-light-1">Tags</label>
          <input
            type="text"
            placeholder="Eg: #trend"
            className="w-full bg-dark-4 px-3 py-3 rounded-md text-light-1 mt-2"
          />
        </div>

        <div className="flex gap-4 items-center justify-end">
          <button
            type="button"
            className="shad-button_dark_4"
            onClick={() => navigate(-1)}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-primary-600 text-light-2 px-4 rounded-md py-2 whitespace-nowrap"
            disabled={isLoadingCreate}
          >
            {isLoadingCreate && <Loader />}
            {action} Post
          </button>
        </div>
      </form>
    </>
  );
};

export default PostForm;
