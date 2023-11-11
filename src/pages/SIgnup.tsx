import React from "react";

const Signup = () => {
  return (
    <div className="bg-gradient-to-b from-confPrimary to-gray-100 w-9/12 ml-auto mr-auto h-screen">
      <div className="w-max ml-auto mr-auto pt-20">
        <h1 className="text-5xl font-light">Sign Up</h1>
      </div>
      <div className="w-2/3 ml-auto mr-auto mt-10">
        <h1 className="text-4xl font-light">Email</h1>
      </div>
      <div className="w-2/3 ml-auto mr-auto mt-3">
        <input className="w-full h-10 p-2" />
      </div>
      <div className="w-2/3 ml-auto mr-auto mt-10">
        <h1 className="text-4xl font-light">Password</h1>
      </div>
      <div className="w-2/3 ml-auto mr-auto mt-3">
        <input className="w-full h-10 p-2" />
      </div>
      <div className="w-max ml-auto mr-auto mt-10">
        <button className="bg-confPrimary shadow-md hover:shadow-xl pt-1 pb-1 pl-5 pr-5">
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default Signup;
