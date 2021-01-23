import React, { useState, useEffect } from "react";
import masterball from "./masterball.png";
import { Modal, Form, Button } from "react-bootstrap";
import {
  getOrderHistoryByCustomerId,
  getOrderDetailsbyOrderId,
} from "../../api/index";

const Customer_admin = ({ isAdmin }) => {
  const [show, setShow] = useState(false);
  const [customerArr, setCustomerArr] = useState([]);
  const [orderHistArr, setOrderHistArr] = useState([]);
  const [orderDetailsArr, setOrderDetailsArr] = useState([]);
  const [selectedCustomerID, setSelectedCustomerID] = useState();
  const [selectedOrderID, setSelectedOrderID] = useState();
  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
    const customers = JSON.parse(window.localStorage.getItem("customer_array"));
    setCustomerArr(customers);
  };

  const handleHistoryRequest = () => {
    const history = JSON.parse(window.localStorage.getItem("order_history"));
    setOrderHistArr(history);
  };

  const handleDetailsRequest = () => {
    const details = JSON.parse(window.localStorage.getItem("order_detail"));
    setOrderDetailsArr(details);
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

  useEffect(() => {
    if (selectedOrderID !== null) {
      getOrderDetailsbyOrderId(selectedOrderID)
        .then((response) => {
          window.localStorage.setItem(
            "order_detail",
            JSON.stringify(response.details)
          );

          handleDetailsRequest();
        })

        .catch((error) => {
          console.error(error);
        });
    }
  }, [selectedOrderID]);

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
            Customer Orders
            <Modal
              show={show}
              onHide={handleClose}
              animation={true}
              className="custom-modals"
            >
              <Modal.Body className="poke-body" id="customer-portal-modal">
                <div id="customer-pokedex-screen">
                  <div id="customer-screen" className="nes-table-responsive">
                    <table
                      id="customer-list"
                      className="nes-table is-bordered is-centered"
                    >
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
                                  {cust_id ? <td>{cust_id}</td> : null}
                                  {first_name ? <td>{first_name}</td> : null}
                                  {last_name ? <td>{last_name}</td> : null}
                                  {cust_email ? <td>{cust_email}</td> : null}
                                  {cust_pwd ? <td>{cust_pwd}</td> : null}
                                  {isadmin ? (
                                    <td>{isadmin.toString()}</td>
                                  ) : (
                                    <td>false</td>
                                  )}
                                </tr>
                              );
                            })
                          : null}
                      </tbody>
                    </table>
                  </div>
                  <div id="customer-orders" className="nes-table-responsive">
                    <table
                      id="customer-orders-table"
                      className="nes-table is-bordered is-centered"
                    >
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
                                  className="customer-rows"
                                  key={index}
                                  onClick={() => {
                                    setSelectedOrderID(order_id);
                                  }}
                                >
                                  <td>{cust_id}</td>
                                  <td>{order_id}</td>
                                  <td>{order_date}</td>
                                </tr>
                              );
                            })
                          : null}
                      </tbody>
                    </table>
                  </div>
                  <div id="current-customer-order-details">
                    <p></p>
                    {orderDetailsArr
                      ? orderDetailsArr.map((detail, index) => {
                          const {
                            name,
                            order_price,
                            order_quantity,
                            description,
                          } = detail;
                          return (
                            <div class="nes-container is-rounded" key={index}>
                              <p>{name}</p>
                              {description ? <p>{description}</p> : null}
                              {order_price ? <p>₽{order_price}</p> : null}
                              {order_quantity ? (
                                <p>qty: {order_quantity}</p>
                              ) : null}
                            </div>
                          );
                        })
                      : null}
                  </div>
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
