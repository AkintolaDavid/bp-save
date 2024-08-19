import { React, useEffect, useState } from "react";
import "./Profile.css";
import { Sidebar } from "../Sidebar/Sidebar";
import { useNavigate } from "react-router-dom";
export const Profile = () => {
  const navigate = useNavigate();
  const initialState = {
    dateOfBirth: "",
    height: "",
  };
  const [userData, setUserData] = useState(initialState);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      console.log("No access token found");
      return;
    }

    console.log(userData);
    alert("User profile updated successfully");
    navigate("/landingpage");
  };

  return (
    <div className="profile_container">
      <Sidebar />
      <div>
        <form onSubmit={handleSave}>
          <div className="prof_container">
            <div className="prof_header">Profile</div>

            <div className="prof_birth">
              <span>Date of birth</span>
              <input
                type="date"
                name="dateOfBirth"
                value={userData.dateOfBirth}
                onChange={handleChange}
              />
            </div>
            <div className="prof_height">
              <span>Height</span>
              <input
                type="number"
                placeholder="cm"
                name="height"
                value={userData.height}
                onChange={handleChange}
              />
            </div>

            <button className="prof_btn">Update</button>
          </div>
        </form>
      </div>
    </div>
  );
};
