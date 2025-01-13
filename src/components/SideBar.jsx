"use client";
import { sidebarLinks } from "@/constants";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import { usePathname } from "next/navigation";

const SideBar = () => {
  const { user } = useUser();
  const path = usePathname();

  return (
    <>
      <style jsx>{`
        .filter-white {
          filter: invert(0%) sepia(0%) saturate(0%) hue-rotate(100deg)
            brightness(0%);
        }
      `}</style>
      <div className="flex items-center gap-3 w-full lg:ml-8 ml-5 mt-7">
        <img src="/logo1.png" alt="Logo" />
        <p className="text-light-1 text-3xl font-bold lg:block hidden">
          Picgram
        </p>
      </div>
      <Link href="profile" className="cursor-pointer">
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
      </Link>
      <div className="lg:px-3 ml-1">
        {sidebarLinks.map((link, index) => (
          <Link href={link.route} key={index}>
            <div
              key={index}
              className={`flex items-center gap-5 p-3 mx-3 rounded-md my-5 cursor-pointer ${
                path === link.route ? "bg-primary-500" : "bg-transparent"
              }`}
            >
              {/* <img src={link.imgURL} alt={link.label} className={`text-white ${path===link.route?'':''}`} /> */}
              <img
                src={link.imgURL}
                alt={link.label}
                className={`w-6 h-6 ${
                  path === link.route ? "filter-white" : ""
                }`}
              />
              <p className="text-light-1 lg:block hidden">{link.label}</p>
            </div>
          </Link>
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
