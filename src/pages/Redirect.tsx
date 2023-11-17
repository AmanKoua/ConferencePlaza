import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Redirect user based on their account type and whether or not they're logged in

const Redirect = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("user")) {
      // if not logged in
      navigate("/login");
    } else {
      // if logged in, handle routing
    }
  }, []);

  return <>adadgdg</>;
};

export default Redirect;
