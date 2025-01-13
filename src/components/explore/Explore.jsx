import React from "react";
import GridPostList from "../saved/GridPostList";

const Explore = () => {
  return (
    <div className="flex flex-col flex-1 items-center py-10 px-5 md:p-14">
      <div className="max-w-5xl flex flex-col items-center w-full gap-6 md:gap-4">
        <h2 className="text-[24px] font-bold text-light-1 md:h2-bold w-full">
          Search Posts
        </h2>
        <div className="flex gap-4 px-4 w-full rounded-lg bg-dark-4">
          <img src="/icons/search.svg" width={24} height={24} alt="search" />
          <input
            type="text"
            placeholder="Search"
            className="h-12 text-light-1 bg-dark-4 border-none placeholder:text-light-4 focus-visible:ring-0 focus-visible:ring-offset-0 ring-offset-0 focus:outline-none !important"
          />
        </div>
      </div>

      <div className="flex justify-between items-center w-full max-w-5xl mt-8 mb-7">
        <h3 className="md:text-[24px] font-bold text-light-1">Popular Today</h3>

        <div className="flex items-center gap-3 bg-dark-3 rounded-xl px-4 py-2 cursor-pointer">
          <p className="small-medium md:base-medium text-light-2">All</p>
          <img src="/icons/filter.svg" width={20} height={20} alt="filter" />
        </div>
      </div>

      {/* <div className="flex flex-wrap gap-9 w-full max-w-5xl">
        {shouldShowSearchResults ? (
          <SearchResults
            isSearchFetching={isSearchFetching}
            searchedPosts={searchedPosts}
          />
        ) : shouldShowPosts ? (
          <p className="text-light-4 mt-10 text-center w-full">End of posts</p>
        ) : (
          posts.pages.map((item, index) => (
            <GridPostList posts={item.documents} />
          ))
        )}
      </div> */}
      <div className="flex flex-wrap gap-9 w-full max-w-5xl">
        <GridPostList />
      </div>
      {/* {hasNextPage && !searchValue && (
        <div ref={ref} className="mt-10">
          <Loader />
        </div>
      )} */}
    </div>
  );
};

export default Explore;
