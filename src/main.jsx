import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.css";
import Login from "./components/Login.jsx";
import Logout from "./components/Logout.jsx";
import Register from "./components/Register.jsx";
import AddPlayer from "./components/AddPlayer.jsx";
import Players from "./components/Players.jsx";
import Player from "./components/Player.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./shared/Header";
import "./index.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <Header />
      <Routes>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/logout" element={<Logout />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/addPlayer" element={<AddPlayer />}></Route>
        <Route path="/players" element={<Players />}></Route>
        <Route path="/player/:id" element={<Player />}></Route>
      </Routes>
    </Router>
    <ToastContainer />
  </React.StrictMode>
);
