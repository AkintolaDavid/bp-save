import React, { createContext, useState } from "react";

export const ShopContext = createContext(null);

const ShopContextProvider = ({ children }) => {
  const [userCountry, setUserCountry] = useState(
    localStorage.getItem("userCountry") || ""
  );
  const [userLanguage, setUserLanguage] = useState(
    localStorage.getItem("userLanguage") || ""
  );
  const [userFullName, setUserFullName] = useState(() => {
    return localStorage.getItem("userFullName") || "";
  });
  const [userWeight, setUserWeight] = useState(
    localStorage.getItem("userWeight") || 0
  );

  const updateUserFullName = (fullName) => {
    setUserFullName(fullName);
    localStorage.setItem("userFullName", fullName);
  };

  const updateUserWeight = (weight) => {
    setUserWeight(weight);
    localStorage.setItem("userWeight", weight);
  };

  const updateUserCountry = (country) => {
    setUserCountry(country);
    localStorage.setItem("userCountry", country);
  };

  const updateUserLanguage = (language) => {
    setUserLanguage(language);
    localStorage.setItem("userLanguage", language);
  };

  const signOut = () => {
    setUserFullName(""); // Clear user full name
    setUserWeight(0); // Clear user weight
    setUserCountry(""); // Clear user country
    setUserLanguage(""); // Clear user language
    localStorage.removeItem("userFullName"); // Remove from localStorage
    localStorage.removeItem("userWeight"); // Remove from localStorage
    localStorage.removeItem("userCountry"); // Remove from localStorage
    localStorage.removeItem("userLanguage"); // Remove from localStorage
  };

  const contextValue = {
    userFullName,
    userWeight,
    userCountry,
    userLanguage,
    updateUserFullName,
    updateUserWeight,
    updateUserCountry,
    updateUserLanguage,
    signOut,
  };

  return (
    <ShopContext.Provider value={contextValue}>{children}</ShopContext.Provider>
  );
};

export default ShopContextProvider;
