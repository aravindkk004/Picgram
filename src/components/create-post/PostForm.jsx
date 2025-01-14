"use client";
import { useRef, useState } from "react";
import { toast } from "react-toastify";
import Loader from "../Loader";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useSession } from "next-auth/react";

const PostForm = ({ action }) => {
  const { data: session } = useSession();
  const router = useRouter();
  const fileInputRef = useRef(null);
  const [isLoadingCreate, setIsLoadingCreate] = useState(false);
  const [caption, setCaption] = useState("");
  const [location, setLocation] = useState("");
  const [tags, setTags] = useState("");
  const [imageSrc, setImageSrc] = useState("");

  const handleChoosePhotoClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
      console.log(fileInputRef.current);
    } else {
      console.error("File input reference is null.");
    }
  };

  const handleFileChange = (event) => {
    event.preventDefault();
    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    const file = event.target.files[0];
    if (file) {
      reader.onload = () => {
        setImageSrc(reader.result);
      };
    }
    reader.onerror = (error) => {
      console.log("Error: ", error);
    };
  };

  const createPost = async (e) => {
    e.preventDefault();
    try {
      console.log("In the api block")
      setIsLoadingCreate(true);
      const res = await axios.post("/api/post/create-post", {
        caption,
        location,
        tags,
        imageSrc,
        email: session?.user?.email, // Provide a fallback
      });
      if (res.status === 200) {
        toast.success("Post added successfully");
        setCaption("");
        setLocation("");
        setTags("");
        setImageSrc("");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Error while creating your post"
      );
    } finally {
      setIsLoadingCreate(false);
    }
  };

  return (
    <>
      <form
        className="flex flex-col gap-9 w-full max-w-5xl md:mb-0 mb-[40%]"
        onSubmit={createPost}
      >
        <div>
          <label className="text-light-1">Caption</label>
          <textarea
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            placeholder="caption here..."
            className="w-full h-[150px] bg-dark-4 px-3 py-3 rounded-md resize-none text-light-1 mt-2"
          ></textarea>
        </div>
        <div>
          <p className="text-light-1 mb-2">Add photos</p>
          <div className="bg-dark-4 rounded-md flex flex-col items-center justify-center md:h-[600px] h-[400px]">
            {imageSrc ? (
              <>
                <div className="h-[500px]">
                  <img
                    src={imageSrc}
                    alt="Uploaded Preview"
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
                <button
                  type="button"
                  className="bg-dark-3 text-light-1 px-2 py-2 rounded-md mt-3"
                  onClick={handleChoosePhotoClick}
                >
                  Select from computer
                </button>
              </>
            ) : (
              <>
                <img src="/icons/file-upload.svg" alt="upload icon" />

                <p className="text-light-1">Drag photo here</p>
                <p className="text-light-3 mb-3">SVG, PNG, JPG</p>
                <button
                  type="button"
                  className="bg-dark-3 text-light-1 px-2 py-2 rounded-md"
                  onClick={handleChoosePhotoClick}
                >
                  Select from computer
                </button>
              </>
            )}
            <input
              type="file"
              accept="image/*"
              className="opacity-0 absolute h-0 w-0"
              onChange={handleFileChange}
              ref={fileInputRef}
            />
          </div>
        </div>
        <div className="w-full">
          <label className="text-light-1">Location</label>
          <input
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            type="text"
            placeholder="Eg: #Madurai"
            className="w-full bg-dark-4 px-3 py-3 rounded-md text-light-1 mt-2"
          />
        </div>
        <div className="w-full">
          <label className="text-light-1">Tags</label>
          <input
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            type="text"
            placeholder="Eg: #trend"
            className="w-full bg-dark-4 px-3 py-3 rounded-md text-light-1 mt-2"
          />
        </div>

        <div className="flex gap-4 items-center justify-end">
          <button
            type="button"
            className="bg-dark-4 text-light-2 px-4 rounded-md py-2 whitespace-nowrap"
            onClick={() => router.back()}
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
