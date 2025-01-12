import { bottombarLinks } from "@/constants";
import React from "react";

const BottomNav = () => {
  return (
    <>
      <div className="flex justify-evenly py-4 w-full">
        {bottombarLinks.map((links, index) => (
          <div key={index} className="flex flex-col items-center">
            <img src={links.imgURL} />
            <p className="text-light-4">{links.label}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default BottomNav;
