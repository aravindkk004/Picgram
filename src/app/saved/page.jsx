"use client";
import BottomNav from "@/components/BottomNav";
import SideBar from "@/components/SideBar";
import TopNav from "@/components/TopNav";
import SavedPosts from "@/components/saved/SavedPosts";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function Home() {
  const { data: session } = useSession();
  const [postUsers, setPostUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [currUser, setCurrUser] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchUserDetails = async () => {
      if (!session?.user?.id) return;

      try {
        const response = await axios.get(
          `/api/post/get-saved-posts/${session.user.id}`
        );

        if (response.status === 200) {
          const { user, savedPosts } = response.data;

          setCurrUser(user);
          setPostUsers(savedPosts.map((sp) => sp.postOwner || {}));
          setPosts(savedPosts.map((sp) => sp.postInfo || {}));
          console.log(posts)
        }
      } catch (error) {
        toast.error("Failed to fetch posts");
        console.error("Error fetching posts:", error);
      } finally{
        setLoading(false)
      }
    };

    fetchUserDetails();
  }, [session]);

  return (
    <div>
      <div className="md:hidden flex bg-dark-3 w-full">
        <TopNav user={currUser} />
      </div>
      <div className="w-full flex items-center h-[100vh] fixed">
        <div className="md:w-[10%] lg:w-[17%] bg-dark-2 h-screen hidden md:block">
          <SideBar user={currUser} />
        </div>
        <div className="lg:w-[83%] md:w-[90%] w-full bg-dark-1 h-screen overflow-y-scroll scrollbar-custom">
          <SavedPosts user={postUsers} posts={posts} currUser={currUser} loading={loading}/>
        </div>
      </div>
      <div className="md:hidden flex bg-dark-3 w-full absolute bottom-0">
        <BottomNav />
      </div>
    </div>
  );
}
