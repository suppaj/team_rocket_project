import React, { useState } from "react";
import pokeball from "./pokeball.png";
import { Modal, Form, Button } from "react-bootstrap";

const Metrics = ({ isAdmin }) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <div id="metrics">
      {isAdmin ? (
        <div id="metrics_display">
          <img
            className="admin-pokeballs"
            src={pokeball}
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
                Woohoo, you're reading this text in a modal!
              </Modal.Body>
            </Modal>
            Metrics
          </div>
        </div>
      ) : (
        <div className="rejected-display">REJECTED</div>
      )}
    </div>
  );
};

export default Metrics;
