"use client";
import { sidebarLinks } from "@/constants";
import { useUser } from "@clerk/nextjs";

const SideBar = () => {
  const { user } = useUser();

  return (
    <>
      <div className="flex items-center gap-3 w-full lg:ml-8 ml-5 mt-7">
        <img src="/logo1.png" alt="Logo" />
        <p className="text-light-1 text-3xl font-bold lg:block hidden">Picgram</p>
      </div>
      <div className="flex items-center gap-3 px-4 lg:ml-4 ml-2 mt-7">
        <img
          src={user?.imageUrl}
          alt="Profile"
          className="lg:w-10 lg:h-10 w-8 h-8 rounded-full"
        />
        <div className="lg:block hidden">
          <p className="text-light-1 text-lg font-semibold">
            {user?.firstName || "Guest"}
          </p>
          <p className="text-light-3">@{user?.username || "No username"}</p>
        </div>
      </div>
      <div className="lg:px-3 ml-1">
        {sidebarLinks.map((link, index) => (
          <div
            className="flex items-center gap-5 p-3 mx-3 rounded-md my-5 cursor-pointer"
            key={index}
          >
            <img src={link.imgURL} alt={link.label} className="text-white" />
            <p className="text-light-1 lg:block hidden">{link.label}</p>
          </div>
        ))}
        <div className="flex items-center gap-5 p-3 mx-3 rounded-md my-5 absolute bottom-4 cursor-pointer">
          <img src="/icons/logout.svg" alt="Logout" className="text-white" />
          <p className="text-light-1 lg:block hidden">Logout</p>
        </div>
      </div>
    </>
  );
};

export default SideBar;
