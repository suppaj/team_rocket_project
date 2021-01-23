import React, { useState } from "react";
import ultraball from "./ultraball.png";
import { Modal, Form, Button } from "react-bootstrap";
const Product_admin = ({ isAdmin }) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
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
            <Modal
              show={show}
              onHide={handleClose}
              animation={true}
              centered
              className="custom-modals"
            >
              <Modal.Body>
                <div></div>
              </Modal.Body>
            </Modal>
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
