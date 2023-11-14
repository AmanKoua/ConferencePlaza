import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";

import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Signup from "./pages/SIgnup";
import Admin from "./pages/Admin";

import "./styles.css";
import "./invisibleScrollbar.css";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar></Navbar>
        <div>
          <Routes>
            <Route path="/login" element={<Login></Login>} />
            <Route path="/signup" element={<Signup></Signup>} />
            <Route path="/admin" element={<Admin></Admin>} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
