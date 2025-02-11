import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Header from "./pages/header/Header";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import Users from "./pages/Users/Users";
import Home from "./pages/Home";
import AuthContext from "./context/AuthContext";
import Profile from "./pages/profile/Profile";

const App = () => {
  const [isAuth, setIsAuth] = useState(
    localStorage.getItem("isAuth") === "true"
  );
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || {}
  );

  useEffect(() => {
    localStorage.setItem("isAuth", isAuth);
    localStorage.setItem("user", JSON.stringify(user));
  }, [isAuth, user]);

  return (
    <AuthContext.Provider value={{ isAuth, setIsAuth, user, setUser }}>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/login"
            element={isAuth ? <Navigate to="/profile" /> : <Login />}
          />
          <Route
            path="/signup"
            element={isAuth ? <Navigate to="/profile" /> : <Signup />}
          />
          <Route
            path="/user"
            element={isAuth ? <Users /> : <Navigate to="/login" />}
          />{" "}
          {/* ✅ Ensure "user", not "users" */}
          <Route
            path="/profile"
            element={isAuth ? <Profile /> : <Navigate to="/login" />}
          />
        </Routes>
      </BrowserRouter>
    </AuthContext.Provider>
  );
};

export default App;
