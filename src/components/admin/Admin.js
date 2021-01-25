import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { getAllCustomers, getSalesData } from "../../api/index";
import { Customer_admin, Metrics, Product_admin } from "./index";

const Admin = ({ isAdmin }) => {
  const handleCustomers = (response) => {
    window.localStorage.setItem("customer_array", JSON.stringify(response));
  };
  const handleSales = (response) => {
    window.localStorage.setItem("sales_array", JSON.stringify(response));
  };

  useEffect(() => {
    console.log("testing admin persist", isAdmin);
  }, [isAdmin]);

  useEffect(() => {
    getAllCustomers()
      .then((response) => {
        console.log("these are all CUSTOMERS", response.customers);
        const customers = response.customers;
        if (customers) {
          handleCustomers(customers);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    getSalesData()
      .then((response) => {
        console.log("on admin front page, this is the sales data", response);
        console.log("sales array", response.sales);
        let sales = response.sales;
        handleSales(sales);
      })
      .catch((error) => {
        throw error;
      });
  });

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
