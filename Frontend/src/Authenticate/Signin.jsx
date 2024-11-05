import React, { useState } from "react";
import "./Signin.css";
import { faLock, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signin = ({ setIsAuthenticated }) => {
  const [signInFormData, setSignInFormData] = useState({
    email: "",
    password: "",
  });
  const [toastShown, setToastShown] = useState(false);

  const navigate = useNavigate();

  //Tracking input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignInFormData({ ...signInFormData, [name]: value });
  };

  //Submitting data to server
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting data:", signInFormData);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_MAIN_SERVER_URL}/user/login`,
        signInFormData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      console.log("Response:", response.data);

      if (response.data.success) {
        setIsAuthenticated(true);
        if (!toastShown) {
          toast.success(`Welcome back to Sanidhya!`, {
            position: "bottom-right",
            autoClose: 2000,
            hideProgressBar: true,
            theme: "dark",
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
          setToastShown(true);
        }
        setTimeout(() => {
          navigate("/");
          toast.dismiss();
        }, 2000);
        console.log("User logged successfully");
      } else {
        toast.error("Please check your credentials.", {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: true,
          theme: "dark",
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    } catch (e) {
      console.log("Error while login through frontend:", e);
      toast.error("An error occurred. Please try again later.", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: true,
        theme: "dark",
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  return (
    <div className="credit-container">
      <div className="credit-form-container">
        <div className="signup-signin">
          <form className=" sign-in" onSubmit={handleSubmit}>
            <h2 className="credit-title">Sign in</h2>
            <div className="credit-inputs">
              <FontAwesomeIcon icon={faEnvelope} className="credit-icon" />
              <input
                type="email"
                placeholder="Email"
                name="email"
                value={signInFormData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="credit-inputs">
              <FontAwesomeIcon icon={faLock} className="credit-icon" />
              <input
                type="password"
                placeholder="Password"
                name="password"
                value={signInFormData.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className="dont-have-acc" style={{ padding: "1rem" }}>
              <p style={{ fontSize: "14px", color: "#333" }}>
                Dont have account?
                <Link to={"/user/register"} style={{ textDecoration: "none" }}>
                  {" "}
                  SignUp
                </Link>
              </p>
            </div>
            <input type="submit" value="Login" className="credit-btn" />
          </form>
          <ToastContainer autoClose={2000} />
        </div>
      </div>
    </div>
  );
};

export default Signin;
