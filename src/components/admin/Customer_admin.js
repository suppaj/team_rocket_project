import React from "react";
import masterball from "./masterball.png";

const Customer_admin = ({ isAdmin }) => {
  return (
    <div id="customer_admin">
      {isAdmin ? (
        <div id="customer_admin_display">
          <img className="admin-pokeballs" src={masterball}></img>
          <div className="admin-title">Customer Admin Placeholder</div>
        </div>
      ) : (
        <div className="rejected-display">REJECTED</div>
      )}
    </div>
  );
};

export default Customer_admin;
