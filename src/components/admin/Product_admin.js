import React, { useState } from "react";
import ultraball from "./ultraball.png";
import { Modal, Form, Button } from "react-bootstrap";
import { Search } from "./index";

const Product_admin = ({ isAdmin }) => {
  const [showMetrics, setShowMetrics] = useState(false);
  const handleClose = () => setShowMetrics(false);
  const handleShow = () => setShowMetrics(true);
  return (
    <div id="product_admin">
      {isAdmin ? (
        <div id="product_admin_display">
          <img
            className="admin-pokeballs"
            src={ultraball}
            onClick={handleShow}
          ></img>
          <div className="admin-title">
            <div className={showMetrics === true ? "show" : "hide"}>
              <button className="close-button" onClick={handleClose}>
                X
              </button>
              <div>temp holder</div>
            </div>
            Products
          </div>
        </div>
      ) : (
        <div className="rejected-display">REJECTED</div>
      )}
    </div>
  );
};

export default Product_admin;
