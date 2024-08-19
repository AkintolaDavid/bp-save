import React, { useState, useEffect, useContext } from "react";
import "./Acc_setting.css";
import { Sidebar } from "../Sidebar/Sidebar";
import ReactFlagsSelect from "react-flags-select";
import { ShopContext } from "../Context/ShopContext"; // Adjust the path as needed

export const Accsetting = () => {
  const { userCountry, userLanguage, updateUserCountry, updateUserLanguage } =
    useContext(ShopContext);

  const [selectedCountry, setSelectedCountry] = useState(userCountry); // Initialize with context value
  const [selectedLanguage, setSelectedLanguage] = useState(userLanguage); // Initialize with context value

  const options = [
    "English",
    "Spanish",
    "Mandarin Chinese",
    "Hindi",
    "Arabic",
    "Portuguese",
    "Bengali",
    "Russian",
    "Japanese",
    "German",
    "French",
    "Korean",
    "Javanese",
    "Vietnamese",
    "Telegu",
    "Marathi",
    "Tamil",
    "Italian",
    "Turkish",
    "Thai",
  ];

  useEffect(() => {
    setSelectedCountry(userCountry); // Update local state when context changes
    setSelectedLanguage(userLanguage); // Update local state when context changes
  }, [userCountry, userLanguage]);

  const handleLanguageChange = (event) =>
    setSelectedLanguage(event.target.value);

  const handleSave = async () => {
    updateUserCountry(selectedCountry); // Use context function
    updateUserLanguage(selectedLanguage); // Use context function
    alert("Account setting saved successfully");
    console.log("Preferences saved!"); // Placeholder message
  };

  return (
    <div className="acc_setting_container">
      <Sidebar />
      <div className="acc_container">
        <div className="acc_header">Account settings</div>
        <div className="acc_country">
          <span className="acc_country_span">Country</span>
          <ReactFlagsSelect
            selected={selectedCountry} // Bind directly to selectedCountry
            onSelect={(code) => setSelectedCountry(code)}
            placeholder="Search countries"
            searchable
            searchPlaceholder="Search countries"
            className="menuflags"
          />
        </div>
        <div className="acc_language">
          <span className="acc_language_span">Pick preferred language</span>
          <select
            value={selectedLanguage} // Use value instead of selected
            onChange={handleLanguageChange} // Use onChange instead of onSelect
            className="acc_lang_select"
          >
            {options.map((option, i) => (
              <option key={i} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <button className="acc_btn" onClick={handleSave}>
          Save
        </button>
      </div>
    </div>
  );
};
