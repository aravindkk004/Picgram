"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaRegEyeSlash } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa";
import { toast } from "react-toastify";
import Loader from "../Loader";
import { signIn } from "next-auth/react";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const LoginFunc = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res.error) {
        toast.error("Invalid credentials");
        setIsLoading(false);
        return;
      }

      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="bg-dark-1 h-[100vh] flex flex-col items-center justify-center">
        <div className="flex items-center gap-3 my-5">
          <img src="/logo1.png" alt="Logo" className="w-[50px]" />
          <p className="text-light-1 text-5xl font-bold lg:block hidden">
            Picgram
          </p>
        </div>
        <h2 className="text-light-1 text-2xl font-bold">Welcome to Picgram</h2>
        <p className="text-light-3">Login to continue to picgram</p>
        <form className=" md:w-[50%] mt-5" onSubmit={LoginFunc}>
          <div className="flex flex-col my-3">
            <label className="text-light-2 mb-3">Email</label>
            <input
              type="text"
              placeholder="Enter email"
              className="border border-light-4 bg-dark-3 p-3 rounded-md text-light-1"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>
          <div className="flex flex-col my-3 relative">
            <label className="text-light-2 mb-2">Password</label>
            <input
              type={visible ? "text" : "password"}
              placeholder="Enter password"
              className="border border-light-4 bg-dark-3 p-3 pr-10 rounded-md text-light-1"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            <div className="absolute right-3 top-14 transform -translate-y-1/2">
              {!visible ? (
                <FaRegEyeSlash
                  onClick={() => setVisible(!visible)}
                  className="text-light-3 cursor-pointer"
                />
              ) : (
                <FaRegEye
                  onClick={() => setVisible(!visible)}
                  className="text-light-3 cursor-pointer"
                />
              )}
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-primary-600 p-3 rounded-md text-light-1 mt-3"
            disabled={isLoading}
          >
            {isLoading ? <Loader /> : "Login"}
          </button>
          <div className="w-full">
            <Link href="/register">
              <p className="text-light-2 text-left mt-3">
                Don't have an account?{" "}
                <span className="text-primary-500 cursor-pointer">
                  Register here
                </span>
              </p>
            </Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default LoginForm;
