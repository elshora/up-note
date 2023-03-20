import React from "react";
import Home from "./components/Home/Home";
import { Route, Routes } from "react-router-dom";
import PrivateRoutes from "./components/Protected/ProtectedRoute";
import Register from "./components/Register/Register";
import Login from "./components/login/Login";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
function App() {
  return(
    <>
    <NavBar/>
    <main className="app">
          <Routes>
            <Route element={<PrivateRoutes />}>
                <Route element={<Home/>} path="/home" exact/>
                <Route element={<Home/>} path="/" exact/>
            </Route>
            <Route element={<Login/>} path="/login"/>
            <Route element={<Register/>} path="/register"/>
          </Routes>
    </main>
    <Footer/>
    </>
    )
}

export default App;
