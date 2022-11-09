import React, { useState, useCallback } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./shared/home/components/Home";
import User from "./users/pages/User";
import Dogs from "./dogs/pages/Dogs";
import NavBar from "./shared/components/Navigation/NavBar";
import Login from "./users/pages/Login";
import Register from "./users/pages/Register";
import NewDog from "./dogs/pages/NewDog";
import EditDog from "./dogs/pages/EditDog";
import { AuthContext } from "./shared/home/context/auth-context";

import "./App.css";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const login = useCallback(() => {
    setIsLoggedIn(true);
  }, []);
  const logout = useCallback(() => {
    setIsLoggedIn(false);
  }, []);

  let routes;

  if (isLoggedIn) {
    console.log("Logged in");
    routes = (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dogs" element={<Dogs />} />
        <Route path="/dogs/newDog" element={<NewDog />} />
        <Route path="/user/:userId" element={<User />} />
        <Route path="/dogs/:dogId" element={<Dogs />} />
        <Route path="/dogs/edit/:dogId" element={<EditDog />} />
        <Route path="*" element={<Home />} />
      </Routes>
    );
  } else {
    console.log("Not logged in");

    routes = (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dogs" element={<Dogs />} />
        <Route path="/user/register" element={<Register />} />
        <Route path="/user/login" element={<Login />} />
        <Route path="/dogs/newDog" element={<NewDog />} />
        <Route path="/dogs/:dogId" element={<Dogs />} />
        <Route path="*" element={<Login />} />
      </Routes>
    );
  }
  return (
    <AuthContext.Provider
      value={{ isLoggedIn: isLoggedIn, login: login, logout: logout }}
    >
      <Router>
        <NavBar />
        {routes}
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
