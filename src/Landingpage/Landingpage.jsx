import React from "react";
import "./Landingpage.css";
import { Sidebar } from "../Sidebar/Sidebar";
import { Content } from "../Content/Content";
export const Landingpage = () => {
  return (
    <>
      <div className="container">
        <Sidebar />
        <Content />
      </div>
    </>
  );
};
