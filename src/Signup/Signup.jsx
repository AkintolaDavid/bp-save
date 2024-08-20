import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import { ShopContext } from "../Context/ShopContext";
import { useContext } from "react";
import "./Signup.css";
export const Signup = () => {
  const [users, setUsers] = useState([]);
  const { updateUserWeight, userWeight } = useContext(ShopContext);
  const storedToken = localStorage.getItem("token");
  const navigate = useNavigate();
  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch(
        // "https://bp-server-1.onrender.com/api/users"
        "/api/users"
        // {
        //   method: "GET",
        //   headers: {
        //     "Content-Type": "application/json",
        //   },
        // }
      );
      const fetchedUsers = await response.json();
      setUsers(fetchedUsers);
    };

    fetchUsers();
  }, []);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    dateOfBirth: "",
    height: "",
    weight: "",
    gender: "",

    password: "",
    confirmPassword: "",
    agreeTerms: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // Check if passwords match when changing confirmPassword field
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Check if any field is empty
    const isEmptyField = Object.values(formData).some((value) => !value);
    if (isEmptyField) {
      alert("Please fill in all fields");
      return;
    }

    // Check if password is at least 6 characters long
    if (formData.password.length < 6) {
      alert("Password must be at least 6 characters long");
      return;
    }

    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    // Check if phone number is already in use
    const existingUser =
      Array.isArray(users) &&
      users.find((user) => user.phoneNumber === formData.phoneNumber);

    if (existingUser) {
      alert("Phone number is already in use");
      return;
    }

    try {
      const response = await fetch(
        // "https://bp-server-1.onrender.com/api/signup",
        "/api/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      if (response.ok) {
        // Signup successful, you can redirect the user or show a success message
        alert("User signed up successfully!");
        navigate("/");
      } else {
        // Signup failed, handle error

        alert("Signup failed:", response.statusText);
      }
    } catch (error) {
      alert("Error:", error);
    }
  };
  const handleGoBack = () => {
    navigate("/"); // Go back to Course Display
  };

  return (
    <div className="signup_main">
      <div>
        <IoArrowBack className="signup_backarrow" onClick={handleGoBack} />
      </div>
      <div className="signup_main_container">
        <span className="signup_text">SIGN UP</span>
        <form onSubmit={handleSubmit}>
          <div className="signup_firstname">
            <span>First Name</span>
            <input
              type="text"
              placeholder="First Name"
              className="signup_firstname_input"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
            />
          </div>
          <div className="signup_lastname">
            <span>Last Name</span>
            <input
              type="text"
              placeholder="Last Name"
              className="signup_lastname_input"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
            />
          </div>

          <div className="signup_phone_number">
            <span>Phone Number</span>
            <input
              type="number"
              placeholder="Enter Phone Number"
              className="signup_phone_number_input"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
            />
          </div>
          <div className="signup_email">
            <span>E-mail</span>
            <input
              type="email"
              placeholder="E-mail"
              className="signup_email_input"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="signup_birth">
            <span>Date Of Birth</span>
            <input
              type="date"
              name="dateOfBirth"
              className="signup_dob_input"
              value={formData.dateOfBirth}
              onChange={handleChange}
            />
          </div>
          <div className="signup_height">
            <span>Height</span>
            <input
              type="number"
              placeholder="height in cm"
              value={formData.height}
              onChange={handleChange}
              name="height"
            />
          </div>
          <div className="signup_weight">
            <span>Weight</span>
            <input
              type="number"
              placeholder="weight in KG"
              value={formData.weight}
              onChange={handleChange}
              name="weight"
            />
          </div>
          <div className="signup_gender">
            <span>Gender</span>

            <div style={{ display: "flex", gap: "20px", marginLeft: "60px" }}>
              Male
              <input
                type="radio"
                id="male"
                name="gender"
                value="male"
                checked={formData.gender === "male"}
                onChange={(e) =>
                  setFormData({ ...formData, gender: e.target.value })
                }
              />
              Female
              <input
                type="radio"
                id="female"
                name="gender"
                value="female"
                checked={formData.gender === "female"}
                onChange={(e) =>
                  setFormData({ ...formData, gender: e.target.value })
                }
              />
            </div>
          </div>
          <div className="signup_password">
            <span>Password</span>
            <input
              type="password"
              placeholder="Enter Password"
              className="signup_password_input"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <div className="signup_confirm_password">
            <span>Confirm password</span>
            <input
              type="password"
              placeholder="Confirm Password"
              className="signup_confirm_password_input"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </div>
          <div className="signup_agree">
            <input
              type="checkbox"
              name="agreeTerms"
              checked={formData.agreeTerms}
              onChange={handleChange}
            />
            <span className="agree_text">
              You agree to our terms and privacy policy
            </span>
          </div>

          <div className="submit_signup_btn">
            <button type="submit" className="submit_signup">
              SIGN UP
            </button>
          </div>
        </form>{" "}
      </div>
    </div>
  );
};
