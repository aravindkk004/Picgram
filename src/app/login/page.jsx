import LoginForm from "@/components/auth/LoginForm";

const Home = () => {
  return (
    <>
      <div className="flex h-[100vh]">
        <div className="md:w-[50%] w-full">
          <LoginForm />
        </div>
        <div className="md:w-[50%] md:block hidden">
          <img
            src="./images/side-img.svg"
            className="w-full h-full object-cover"
            alt="Side visual"
          />
        </div>
      </div>
    </>
  );
};

export default Home;
