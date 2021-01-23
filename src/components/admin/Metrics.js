import React, { useState } from "react";
import pokeball from "./pokeball.png";
import { Modal, Form, Button } from "react-bootstrap";
import {
  getSalesData,
  getSalesDatabyProductID,
  db_getSalesDatabyMonth,
  getTopSalesDatabyMonth,
} from "../../api/index";
const Metrics = ({ isAdmin }) => {
  const [show, setShow] = useState(true);
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
              <Modal.Body id="metrics-body">
                <div id="metrics-pokedex-screen">
                  <table id="top-sales">Top Sales by Product </table>
                  <div id="trends">Monthly Trends</div>
                  <div id="forecast">Forecasted Sales</div>
                  <div id="total-sales">Sales Totals</div>
                  <div id="sales-list">Sales Data</div>
                </div>
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
