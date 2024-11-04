import { useState, useEffect } from "react";
import React from "react";
import "./ExpertRegistration.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ExpertRegistration = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    experience: "",
    expertise: "",
    image: null,
    socials: "",
    description: "",
    profession: "",
    workingIn: "",
  });
  const [hasShownExpertToast, setHasShownExpertToast] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  //Organization authentication
  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/organization/check-auth",
          {
            withCredentials: true,
          }
        );

        if (!response.data.authenticated) {
          toast.error(
            "To add your organization, you need to have an account on Sanidhya",
            {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
            }
          );
          navigate("/user/login");
          return;
        }

        await checkExpertAuthentication();
      } catch (error) {
        console.error("Error in user authentication", error);
        if (error.response && error.response.status === 401) {
          toast.error("To register, you need to have an account on Sanidhya", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
          navigate("/user/login");
        } else {
          toast.error("An error occurred during authentication");
        }
      }
    };

    checkAuthentication();
  }, [navigate]);

  // Check expert authentication
  const checkExpertAuthentication = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/organization/check-expert",
        { withCredentials: true }
      );

      if (!response.data.authenticated) {
        if (!hasShownExpertToast) {
          toast.error("Experts are not allowed to add organizations", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
          setHasShownExpertToast(true);
          navigate("/expert/list");
        }
      } else {
        await checkOrganization();
      }
    } catch (error) {
      console.error("Error in expert authentication", error);
      if (error.response) {
        if (!hasShownExpertToast) {
          toast.error("Experts are only allowed to make one profile.", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
          setHasShownExpertToast(true);
          navigate("/expert/list");
        }
      } else {
        toast.error("Failed to check expert authentication");
      }
    }
  };

  // Check organization authentication
  const checkOrganization = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/organization/check-org-there",
        {
          withCredentials: true,
        }
      );
      setIsAuthenticated(response.data.authenticated);
    } catch (error) {
      console.error("Error checking organization", error);
      if (error.response) {
        toast.error(
          "Organizations are not allowed to be part of expert community.",
          {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          }
        );
        navigate("/organization/list");
        setIsAuthenticated(false);
      } else {
        toast.error("Failed to check organization");
      }
    }
  };

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === "file") {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  console.log("Form Data before submission:", formData);

  //Submitting response to server
  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();
    form.append("name", formData.name);
    form.append("username", formData.username);
    form.append("email", formData.email);
    form.append("password", formData.password);
    form.append("experience", formData.experience);
    form.append("expertise", formData.expertise);
    form.append("socials", formData.socials);
    form.append("description", formData.description);
    form.append("profession", formData.profession);
    form.append("workingIn", formData.workingIn);
    if (formData.image) {
      form.append("image", formData.image);
    }
    console.log("Form Data after submission:", formData);

    try {
      const response = await axios.post(
        "http://localhost:4000/expert/registration",
        form,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      if (response.data.success === true) {
        toast.success(`${formData.name} welcome to expert community!`, {
          position: "bottom-right",
          autoClose: 2000,
          hideProgressBar: true,
          theme: "dark",
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        setTimeout(() => {
          navigate("/expert/list");
          toast.dismiss();
        }, 2000);
      } else {
        console.error("Unexpected response:", response);
        toast.error("Registration failed. Please try again.");
      }
    } catch (error) {
      console.error("Error registering expert:", error.response.data);
      toast.error(
        error.response.data.message ||
          "Failed to register expert. Please try again."
      );
    }
  };

  return (
    <div className="expert-register-container">
      <div className="expert-register">
        <div className="register-heading">Share Your Sanidhya</div>
        <form onSubmit={handleSubmit}>
          <div className="expert-details">
            <div className="expert-inputs">
              <div className="two-info-div">
                <span className="exp-details">Name</span>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Dr.Rajesh Shah"
                  required
                />
              </div>

              <div className="two-info-div">
                <span className="exp-details">Signup Username</span>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="raj@123"
                  required
                />
              </div>
            </div>
            <div className="expert-inputs">
              <div className="two-info-div">
                <span className="exp-details">Signup Email</span>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="raj@gmail.com"
                  required
                />
              </div>
              <div className="two-info-div">
                <span className="exp-details">Signup Password</span>
                <input
                  type="password"
                  placeholder="Type Strong password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="expert-inputs">
              <div className="two-info-div">
                <span className="exp-details">Organization</span>
                <input
                  type="text"
                  placeholder="Zydus Hospital"
                  name="workingIn"
                  onChange={handleChange}
                  value={formData.workingIn}
                  required
                />
              </div>
              <div className="two-info-div">
                <span className="exp-details">Experience</span>
                <input
                  type="number"
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  min={1}
                  placeholder="6"
                  required
                />
              </div>
            </div>
            <div className="expert-inputs">
              <div className="two-info-div">
                <span className="exp-details">Expertise</span>
                <input
                  type="text"
                  name="expertise"
                  value={formData.expertise}
                  onChange={handleChange}
                  placeholder="Physiatrist"
                  required
                />
              </div>
              <div className="two-info-div">
                <span className="exp-details">Image</span>
                <input
                  type="file"
                  placeholder="Enter your photo"
                  required
                  name="image"
                  onChange={handleChange}
                  style={{ textAlign: "center" }}
                />
              </div>
            </div>
            <div className="expert-inputs">
              <div className="two-info-div">
                <span className="exp-details">Socials</span>
                <input
                  type="url"
                  placeholder="Facebook or Insta link"
                  name="socials"
                  onChange={handleChange}
                  value={formData.socials}
                />
              </div>
              <div className="two-info-div">
                <span className="exp-details">Profession</span>
                <input
                  type="text"
                  placeholder="xyz"
                  maxLength={200}
                  value={formData.profession}
                  name="profession"
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <div>
            <span className="exp-details">Desciption</span>
            <input
              type="text"
              placeholder="abcd...."
              maxLength={800}
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-btn">
            <input type="submit" value="Register" />
          </div>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
};

export default ExpertRegistration;
