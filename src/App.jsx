import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Route, Routes, useNavigate } from "react-router-dom";
import Login from "./pages/Login/Login";
import Registration from "./pages/Login/Register";
import Home from "./pages/home/home";
import { useAuth } from "./context/AuthContext";

function App() {
    const { accessToken } = useAuth();
    const navigate = useNavigate();
    useEffect(() => {
        if (accessToken) navigate("/home");
    }, [accessToken]);
    return (
        <>
            <Routes>
                <Route path="/" exact={true} element={<Login />} />
                <Route path="/register" element={<Registration />} />
                <Route path="/home" element={<Home />} />
            </Routes>
        </>
    );
}

export default App;
