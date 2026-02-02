import { useEffect, useState } from "react";
import axios from "axios";
import "./profile.css";
import Navbar from "../Navbar";
import { BookIcon, RepoIcon } from "@primer/octicons-react";
import { useAuth } from "../../authContext";
import HeatMapProfile from "./HeatMap";

const Profile = () => {
  const [userDetails, setUserDetails] = useState({ username: "Username" });
  const { setCurrentUser } = useAuth();

  useEffect(() => {
    const fetchUserDetails = async () => {
      const userId = localStorage.getItem("userId");

      if (userId) {
        try {
          const response = await axios.get(
            `http://localhost:3002/userProfile/${userId}`
          );
          setUserDetails(response.data);
        } catch (err) {
          console.error("Cannot fetch user details:", err);
        }
      }
    };

    fetchUserDetails();
  }, []);

  return (
    <div className="profile-container">
      <Navbar/>

      {/* Tabs */}
      <div className="profile-tabs">
        <button className="tab active">
          <BookIcon size={18} />
          <span> <b> Overview</b></span>
        </button>

        <button className="tab">
          <RepoIcon size={18} />
          <span> <b>Starred Repositories</b></span>
        </button>

        {/* <button className="tab"
          onClick={() => {
            localStorage.removeItem("token");
            localStorage.removeItem("userId");
            setCurrentUser(null);

            window.location.href = "/auth";
          }}
          
        >
         Logout
        </button> */}
      </div>

      {/* Main Content */}
      <div className="profile-main">

        {/* Left Profile Card */}
        <div className="profile-card">
          <div className="avatar"></div>

          <h2 className="username">{userDetails?.username}</h2>

          <button className="follow-btn"> 
            <b>Follow</b>
          </button>

          <div className="follow-stats">
            <span>
              <b>10 Followers</b> 
            </span>
            <span>
              <b>3 Following</b> 
            </span>
          </div>

        </div>

        {/* Right Heatmap */}
        <div className="heat-map-section">
          <HeatMapProfile />
        </div>
      </div>
    </div>
  );
};

export default Profile;
