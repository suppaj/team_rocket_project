import React from "react";
import ultraball from "./ultraball.png";
const Product_admin = ({ isAdmin }) => {
  return (
    <div id="product_admin">
      {isAdmin ? (
        <div id="product_admin_display">
          <img className="admin-pokeballs" src={ultraball}></img>
          <div className="admin-title">Products Admin Placeholder</div>
        </div>
      ) : (
        <div className="rejected-display">REJECTED</div>
      )}
    </div>
  );
};

export default Product_admin;
