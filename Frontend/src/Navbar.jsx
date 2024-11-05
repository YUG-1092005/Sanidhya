import React, { useState, useEffect } from "react";
import "./Navbar.css";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Navbar = ({ isAuthenticated, setIsAuthenticated }) => {
  const navigate = useNavigate();

  //Navigating btn
  const handleAbout = () => {
    navigate("/aboutus");
  };

  //Handling sidebar when linl clicked
  const handleSidebar = () => {
    document.getElementById("checkBtn").checked = false;
  };

  //handling signup and signin
  const handleSignUp = () => {
    navigate("/user/register");
    handleSidebar();
  };

  const handleSignIn = () => {
    navigate("/user/login");
    handleSidebar();
  };

  const logout = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_MAIN_SERVER_URL}/user/logout`, {
        method: "POST",
        credentials: "include", // Include cookies
      });

      const data = await response.json();
      console.log("LOG OUT DATA", data);
      if (data.success === true) {
        setIsAuthenticated(false);
        navigate("/", { state: { message: data.message } });
      } else {
        console.log("error in log out");
        toast.error("Logout failed. Please try again.", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }
    } catch (error) {
      console.log("Logout Error:", error);
      toast.error("An error occurred during logout. Please try again.", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
    handleSidebar();
  };

  return (
    <div>
      <nav className="navbar">
        <div
          className="title"
          onClick={handleAbout}
          style={{ cursor: "pointer", marginLeft: "10px" }}
        >
          <img src="/favicon.png" className="logo" />
          &nbsp;&nbsp;
          <h2>Sanidhya</h2>
        </div>
        <input type="checkbox" id="checkBtn" />
        <label htmlFor="checkBtn" className="open-sidebar">
          <lord-icon
            src="https://cdn.lordicon.com/ipnwkgdy.json"
            trigger="click"
          ></lord-icon>
        </label>
        <label htmlFor="checkBtn" id="overlay"></label>
        <div className="links">
          <label htmlFor="checkBtn" className="close-sidebar">
            <lord-icon
              src="https://cdn.lordicon.com/zxvuvcnc.json"
              trigger="click"
              className="close-icon"
            ></lord-icon>
          </label>
          <Link to="/" onClick={handleSidebar}>
            Home
          </Link>
          <Link to="/aboutus" onClick={handleSidebar}>
            AboutUs
          </Link>
          <Link to="/organization/list" onClick={handleSidebar}>
            Organization List
          </Link>
          <Link to="/organization/add" onClick={handleSidebar}>
            Add Your Organization
          </Link>
          <Link to="/expert/list" onClick={handleSidebar}>
            Experts
          </Link>
          <Link to="/expert/registration" onClick={handleSidebar}>
            Expert Registration
          </Link>
          <Link to="/sanidhya/workshops" onClick={handleSidebar}>
            Workshops & Training
          </Link>
          {isAuthenticated ? (
            <Link className="authenticate" onClick={logout} to="/">
              LogOut
            </Link>
          ) : (
            <>
              <Link
                to="/user/register"
                className="authenticate"
                onClick={handleSignUp}
              >
                SignUp
              </Link>
              <Link
                to="/user/login"
                className="authenticate"
                onClick={handleSignIn}
              >
                SignIn
              </Link>
            </>
          )}

          <Link to="/contactus" onClick={handleSidebar}>
            Contact Us
          </Link>
        </div>
      </nav>
      <ToastContainer />
    </div>
  );
};

export default Navbar;
