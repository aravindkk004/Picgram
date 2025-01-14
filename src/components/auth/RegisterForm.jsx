"use client";
import Link from "next/link";
import { useState } from "react";
import { FaRegEyeSlash } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa";
import Loader from "../Loader";
import { toast } from "react-toastify";
import axios from "axios";
import { useRouter } from "next/navigation";

const RegisterForm = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const router = useRouter();

  const createUser = async (e) => {
    e.preventDefault();
    setIsCreating(!isCreating);
    console.log("Hello from api");
    if (!name || !username || !email || !password) {
      toast.error("Fill missing fields");
      return;
    }
    try {
      const response = await axios.post("/api/auth/create-user", {
        name,
        username,
        email,
        password,
      });

      if (response.status === 200) {
        toast.success("Account created successfully!");
        router.push("/login");
      }
    } catch (error) {
      if (error.response?.status === 409) {
        toast.error(error.response.data.message || "Conflict occurred");
      } else if (error.response?.status === 404) {
        toast.error(error.response.data.message || "Fill the required details");
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } finally {
      setIsCreating(false);
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
        <h2 className="text-light-1 text-2xl font-bold">
          Create a new Account
        </h2>
        <p className="text-light-3">To use Picgram enter your details</p>
        <form className=" md:w-[50%]" onSubmit={createUser}>
          <div className="flex flex-col my-3">
            <label className="text-light-2 mb-3">Name</label>
            <input
              type="text"
              placeholder="Enter name"
              required
              className="border border-light-4 bg-dark-3 p-3 rounded-md text-light-1"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
          </div>
          <div className="flex flex-col my-3">
            <label className="text-light-2 mb-3">Username</label>
            <input
              required
              type="text"
              placeholder="Enter username"
              className="border border-light-4 bg-dark-3 p-3 rounded-md text-light-1"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
            />
          </div>
          <div className="flex flex-col my-3">
            <label className="text-light-2 mb-3">Email</label>
            <input
              type="text"
              required
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
              required
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
            disabled={isCreating}
          >
            {isCreating ? <Loader /> : "Register"}
          </button>
          <div className="w-full">
            <Link href="/login">
              <p className="text-light-2 text-left mt-3">
                Already have an account?{" "}
                <span className="text-primary-500 cursor-pointer">Login</span>
              </p>
            </Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default RegisterForm;
