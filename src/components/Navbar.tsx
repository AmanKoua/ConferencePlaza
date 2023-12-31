import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <div className=" h-20 bg-gradient-to-b from-confPrimary to-white flex flex-row align-middle">
      <div className="w-1/3 h-max mt-auto mb-auto">
        <div className="w-max mt-auto mb-auto">
          <h1
            className="font-bold text-4xl w-max ml-5 mt-auto"
            onClick={() => {
              navigate("/");
            }}
          >
            Conference Plaza
          </h1>
        </div>
      </div>
      <div className="bg-orange-200 w-1/3 h-max mt-auto mb-auto opacity-0">
        empty
      </div>
      <div className="w-1/3 h-max mt-auto mb-auto flex flex-row justify-around">
        <button
          className="bg-confPrimary shadow-md hover:shadow-xl pt-1 pb-1 pl-5 pr-5"
          onClick={() => {
            navigate("/login");
          }}
        >
          Log In
        </button>
        <button
          className="bg-confPrimary shadow-md hover:shadow-xl pt-1 pb-1 pl-5 pr-5"
          onClick={() => {
            navigate("/signup");
          }}
        >
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default Navbar;
