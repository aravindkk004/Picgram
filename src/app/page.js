import BottomNav from "@/components/BottomNav";
import Creators from "@/components/Creators";
import MainBar from "@/components/MainBar";
import SideBar from "@/components/SideBar";
import TopNav from "@/components/TopNav";

export default function Home() {
  return (
    <div>
      <div className="md:hidden flex bg-dark-3 w-full">
        <TopNav />
      </div>
      <div className="w-full flex items-center h-[100vh] fixed">
        <div className="lg:w-[17%] md:w-[10%] bg-dark-2 h-screen hidden md:block">
          <SideBar />
        </div>
        <div className="lg:w-[56%] md:w-[70%] w-full bg-dark-1 h-screen overflow-y-scroll scrollbar-custom pb-[3%]">
          <MainBar />
        </div>
        <div className="lg:w-[27%] md:w-[20%] md:block hidden bg-dark-2 h-screen">
          <Creators />
        </div>
      </div>
      <div className="md:hidden flex bg-dark-3 w-full absolute bottom-0">
        <BottomNav />
      </div>
    </div>
  );
}
