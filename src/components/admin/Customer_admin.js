import React, { useState, useEffect } from "react";
import masterball from "./masterball.png";
import { Modal, Form, Button } from "react-bootstrap";
import {
  getOrderHistoryByCustomerId,
  getOrderDetailsbyOrderId,
} from "../../api/index";

const Customer_admin = ({ isAdmin }) => {
  const [show, setShow] = useState(true);
  const [customerArr, setCustomerArr] = useState([]);
  const [orderHistArr, setOrderHistArr] = useState([]);
  const [selectedCustomerID, setSelectedCustomerID] = useState();
  const [selectedOrderID, setSelectedOrderID] = useState();
  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
    const customers = JSON.parse(window.localStorage.getItem("customer_array"));
    setCustomerArr(customers);
  };

  //   const retrieveCustomers = () => {
  //     const customers = JSON.parse(window.localStorage.getItem("customer_array"));
  //     console.log("inside of retrieve customers, this is customers", customers);
  //     setCustomerArr(customers);
  //   };

  const handleHistoryRequest = () => {
    const history = JSON.parse(window.localStorage.getItem("order_history"));
    setOrderHistArr(history);
  };

  useEffect(() => {
    if (selectedCustomerID !== null) {
      getOrderHistoryByCustomerId(selectedCustomerID)
        .then((response) => {
          window.localStorage.setItem(
            "order_history",
            JSON.stringify(response.orders)
          );

          handleHistoryRequest();
        })

        .catch((error) => {
          console.error(error);
        });
    }
  }, [selectedCustomerID]);

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
                      <tbody>
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
                                <tr
                                  className="customer-rows"
                                  key={index}
                                  onClick={() => {
                                    setSelectedCustomerID(cust_id);
                                  }}
                                >
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
                      </tbody>
                    </table>
                  </div>
                  <div id="customer-orders">
                    <table>
                      <tbody>
                        <tr>
                          <th>Customer ID</th>
                          <th>Order ID</th>
                          <th>Order Date</th>
                        </tr>
                        {orderHistArr.length > 0
                          ? orderHistArr.map((order, index) => {
                              const { order_id, cust_id, order_date } = order;
                              return (
                                <tr
                                  key={index}
                                  onClick={() => {
                                    console.log("I have been clicked");
                                  }}
                                >
                                  <td>{order_id}</td>
                                  <td>{cust_id}</td>
                                  <td>{order_date}</td>
                                </tr>
                              );
                            })
                          : null}
                      </tbody>
                    </table>
                  </div>
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
