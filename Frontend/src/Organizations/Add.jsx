import { useState, useEffect } from "react";
import "./Add.css";
import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Add = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    orgName: "",
    adminName: "",
    phoneNo: "",
    username: "",
    email: "",
    password: "",
    phone: "",
    admin: "",
    image: null,
    description: "",
    place: "",
  });
  const [hasShownExpertToast, setHasShownExpertToast] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_MAIN_SERVER_URL}/organization/check-auth`,
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
        console.log("Error in user authentication", error.response);
        if (
          error.response &&
          error.response.data.message === "Unauthorized access. Please login."
        ) {
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
        }
      }
    };

    checkAuthentication();
  }, [navigate]);

  // Check expert authentication
  const checkExpertAuthentication = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_MAIN_SERVER_URL}/organization/check-expert`,
        { withCredentials: true }
      );

      if (!response.data.authenticated) {
        if (!hasShownExpertToast) {
          toast.error("Experts are not allowed to add organization");
          setHasShownExpertToast(true);
          navigate("/expert/list");
        }
      } else {
        await checkOrganization();
      }
    } catch (error) {
      console.log("Error in expert authentication", error);
      if (error.response) {
        if (!hasShownExpertToast) {
          setHasShownExpertToast(true);
          toast.error("Experts are not allowed to be part of organizations.", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
          navigate("/expert/list");
        }
      } else {
        navigate("/user/login");
      }
    }
  };

  // Check organization authentication
  const checkOrganization = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_MAIN_SERVER_URL}/organization/check-org-there`,
        {
          withCredentials: true,
        }
      );
      setIsAuthenticated(response.data.authenticated);
    } catch (error) {
      if (error.response) {
        toast.error("Organization can only be added once.", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        navigate(`/organization/list`);
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
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append("adminName", formData.adminName);
    form.append("username", formData.username);
    form.append("email", formData.email);
    form.append("password", formData.password);
    form.append("orgName", formData.orgName);
    form.append("place", formData.place);
    form.append("phoneNo", formData.phoneNo);
    form.append("description", formData.description);
    if (formData.image) {
      form.append("image", formData.image);
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_MAIN_SERVER_URL}/organization/add`,
        form,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      if (response.data.success === true) {
        toast.success(
          `${formData.orgName} welcome to Organizations community!`,
          {
            position: "bottom-right",
            autoClose: 2000,
            hideProgressBar: true,
            theme: "dark",
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          }
        );
        setTimeout(() => {
          navigate("/organization/list");
          toast.dismiss();
        }, 2000);
      } else {
        console.log("Unexpected response:", response);
        console.log("Registration failed. Please try again.");
      }
    } catch (error) {
      toast.error(
        message || "An error occurred while adding the organization.",
        {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "dark",
        }
      );
    }
  };

  return (
    <div className="organization-register-container">
      <div className="organization-register">
        <div className="register-heading">Add Your Organization</div>
        <form onSubmit={handleSubmit}>
          <div className="organization-details">
            <div className="organization-inputs">
              <div className="two-info-div">
                <label className="org-details">Organization Name</label>
                <input
                  type="text"
                  name="orgName"
                  value={formData.orgName}
                  onChange={handleChange}
                  placeholder="Shree Home"
                  required
                />
              </div>

              <div className="two-info-div">
                <label className="org-details">Admin Name</label>
                <input
                  type="text"
                  name="adminName"
                  value={formData.adminName}
                  onChange={handleChange}
                  placeholder="Raj"
                  required
                />
              </div>
            </div>
            <div className="organization-inputs">
              <div className="two-info-div">
                <label className="org-details">Org/Admin (Signup Email)</label>
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
                <label className="org-details">Signup Password</label>
                <input
                  type="password"
                  placeholder="Type Strong Password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="organization-inputs">
              <div className="two-info-div">
                <label className="org-details">Location</label>
                <input
                  type="text"
                  placeholder="Anand, Gujarat"
                  name="place"
                  onChange={handleChange}
                  value={formData.place}
                  required
                />
              </div>
              <div className="two-info-div">
                <label className="org-details">Phone Number</label>
                <input
                  type="tel"
                  name="phoneNo"
                  value={formData.phoneNo}
                  onChange={handleChange}
                  placeholder="+91 98xxxxxxxx"
                  required
                />
              </div>
            </div>
            <div className="organization-inputs">
              <div className="two-info-div">
                <label className="org-details">Image</label>
                <input
                  type="file"
                  required
                  name="image"
                  onChange={handleChange}
                  style={{ textAlign: "center" }}
                />
              </div>
              <div className="two-info-div">
                <label className="org-details">Username</label>
                <input
                  type="text"
                  required
                  placeholder="Ex. xyz@123"
                  name="username"
                  onChange={handleChange}
                  style={{ textAlign: "center" }}
                />
              </div>
            </div>
          </div>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <div>
            <label className="org-details">Description</label>
            <input
              type="text"
              placeholder="Describe your organization..."
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

export default Add;
