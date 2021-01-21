import React, { useState, useEffect } from "react";
import masterball from "./masterball.png";
import { Modal, Form, Button } from "react-bootstrap";

const Customer_admin = ({ isAdmin }) => {
  const [show, setShow] = useState(false);
  const [customerArr, setCustomerArr] = useState();
  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
    const customers = JSON.parse(window.localStorage.getItem("customer_array"));
    setCustomerArr(customers);
  };

  const retrieveCustomers = () => {
    const customers = JSON.parse(window.localStorage.getItem("customer_array"));
    console.log("inside of retrieve customers, this is customers", customers);
    setCustomerArr(customers);
  };

  return (
    <div id="customer_admin">
      {isAdmin ? (
        <div id="customer_admin_display">
          <img
            className="admin-pokeballs"
            src={masterball}
            onClick={handleShow}
          ></img>
          <div className="admin-title">
            Customer Portal
            <Modal
              show={show}
              onHide={handleClose}
              animation={true}
              className="custom-modals"
            >
              <Modal.Body className="poke-body" id="customer-portal-modal">
                <div id="customer-pokedex-screen">
                  <div id="customer-screen">
                    <table id="customer-list">
                      <tr>
                        <th>ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Password</th>
                        <th>Admin?</th>
                      </tr>
                      {customerArr
                        ? customerArr.map((customer, index) => {
                            const {
                              cust_id,
                              first_name,
                              last_name,
                              cust_email,
                              cust_pwd,
                              isadmin,
                            } = customer;
                            return (
                              <tr className="customer-rows" key={index}>
                                <td>{cust_id}</td>
                                <td>{first_name}</td>
                                <td>{last_name}</td>
                                <td>{cust_email}</td>
                                <td>{cust_pwd}</td>
                                <td>{isadmin}</td>
                              </tr>
                            );
                          })
                        : null}
                    </table>
                  </div>
                  <div id="customer-orders">placeholder customer orders</div>
                  <div id="current-customer-cart">update customer info</div>
                </div>
              </Modal.Body>
            </Modal>
          </div>
        </div>
      ) : (
        <div className="rejected-display">REJECTED</div>
      )}
    </div>
  );
};

export default Customer_admin;
