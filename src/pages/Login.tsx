import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import backendURL from "../backendURL";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (email: string, password: string) => {
    const response = await fetch(backendURL + "/auth", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });

    try {
      const json = await response.json();
      localStorage.setItem("user", JSON.stringify(json));
      console.log(json);

      switch (
        json.type // TODO : Navigate to each page depending on the user type!
      ) {
        case "Admin":
          navigate("/admin");
          break;
        default:
          return;
      }
    } catch (e) {
      alert("login failed");
    }
  };

  return (
    <div className="bg-gradient-to-b from-confPrimary to-gray-100 w-9/12 ml-auto mr-auto h-screen">
      <div className="w-max ml-auto mr-auto pt-20">
        <h1 className="text-5xl font-light">Log In</h1>
      </div>
      <div className="w-2/3 ml-auto mr-auto mt-10">
        <h1 className="text-4xl font-light">Email</h1>
      </div>
      <div className="w-2/3 ml-auto mr-auto mt-3">
        <input
          className="w-full h-10 p-2"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
      </div>
      <div className="w-2/3 ml-auto mr-auto mt-10">
        <h1 className="text-4xl font-light">Password</h1>
      </div>
      <div className="w-2/3 ml-auto mr-auto mt-3">
        <input
          type="password"
          className="w-full h-10 p-2"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
      </div>
      <div className="w-max ml-auto mr-auto mt-10">
        <button
          className="bg-confPrimary shadow-md hover:shadow-xl pt-1 pb-1 pl-5 pr-5"
          onClick={() => {
            handleLogin(email, password);
          }}
        >
          Log In
        </button>
      </div>
    </div>
  );
};

export default Login;
