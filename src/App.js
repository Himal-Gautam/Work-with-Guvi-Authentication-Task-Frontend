import "./App.css";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { ReactSession } from "react-client-session";
import { NavBar } from "./Pages/NavBar";
import { Profile } from "./Pages/Profile";
import { NotFoundPage } from "./Pages/NotFoundPage";
import { Route, Routes, Navigate } from "react-router-dom";
import { Login } from "./Pages/Login";
import SignUp from "./Pages/SignUp";

ReactSession.setStoreType("localstorage");

function App() {
  console.log(React.version);

  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<Navigate replace to="/login" />} exact />
        <Route path="/login" element={<Login />} exact />
        <Route path="/signup" element={<SignUp />} exact />
        <Route
          path="profile"
          element={
            ReactSession.get("token") ? (
              <Profile />
            ) : (
              <Navigate replace to="/login" />
            )
          }
        />
        <Route element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;
