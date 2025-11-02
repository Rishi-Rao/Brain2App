import React, { useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Intro from "./pages/Intro";
import Upload from "./pages/Upload";
import Output from "./pages/Output";
import Navbar from "./components/Navbar";

const App = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const onLoginSuccess = (username) => {
    setAuthenticated(true);
    setUser(username);
    navigate('/intro');
  };

  const onLogout = () => {
    setAuthenticated(false);
    setUser(null);
    navigate('/');
  };

  return (
    <div className="container">
      {authenticated && <Navbar onLogout={onLogout} user={user} />}
      <Routes>
        {!authenticated ? (
          <>
            <Route path="/" element={<Login onLoginSuccess={onLoginSuccess} />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="*" element={<Navigate to="/" />} />
          </>
        ) : (
          <>
            <Route path="/intro" element={<Intro />} />
            <Route path="/upload" element={<Upload />} />
            <Route path="/output" element={<Output />} />
            <Route path="*" element={<Navigate to="/intro" />} />
          </>
        )}
      </Routes>
    </div>
  );
};

export default App;
