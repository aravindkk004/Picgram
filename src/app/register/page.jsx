import RegisterForm from '@/components/auth/RegisterForm'
import React from 'react'

const Home = () => {
  return (
    <>
      <div className="flex h-[100vh]">
        <div className="md:w-[50%] w-full">
          <RegisterForm />
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
  )
}

export default Home