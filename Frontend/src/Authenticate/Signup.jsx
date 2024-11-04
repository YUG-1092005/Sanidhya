import React, { useState } from "react";
import "./Signup.css";
import { faUser, faLock, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signup = ({ setIsAuthenticated }) => {
  const [signupFormData, setSignUpFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [toastShown, setToastShown] = useState(false);

  const navigate = useNavigate();

  //Tracking changes of input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignUpFormData({ ...signupFormData, [name]: value });
  };

  //Submitting data to server
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting data:", signupFormData);

    try {
      const response = await axios.post(
        "http://localhost:4000/user/register",
        signupFormData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      console.log("Response:", response.data);

      if (response.data.success) {
        setIsAuthenticated(true);
        if (!toastShown) {
          toast.success(`${signupFormData.name} welcome to Sanidhya!`, {
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
        console.log("User registered successfully");
      } else {
        toast.error(`User with same email already exists`, {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: true,
          theme: "dark",
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        console.log("Registration failed: " + response.data.message);
      }
    } catch (e) {
      console.log("Error while registrating through frontend:", e);
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
          <form className="sign-up" onSubmit={handleSubmit}>
            <h2 className="credit-title">Sign Up</h2>
            <div className="credit-inputs">
              <FontAwesomeIcon icon={faUser} className="credit-icon" />
              <input
                type="text"
                placeholder="Name"
                onChange={handleChange}
                name="name"
                value={signupFormData.name}
                required
              />
            </div>
            <div className="credit-inputs">
              <FontAwesomeIcon icon={faEnvelope} className="credit-icon" />
              <input
                type="email"
                placeholder="Email"
                onChange={handleChange}
                name="email"
                value={signupFormData.email}
                required
              />
            </div>
            <div className="credit-inputs">
              <FontAwesomeIcon icon={faLock} className="credit-icon" />
              <input
                type="password"
                placeholder="Password"
                onChange={handleChange}
                name="password"
                value={signupFormData.password}
                required
              />
            </div>
            <input type="submit" value="Sign Up" className="credit-btn" />
          </form>
          <ToastContainer />
        </div>
      </div>
    </div>
  );
};

export default Signup;
