import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Edit.css";
import axios from "axios";

const Edit = () => {
  const navigate = useNavigate();
  const [experts, setExperts] = useState([]);
  const { id } = useParams();

  if (!id) {
    return <div>No expert details found. Please navigate back.</div>;
  }

  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    experience: "",
    expertise: "",
    image: "",
    socialMedia: "",
    description: "",
    profession: "",
    workingIn: "",
  });

  //Fetching experts and editing 
  useEffect(() => {
    const fetchExperts = async () => {
      try {
        const response = await axios.get("http://localhost:4000/expert/list");
        setExperts(response.data.data);
        if (!response.data.data) {
          throw new Error("Failed to fetch experts");
        }
        const experts = response.data.data;

        const expertDetails = experts.find((expert) => expert._id === id);
        if (expertDetails) {
          setFormData({
            name: expertDetails.name,
            username: expertDetails.username,
            email: expertDetails.email,
            password: expertDetails.password,
            experience: expertDetails.experience,
            expertise: expertDetails.expertise,
            image: expertDetails.image,
            socials: expertDetails.socials,
            description: expertDetails.description,
            profession: expertDetails.profession,
            workingIn: expertDetails.workingIn,
          });
        } else {
          console.log("Expert not found");
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchExperts();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData({ ...formData, [name]: type === "file" ? files[0] : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    for (const key in formData) {
      formDataToSend.append(key, formData[key]);
    }

    for (const pair of formDataToSend.entries()) {
      console.log(pair[0], pair[1]);
    }

    try {
      const response = await axios.put(
        `http://localhost:4000/expert/${id}/edit`,
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.data.success) {
        toast.success("Expert updated successfully!", {
          autoClose: 2000,
        });
        navigate(`/expert/${id}`);
      } else {
        toast.error("Failed to update expert details.");
      }
    } catch (error) {
      console.error("Error updating expert:", error);
      toast.error(
        error.response?.data?.message || "An error occurred. Please try again."
      );
    }
  };

  return (
    <div className="edit-container">
      <div className="edit-form">
        <div className="form-heading">{formData.name}'s Profile</div>
        <form onSubmit={handleSubmit}>
          <div className="input-row">
            <div className="input-group">
              <label>Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-group">
              <label>Username</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="input-row">
            <div className="input-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="input-row">
            <div className="input-group">
              <label>Experience</label>
              <input
                type="number"
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                min={1}
                required
              />
            </div>
            <div className="input-group">
              <label>Expertise</label>
              <input
                type="text"
                name="expertise"
                value={formData.expertise}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="input-row">
            <div className="input-group">
              <label>Image</label>
              <input
                type="file"
                name="image"
                onChange={handleChange}
                accept="image/*"
              />
            </div>
            <div className="input-group">
              <label>Socials</label>
              <input
                type="url"
                name="SocialMedia"
                value={formData.socialMedia}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="input-row">
            <div className="input-group">
              <label>Profession</label>
              <input
                type="text"
                name="profession"
                value={formData.profession}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-group">
              <label>Organization</label>
              <input
                type="text"
                name="workingIn"
                value={formData.workingIn}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="input-row">
            <div className="input-group full-width">
              <label>Description</label>
              <input
                type="text"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="form-btn">
            <input type="submit" value="Edit" />
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Edit;
