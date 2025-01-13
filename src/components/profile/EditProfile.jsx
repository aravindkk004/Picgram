"use client";
import { usePathname } from "next/navigation";
import { useRef, useState } from "react";
import Loader from "../Loader";

const EditProfile = () => {
  const path = usePathname();
  const fileInputRef = useRef(null);
  const [isLoadingUpdate, setIsLoadingUpdate] = useState(false);
  const [imageSrc, setImageSrc] = useState("/icons/profile-placeholder.svg");

  const handleChoosePhotoClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0]; 
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImageSrc(e.target.result);
      };
      reader.readAsDataURL(file); 
    }
  };

  return (
    <div className="flex flex-1 md:mb-0 mb-[40%]">
      <div className="flex flex-col flex-1 items-center gap-10 py-10 px-5 md:px-8 lg:p-14">
        <div className="flex items-start gap-3 justify-start w-full max-w-5xl">
          <img src="/icons/edit.svg" width={36} height={36} alt="edit" />
          <h2 className="text-[24px] font-bold text-light-1 md:h2-bold text-left w-full">
            Edit Profile
          </h2>
        </div>

        <form className="flex flex-col gap-7 w-full max-w-5xl">
          <div className="flex items-center gap-3">
            <div>
              <img
                src={imageSrc}
                alt="profile"
                className="w-10 h-10 lg:h-20 lg:w-20 rounded-full object-cover"
              />
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept=".jpg, .png, .jpeg"
              className="hidden"
              onChange={handleFileChange} 
            />
            <p
              className="text-primary-600 cursor-pointer"
              onClick={handleChoosePhotoClick}
            >
              Choose profile photo
            </p>
          </div>
          <div className="w-full">
            <label className="text-light-1">Name</label>
            <input
              type="text"
              placeholder="Eg: Aravind"
              className="w-full bg-dark-4 px-3 py-3 rounded-md text-light-1 mt-2"
            />
          </div>
          <div className="w-full">
            <label className="text-light-1">Username</label>
            <input
              type="text"
              placeholder="Eg: @aravindkk"
              className="w-full bg-dark-4 px-3 py-3 rounded-md text-light-1 mt-2"
            />
          </div>
          <div className="w-full">
            <label className="text-light-1">Email</label>
            <input
              type="text"
              placeholder="Eg: aravind@gmail.com"
              className="w-full bg-dark-4 px-3 py-3 rounded-md text-light-1 mt-2"
            />
          </div>
          <div>
            <label className="text-light-1">Bio</label>
            <textarea
              placeholder="Your Bio..."
              className="w-full h-[150px] bg-dark-4 px-3 py-3 rounded-md resize-none text-light-1 mt-2"
            ></textarea>
          </div>

          <div className="flex gap-4 items-center justify-end">
            <button
              type="button"
              className="bg-dark-4 text-light-2 px-4 rounded-md py-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-primary-600 text-light-2 px-4 rounded-md py-2 whitespace-nowrap flex items-center gap-3"
            >
              {isLoadingUpdate && <Loader />}
              Update Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
