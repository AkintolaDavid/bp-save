import React, { useState, useEffect, useContext } from "react";
import { IoArrowBack } from "react-icons/io5";

import { Link, useNavigate } from "react-router-dom";
import "./DoctorLogin.css";

import { ShopContext } from "../Context/ShopContext";
import { MdRemoveRedEye } from "react-icons/md";

export const DoctorLogin = () => {
  const navigate = useNavigate();
  const [doctorId, setdoctorId] = useState("");
  const [password, setPassword] = useState("");
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1109);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const { updateUserFullName, updateUserWeight } = useContext(ShopContext);

  const dummyDoctors = [
    { id: "doctor123", password: "password1" }, // Use ppasswords for security
    { id: "doctor456", password: "password2" }, // Use ppasswords for security
    { id: "doctor789", password: "password3" }, // Use ppasswords for security
  ];
  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };
  const handleGoBack = () => {
    navigate("/landingPage"); // Go back to Course Display
  };
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 1109);
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const handleLogin = (e) => {
    console.log("id: doctor123, password: password1");
    e.preventDefault(); // Prevent default form submission behavior

    const matchingDoctor = dummyDoctors.find(
      (doctor) => doctor.id === doctorId && doctor.password === password
    );

    if (matchingDoctor) {
      // Login successful! (Handle successful login logic)
      console.log("Doctor logged in successfully!");
      navigate("/doctor");
      // You can redirect to a doctor dashboard or perform other actions here
    } else {
      alert("Invalid Doctor ID or password!");
    }
  };

  return (
    <>
      {isMobile ? (
        <>
          {" "}
          <div style={{ justifyContent: "left", backgroundColor: "" }}>
            <IoArrowBack className="signup_backarrow" onClick={handleGoBack} />
          </div>
          <div className="mobile_main_container">
            <div className="mobile_itga">
              <span className="welcome_itga"> Doctor Loginpage</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span className="DoctorLogin_username">DOCTOR ID</span>
              <input
                type="text"
                placeholder="Doctor ID"
                className="DoctorLogin_password_input"
                onChange={(e) => setdoctorId(e.target.value)}
              />
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span className="DoctorLogin_password">PASSWORD</span>
              <div className="DoctorLogin_password_input">
                <input
                  type={isPasswordVisible ? "text" : "password"}
                  placeholder="password"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <MdRemoveRedEye
                  onClick={togglePasswordVisibility}
                  style={{ fontSize: "20px" }}
                />
              </div>
            </div>
            <div className="submit_btn">
              <button className="submit_signin" onClick={handleLogin}>
                SIGN IN
              </button>
            </div>
            <div className="remember_forget">
              <div className="remember">
                <input type="checkbox" />
                <span className="remember_text">Remember Me</span>
              </div>
              <Link className="forgot-password-link" to="/forgot-password">
                Forgot Password?
              </Link>
            </div>
          </div>
        </>
      ) : (
        <>
          <div style={{ justifyContent: "left", backgroundColor: "" }}>
            <IoArrowBack className="signup_backarrow" onClick={handleGoBack} />
          </div>
          <div
            className="main_containerr"
            style={{ display: "flex", flexDirection: "column" }}
          >
            <div className="DoctorLogin_container">
              <div className="doc_signup_container"></div>
              <div className="doc_signin_container">
                <span className="DoctorLogin_signin">Doctor Loginpage</span>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <span className="DoctorLogin_username">DOCTOR ID</span>
                  <input
                    type="text"
                    placeholder="Doctor ID"
                    className="DoctorLogin_password_input"
                    onChange={(e) => setdoctorId(e.target.value)}
                  />
                </div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <span className="DoctorLogin_password">PASSWORD</span>
                  <div className="DoctorLogin_password_input">
                    <input
                      type={isPasswordVisible ? "text" : "password"}
                      placeholder="password"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <MdRemoveRedEye
                      onClick={togglePasswordVisibility}
                      style={{ fontSize: "20px" }}
                    />
                  </div>
                </div>
                <button className="submit_signin" onClick={handleLogin}>
                  SIGN IN
                </button>
                <div className="remember_forget">
                  <div className="remember">
                    <input type="checkbox" />
                    <span className="remember_text">Remember Me</span>
                  </div>
                  <Link className="forgot-password-link" to="/forgot-password">
                    Forgot Password?
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};
