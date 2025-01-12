import { SignIn } from "@clerk/nextjs";

const Home = () => {
  return (
    <>
      <div className="flex h-[100vh]">
        <div className="md:w-[50%] w-full bg-dark-1 flex items-center justify-center">
          <SignIn />
        </div>
        <div className="md:w-[50%] md:block hidden">
          <img
            src="/images/side-img.svg"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </>
  );
};

export default Home;
