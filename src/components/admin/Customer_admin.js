import React, { useState, useEffect } from "react";
import masterball from "./masterball.png";
import { Modal, Form, Button } from "react-bootstrap";
import { Rejected } from "./index";
import {
  getOrderHistoryByCustomerId,
  getOrderDetailsbyOrderId,
} from "../../api/index";

const Customer_admin = ({ isAdmin }) => {
  const [customerArr, setCustomerArr] = useState([]);
  const [orderHistArr, setOrderHistArr] = useState([]);
  const [orderDetailsArr, setOrderDetailsArr] = useState([]);
  const [selectedCustomerID, setSelectedCustomerID] = useState("");
  const [selectedOrderID, setSelectedOrderID] = useState("");
  const [showCust, setShowCust] = useState(false);

  const handleCloseCust = () => {
    setShowCust(false);
  };
  const handleShowCust = () => {
    setShowCust(true);
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
            onClick={handleShowCust}
          ></img>
          <div className="admin-title">
            Customer Orders
            <div
              className={showCust === true ? "show-admin" : "hide"}
              id="customer-admin-screen"
            >
              <button className="close-button" onClick={handleCloseCust}>
                X
              </button>
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
                            console.log("THIS IS THE CUSTOMER", customer);
                            const {
                              cust_id,
                              first_name,
                              last_name,
                              cust_email,
                              cust_pwd,
                              is_admin,
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

                                {is_admin ? (
                                  <td>{is_admin.toString()}</td>
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
                  <p>Order Details</p>
                  {orderDetailsArr.length ? (
                    orderDetailsArr.map((detail, index) => {
                      const {
                        name,
                        order_price,
                        order_quantity,
                        description,
                        dex_id,
                      } = detail;
                      return (
                        <div
                          className="nes-container is-rounded"
                          key={index}
                          id="order-details-card"
                        >
                          {name ? (
                            <p className="order-details-name">
                              {name.toUpperCase()}
                            </p>
                          ) : null}
                          {description ? (
                            <p className="order-details-description">
                              {description}
                            </p>
                          ) : null}
                          {order_price ? (
                            <p className="order-details-price">
                              ₽{order_price}
                            </p>
                          ) : null}
                          {order_quantity ? (
                            <p className="order-details-quantity">
                              qty: {order_quantity}
                            </p>
                          ) : null}
                          {dex_id ? (
                            <img
                              className="order-details-img"
                              src={`https://github.com/PokeAPI/sprites/blob/master/sprites/pokemon/versions/generation-v/black-white/animated/${dex_id}.gif?raw=true`}
                              alt={`${name}`}
                            ></img>
                          ) : null}
                        </div>
                      );
                    })
                  ) : (
                    <div
                      className="nes-container is-rounded is-dark"
                      id="no-current-details"
                    >
                      <p>
                        No {"data".toUpperCase()} to display! Select an order
                        from the {"order details".toUpperCase()} table!
                      </p>
                      <img
                        className="order-details-img"
                        src={`https://github.com/PokeAPI/sprites/blob/master/sprites/pokemon/versions/generation-v/black-white/animated/24.gif?raw=true`}
                        alt={`arbok`}
                      ></img>
                    </div>
                  )}
                </div>
                <div className="instructions-container">
                  <div
                    className="nes-container is-rounded is-dark"
                    id="cust-instructions"
                  >
                    <p className="prod-instructions-title">
                      {" "}
                      {"Instructions".toUpperCase()}{" "}
                    </p>
                    <p></p>
                    <p>
                      {"Customer Detail".toUpperCase()}: Provides a high level
                      overview of all customers registered on our{" "}
                      {"site".toUpperCase()}!
                    </p>
                    <p>
                      {"Customer Orders".toUpperCase()}: Click on a customer in
                      the {"customer detail".toUpperCase()} table to view that
                      customer's {"order history".toUpperCase()}!
                    </p>
                    <p>
                      {"Order Detail".toUpperCase()}: Displays the details of
                      each customer's individual order. Click on an order in the{" "}
                      {"order history".toUpperCase()} to view.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Rejected />
      )}
    </div>
  );
};

export default Customer_admin;
