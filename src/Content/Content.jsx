import React from "react";
import { useState, useContext, useEffect } from "react";

import "./Content.css";
import { FaHeart } from "react-icons/fa";
import { IoScaleOutline } from "react-icons/io5";
import { HiOutlinePencil } from "react-icons/hi2";
import { FaPlus } from "react-icons/fa6";
import { SlCalender } from "react-icons/sl";
import { FaClock } from "react-icons/fa6";
import { Modal, ModalContent, ModalBody } from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import { ShopContext } from "../Context/ShopContext";
export const Content = () => {
  const { userFullName, userWeight } = useContext(ShopContext);

  // const [weight] = useState(userWeight);
  const [goalWeight, setGoalWeight] = useState(
    localStorage.getItem("goalWeight") || "--"
  );
  const [lastWeight, setLastWeight] = useState(
    localStorage.getItem("lastWeight") || userWeight
  );
  const [isGoalEditable, setIsGoalEditable] = useState(false);
  const [date] = useState(new Date().toLocaleDateString());
  const [time] = useState(new Date().toLocaleTimeString());
  // const [weight, setWeight] = useState("--");
  const [systolic, setSystolic] = useState(
    localStorage.getItem("systolic") || "--"
  ); // Initialize to empty string
  const [diastolic, setDiastolic] = useState(
    localStorage.getItem("diastolic") || "--"
  ); // Initialize to empty string
  const [pulse, setPulse] = useState(localStorage.getItem("pulse") || "--"); // Initialize to empty string
  useEffect(() => {
    localStorage.setItem("goalWeight", goalWeight);
    localStorage.setItem("lastWeight", lastWeight);
    localStorage.setItem("systolic", systolic);
    localStorage.setItem("diastolic", diastolic);
    localStorage.setItem("pulse", pulse);
  }, [goalWeight, lastWeight, systolic, diastolic, pulse]);
  const handleweightSave = async () => {
    handleCloseModal(); // Close the modal after saving
  };
  const goalhandler = () => {
    setIsGoalEditable(!isGoalEditable); // Toggle isGoalEditable state
  };
  const handleSave = async () => {
    const isEmptyField = [systolic, diastolic, pulse, date, time].some(
      (value) => !value
    );
    if (isEmptyField) {
      console.error("Please fill in all fields");
      return;
    }

    const dataToSend = { systolic, diastolic, pulse, date, time };

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found in localStorage");
        return;
      }

      console.log("Retrieved token:", token); // Debug log

      const response = await fetch("/api/blood-pressure", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(dataToSend),
      });

      if (response.ok) {
        console.log("Blood pressure readings saved successfully!");
      } else {
        console.error(
          "Failed to save blood pressure readings:",
          await response.text()
        );
      }
    } catch (error) {
      console.error("Error saving blood pressure readings:", error);
    }
    handleCloseModal();
  };

  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    const today = new Date();
    const options = { year: "numeric", month: "long", day: "numeric" }; // Format options
    const formattedDate = today.toLocaleDateString("en-US", options); // Locale-specific formatting
    setCurrentDate(formattedDate); // Update state with formatted date
  }, []);
  const progressPercentage = ((lastWeight - goalWeight) / userWeight) * 100;
  const finalRef = React.useRef(null);
  const [activeModal, setActiveModal] = useState(null); // Track currently active modal (notification or message)
  const notificationDisclosure = useDisclosure();
  const handleCloseModal = () => {
    setActiveModal(null); // Reset active modal state
    notificationDisclosure.onClose();
  };
  const handleWeight = () => {
    setActiveModal("weight");
    notificationDisclosure.onOpen();
  };
  const handlebp = () => {
    setActiveModal("bp");
    notificationDisclosure.onOpen();
  };
  const [showBloodPressure, setShowBloodPressure] = useState(true);
  const [showWeight, setShowWeight] = useState(false);

  const handleToggleBloodPressure = () => {
    setShowBloodPressure(true);
    // Ensure at least one section is shown by toggling weight if necessary
    setShowWeight(false);
  };

  const handleToggleWeight = () => {
    setShowWeight(true);
    // Ensure at least one section is shown by toggling blood pressure if necessary
    setShowBloodPressure(false);
  };
  function calculateHypertensionGrade(systolic, diastolic) {
    if (systolic >= 210 || diastolic >= 200) {
      return "Enter valid input";
    } else if (systolic >= 180 && diastolic >= 110) {
      return "Hypertensive Crisis";
    } else if (systolic >= 160 && diastolic >= 100) {
      return "Stage 2 Hypertension";
    } else if (systolic >= 140 && diastolic >= 90) {
      return "Stage 1 Hypertension";
    } else if (systolic >= 120 && diastolic >= 80) {
      return "Elevated blood pressure";
    } else if (systolic >= 90 && diastolic >= 60) {
      return "Normal blood pressure";
    } else if (systolic >= 210 || diastolic >= 200) {
      return "Enter valid input";
    } else {
      return "No reading";
    }
  }
  function calculatePulseGrade(pulse) {
    if (pulse >= 100) {
      return "high pulse";
    } else if (pulse >= 70 && pulse < 100) {
      return "normal pulse";
    } else if (pulse < 70) {
      return "low pulse";
    } else {
      return "No reading";
    }
  }
  const hypertensionGrade = calculateHypertensionGrade(systolic, diastolic);
  const pulsegrade = calculatePulseGrade(pulse);

  return (
    <main className="content">
      <div className="welcome_user">Welcome {userFullName.toUpperCase()}</div>
      <div className="btn_container">
        <button onClick={handleToggleBloodPressure} className="bp_btn">
          <FaHeart />
          Blood Pressure
        </button>
        <button onClick={handleToggleWeight} className="weight_btn">
          <IoScaleOutline />
          Weight
        </button>
      </div>
      {showBloodPressure && (
        <div className="bp_section">
          <h2>Blood Pressure Section</h2>

          <div className="bp_reading">
            <div className="sys_dia">
              <div className="sys">
                <span className="sys_name">Systolic</span>
                <span className="sys_num">{systolic}</span>
                <span className="sys_val">mmHg</span>
              </div>
              <div className="dia">
                <span className="sys_name">Diastolic</span>
                <span className="sys_num">{diastolic}</span>
                <span className="sys_val">mmHg</span>
              </div>
            </div>

            <div className="pulse">
              <span className="pulse_name">Pulse</span>
              <span className="pulse_num">{pulse}</span>
              <span className="pulse_val">Beats/min</span>
            </div>
          </div>
          <div className="grade">
            <span>Blood Pressure-{hypertensionGrade}</span>
            <span>Pulse Reading-{pulsegrade}</span>
          </div>
          <div className="manual_read_container">
            <button className="manual_read_btn" onClick={handlebp}>
              <FaPlus className="addicon" /> Manual reading
            </button>
          </div>
          {activeModal === "bp" ? (
            <div className="modalcontainer">
              {" "}
              <Modal
                finalFocusRef={finalRef}
                isOpen={notificationDisclosure.isOpen}
                onClose={handleCloseModal}
              >
                <ModalContent className="modalcontent">
                  <ModalBody className="modalbody">
                    <div className="modalheader">
                      <span
                        style={{ cursor: "pointer" }}
                        onClick={handleCloseModal}
                      >
                        Cancel
                      </span>
                      <span style={{ cursor: "pointer" }} onClick={handleSave}>
                        Save
                      </span>
                    </div>
                    <div className="bp_addweightreading">Add bp reading</div>
                    <div className="bp_model_input">
                      <div className="bp_date">Date:</div>{" "}
                      <div className="bp_date_input">
                        {date} <SlCalender />
                      </div>
                    </div>
                    <div className="bp_model_input">
                      <div className="bp_time">Time:</div>{" "}
                      <div className="bp_time_input">
                        {time} <FaClock />
                      </div>
                    </div>
                    <div className="bp_model_input">
                      <div className="bp_systolic">
                        Systolic<span>(upper number)</span>
                      </div>{" "}
                      <div className="bp_weight_input">
                        {" "}
                        <input
                          type="number"
                          value={systolic}
                          onChange={(e) => setSystolic(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="bp_model_input">
                      <div className="bp_diastolic">
                        Diastolic<span>(lower number)</span>
                      </div>{" "}
                      <div className="bp_weight_input">
                        {" "}
                        <input
                          type="number"
                          value={diastolic}
                          onChange={(e) => setDiastolic(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="bp_model_input">
                      <div className="bp_pulse">Pulse:</div>{" "}
                      <div className="bp_weight_input">
                        {" "}
                        <input
                          type="number"
                          value={pulse}
                          onChange={(e) => setPulse(e.target.value)}
                        />
                      </div>
                    </div>
                  </ModalBody>
                </ModalContent>
              </Modal>
            </div>
          ) : (
            <div></div>
          )}
        </div>
      )}
      {showWeight && (
        <div className="weight_overall">
          <div className="currentreading">Current reading: {currentDate}</div>
          <div className="weightdisplay">
            {" "}
            {lastWeight ? lastWeight : userWeight}kg
          </div>
          <div className="weightcontainer">
            <div className="calculated_weight">
              <div className="goal_weight">
                {isGoalEditable ? (
                  <>
                    <input
                      style={{
                        width: "60px",
                        height: "30px",
                        fontSize: "20px",
                      }}
                      type="number"
                      value={goalWeight}
                      onChange={(event) => setGoalWeight(event.target.value)} // Update goalWeight state on input change
                    />
                    <button
                      style={{
                        width: "50px",
                        height: "35px",
                        fontSize: "15px",
                      }}
                      onClick={goalhandler}
                    >
                      save
                    </button>
                  </>
                ) : (
                  <span>{goalWeight}kg</span> // Display current goal weight when not editing
                )}
              </div>
              <div className="last_reading_weight">
                {lastWeight ? lastWeight : userWeight}kg
              </div>
              <div className="start_reading_weight">{userWeight}kg</div>
            </div>
            <div className="text_reading">
              <div className="goal_text" onClick={goalhandler}>
                Goal <HiOutlinePencil />
              </div>
              <div className="last_reading_text">
                <span>Present reading</span>
                <span>{currentDate}</span>
              </div>
              <div className="start_reading_text">
                <span>Starting weight</span>
                <span>{currentDate}</span>
              </div>
            </div>
          </div>

          <div className="barcontainer">
            <div className="text_barcontainer">
              <div className="barcontainer_starting">
                <span>Starting weight</span>
                <span>{lastWeight}kg</span>
              </div>
              <div className="weight_barcontainer">
                <span>Goal weight</span>
                <span>{goalWeight}kg</span>
              </div>
            </div>
            <div className="progress_bar_container">
              <div
                className="progress_bar_2"
                style={{ width: `${100 - progressPercentage}%` }}
              ></div>
              <div
                className="progress_bar"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
          </div>
          <div className="weights_away">
            {lastWeight - goalWeight}kg away from your goal
          </div>
          <div className="addweightbtn">
            {" "}
            <button onClick={handleWeight}>
              {" "}
              <FaPlus className="addicon" /> Add weight
            </button>
          </div>
          {activeModal === "weight" ? (
            <div className="modalcontainer">
              {" "}
              <Modal
                finalFocusRef={finalRef}
                isOpen={notificationDisclosure.isOpen}
                onClose={handleCloseModal}
              >
                <ModalContent className="modalcontent">
                  <ModalBody className="modalbody">
                    <div className="modalheader">
                      <span
                        style={{ cursor: "pointer" }}
                        onClick={handleCloseModal}
                      >
                        Cancel
                      </span>
                      <span
                        style={{ cursor: "pointer" }}
                        onClick={handleweightSave}
                      >
                        Save
                      </span>
                    </div>
                    <div className="wei_addweightreading">
                      Add weight reading
                    </div>
                    <div className="wei_model_input">
                      <div className="wei_date">Date:</div>{" "}
                      <div className="wei_date_input">
                        {date} <SlCalender />
                      </div>
                    </div>
                    <div className="wei_model_input">
                      <div className="wei_time">Time:</div>{" "}
                      <div className="wei_time_input">
                        {time} <FaClock />
                      </div>
                    </div>
                    <div className="wei_model_input">
                      <div className="wei_weight">Weight in Kg:</div>{" "}
                      <div className="bp_weight_input">
                        {" "}
                        <input
                          type="number"
                          value={lastWeight}
                          onChange={(e) => setLastWeight(e.target.value)}
                        />
                      </div>
                    </div>
                  </ModalBody>
                </ModalContent>
              </Modal>
            </div>
          ) : (
            <div></div>
          )}
        </div>
      )}
    </main>
  );
};
