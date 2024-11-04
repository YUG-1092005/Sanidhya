import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import Navbar from "./Navbar";
import Footer from "./Footer.jsx";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./AppRoutes.jsx";
import ClipLoader from "react-spinners/ClipLoader";
import axios from "axios";

function App() {
  const [loading, setLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    setLoading(true);
    // Verify if the user is already authenticated
    const verifyAuth = async () => {
      try {
        const response = await axios.get("http://localhost:4000/user/verify", {
          withCredentials: true, // Include cookies
        });
        if (response.data.success) {
          setIsAuthenticated(true);
        }
      } catch (error) {
        setIsAuthenticated(false);
      }
    };

    verifyAuth();
  }, []);

  return (
    <>
      {loading ? (
        <div className="loader-wrapper">
          <ClipLoader color={"#80bbbb"} loading={loading} size={90} />
        </div>
      ) : (
        <BrowserRouter>
          <Navbar
            isAuthenticated={isAuthenticated}
            setIsAuthenticated={setIsAuthenticated}
          />
          <AppRoutes setIsAuthenticated={setIsAuthenticated} />
          <Footer />
        </BrowserRouter>
      )}
    </>
  );
}

export default App;
