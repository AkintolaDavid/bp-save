import { React, useState, useEffect } from "react";
import "./Sidebar.css";
import { FaUserDoctor } from "react-icons/fa6";
import { HiHome } from "react-icons/hi2";
import { IoSettingsSharp } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { HiOutlineLogout } from "react-icons/hi";
import { Link } from "react-router-dom";

export const Sidebar = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 640);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 640);
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const handleLogout = () => {
    localStorage.removeItem("authToken"); // Remove JWT from local storage
    // setUser(null);
    localStorage.removeItem("userWeight");
    localStorage.removeItem("goalWeight");
    localStorage.removeItem("lastWeight");
    localStorage.removeItem("systolic");
    localStorage.removeItem("diastolic");
    localStorage.removeItem("pulse");
    window.location.href = "/"; // Redirect to login page
  };
  return (
    <>
      {isMobile ? (
        <>
          <div className="mobile_sidebar">
            <div>
              <div className="mobile_sidebar_con">
                <div>
                  <Link to="/landingpage">
                    {" "}
                    <HiHome />
                  </Link>
                </div>
              </div>

              <div className="mobile_sidebar_con">
                <div>
                  <Link to="/acc_setting">
                    <CgProfile />
                  </Link>
                </div>
              </div>
              <div className="mobile_sidebar_con">
                <div>
                  <Link to="/profile">
                    <IoSettingsSharp />
                  </Link>
                </div>
              </div>
              <div className="mobile_sidebar_con">
                <div>
                  <Link to="/doctorlogin">
                    {" "}
                    <FaUserDoctor />
                  </Link>
                </div>
              </div>
              <div className="mobile_sidebar_con">
                <div onClick={handleLogout}>
                  <HiOutlineLogout />
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="sidebar">
            <h2>BP SAVE</h2>
            <div>
              <div className="sidebar_con">
                <HiHome />
                <div>
                  <Link to="/landingpage">Dashboard</Link>
                </div>
              </div>

              <div className="sidebar_con">
                <CgProfile />
                <div>
                  <Link to="/acc_setting">Account Setting</Link>
                </div>
              </div>
              <div className="sidebar_con">
                <IoSettingsSharp />
                <div>
                  <Link to="/profile">Profile</Link>
                </div>
              </div>
              <div className="sidebar_con">
                <FaUserDoctor />
                <div>
                  <Link to="/doctorlogin">Doctor's View</Link>
                </div>
              </div>
              <div className="sidebar_con">
                <HiOutlineLogout style={{ marginLeft: "0px" }} />
                <div
                  onClick={handleLogout}
                  style={{ marginLeft: "10px", fontWeight: "600" }}
                >
                  Logout
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};
