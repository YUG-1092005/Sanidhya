import { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Orgedit = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { orgId } = useParams();
  const { orgDetails } = location.state || {};

  if (!orgDetails) {
    return <div>No Organization details found. Please navigate back.</div>;
  }

  const [formData, setFormData] = useState({
    orgName: orgDetails.orgName,
    adminName: orgDetails.adminName,
    username: orgDetails.username,
    email: orgDetails.email,
    password: orgDetails.password,
    image: orgDetails.image,
    description: orgDetails.description,
    phoneNo: orgDetails.phone,
    place: orgDetails.place,
  });
  const [orgs, setOrgs] = useState([]);

  //Fetching expert from experts
  useEffect(() => {
    const fetchOrgs = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_MAIN_SERVER_URL}/organization/list`
        );
        setOrgs(response.data.data);
        if (!response.data.data) {
          throw new Error("Failed to fetch orgs");
        }
        const orgs = response.data.data;

        const orgsDetails = orgs.find((org) => org._id === orgId);
        if (orgsDetails) {
          setFormData({
            adminName: orgsDetails.adminName,
            orgName: orgsDetails.orgName,
            username: orgsDetails.username,
            email: orgsDetails.email,
            password: orgsDetails.password,
            place: orgsDetails.place,
            image: orgsDetails.image,
            description: orgsDetails.description,
            phoneNo: orgsDetails.phoneNo,
          });
        } else {
          console.log("org not found");
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchOrgs();
  }, [orgId]);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData({ ...formData, [name]: type === "file" ? files[0] : value });
  };

  //Submitting and editing the details
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    for (const key in formData) {
      formDataToSend.append(key, formData[key]);
    }

    // Log the FormData content
    for (const pair of formDataToSend.entries()) {
      console.log(pair[0], pair[1]);
    }
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_MAIN_SERVER_URL}/organization/${orgId}/edit`,
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.data.success) {
        toast.success("Organization updated successfully!", {
          autoClose: 2000,
        });
        navigate(`/organization/${orgId}`);
      } else {
        toast.error("Failed to update organization details.");
      }
    } catch (error) {
      console.error("Error updating org:", error);
      toast.error(
        error.response?.data?.message || "An error occurred. Please try again."
      );
    }
  };

  return (
    <div className="edit-container">
      <div className="edit-form">
        <div className="form-heading">
          {formData.orgName} organization's profile
        </div>
        <form onSubmit={handleSubmit}>
          <div className="input-row">
            <div className="input-group">
              <label>Org.Name</label>
              <input
                type="text"
                name="orgName"
                value={formData.orgName}
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
              <label>Admin Name</label>
              <input
                type="text"
                name="adminName"
                value={formData.adminName}
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
              <label>Phone No.</label>
              <input
                type="number"
                name="phoneNo"
                value={formData.phoneNo}
                onChange={handleChange}
                min={10}
                required
              />
            </div>
            <div className="input-group">
              <label>Place</label>
              <input
                type="text"
                name="place"
                value={formData.place}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="input-row">
            <div className="input-group">
              <label>Image</label>
              <input type="file" name="image" onChange={handleChange} />
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

export default Orgedit;
