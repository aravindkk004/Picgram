import BottomNav from "@/components/BottomNav";
import MainBar from "@/components/MainBar";
import SideBar from "@/components/SideBar";
import TopNav from "@/components/TopNav";
import CreatePost from "@/components/create-post/CreatePost";

export default function Home() {
  return (
    <div>
      <div className="md:hidden flex bg-dark-3 w-full">
        <TopNav />
      </div>
      <div className="w-full flex items-center h-[100vh] fixed">
        <div className="md:w-[10%] lg:w-[17%] bg-dark-2 h-screen hidden md:block">
          <SideBar />
        </div>
        <div className="lg:w-[83%] md:w-[90%] w-full bg-dark-1 h-screen overflow-y-scroll scrollbar-custom">
          <CreatePost />
        </div>
      </div>
      <div className="md:hidden flex bg-dark-3 w-full absolute bottom-0">
        <BottomNav />
      </div>
    </div>
  );
}
