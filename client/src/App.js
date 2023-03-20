import React from "react";
import Home from "./components/Home/Home";
import { Route, Routes } from "react-router-dom";
import PrivateRoutes from "./components/Protected/ProtectedRoute";
import Register from "./components/Register/Register";
import Login from "./components/login/Login";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import About from "./components/About/About";
import Contactus from "./components/Contact/Contact_US";
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
            <Route element={<About/>} path="/about"/>
            <Route element={<Contactus/>} path="/contact"/>
          </Routes>
    </main>
    <Footer/>
    </>
    )
}

export default App;
