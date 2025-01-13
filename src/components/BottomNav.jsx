"use client";
import { bottombarLinks } from "@/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const BottomNav = () => {
  const path = usePathname();
  return (
    <>
      <style jsx>{`
        .filter-white {
          filter: invert(0%) sepia(0%) saturate(0%) hue-rotate(100deg)
            brightness(0%);
        }
      `}</style>
      <div className="flex justify-evenly py-4 w-full">
        {bottombarLinks.map((links, index) => (
          <Link href={links.route} key={index}>
            <div
              key={index}
              className={`flex flex-col items-center p-1 rounded-md ${
                path === links.route ? "bg-primary-500" : "bg-transparent"
              }`}
            >
              <img
                src={links.imgURL}
                alt={links.label}
                className={`${path === links.route ? "filter-white" : ""}`}
              />
              <p
                className={`${
                  path === links.route ? "text-light-1" : "text-light-4"
                }`}
              >
                {links.label}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
};

export default BottomNav;
