import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { getAllCustomers } from "../../api/index";
import { Customer_admin, Metrics, Product_admin } from "./index";
import { Navbar, NavDropdown, Button } from "react-bootstrap";
const Admin = ({ isAdmin }) => {
  //   const [customerArr, setCustomerArr] = useState();

  const handleCustomers = (response) => {
    window.localStorage.setItem("customer_array", JSON.stringify(response));
  };

  //   const retrieveCustomers = () => {
  //     const customers = JSON.parse(window.localStorage.getItem("customer_array"));
  //     console.log("inside of retrieve customers, this is customers", customers);
  //     setCustomerArr(customers);
  //   };

  useEffect(() => {
    console.log("testing admin persist", isAdmin);
  }, [isAdmin]);

  useEffect(() => {
    getAllCustomers()
      .then((response) => {
        console.log("these are all users", response.customers);
        const customers = response.customers;
        if (customers) {
          // setCustomerArr(response.customers);
          handleCustomers(customers);
          // retrieveCustomers();
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div id="admin">
      {isAdmin ? (
        <div id="admin-display">
          <Router>
            <div>
              <Switch>
                <Route path="/customer_admin">
                  <Customer_admin isAdmin={isAdmin} />
                </Route>
                <Route path="/product_admin">
                  <Product_admin isAdmin={isAdmin} />
                </Route>
                <Route path="/metrics">
                  <Metrics isAdmin={isAdmin} />
                </Route>
              </Switch>
            </div>
          </Router>
          <div id="admin_container">
            <Customer_admin isAdmin={isAdmin} />
            <Product_admin isAdmin={isAdmin} />
            <Metrics isAdmin={isAdmin} />
          </div>

          <div id="admin-label" className="nes-container is-rounded is-dark">
            <p>Choose your starting {"dashboard".toUpperCase()}! </p>
          </div>
        </div>
      ) : (
        <div className="rejected-display">REJECTED</div>
      )}
    </div>
  );
};

export default Admin;
