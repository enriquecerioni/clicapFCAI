import React from "react";
import "./importantDate.css";

export const ImportantDateCard = ({ date }) => {

  return (
    <div className="importantDate-card d-flex align-items-center">
      <div className="circle-icon-imp-date center-center">
        <i
          className="fa-solid fa-circle-exclamation fa-2x"
          style={{ color: "#86E5FF" }}
        ></i>
      </div>
      <div className="ms-3">
        <p className="m-0 imp-date-title">{date.title}</p>
        <p className="m-0 imp-date-description">{date.description}</p>
      </div>
    </div>
  );
};
