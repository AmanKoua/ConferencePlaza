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
import Conferences from "./pages/Conferences";
import AuthorConference from "./pages/AuthorConference";
import Reviewer from "./pages/Reviewer";
import ChairPapers from "./pages/ChairPapers";
import ConferenceSubmissions from "./pages/ConferenceSubmissions";

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
            <Route path="/conferences" element={<Conferences />} />
            <Route path="/author" element={<AuthorConference />} />
            <Route path="/reviewer" element={<Reviewer />} />
            <Route
              path="/conferenceSubmissions"
              element={<ConferenceSubmissions />}
            />
            <Route path="/chairPapers" element={<ChairPapers />} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
