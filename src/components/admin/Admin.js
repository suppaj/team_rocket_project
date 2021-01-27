import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { getAllCustomers, getSalesData, getAllProducts } from "../../api/index";
import { Customer_admin, Metrics, Product_admin, Rejected } from "./index";

const Admin = ({ isAdmin }) => {
  const handleCustomers = (response) => {
    window.localStorage.setItem("customer_array", JSON.stringify(response));
  };
  const handleSales = (response) => {
    window.localStorage.setItem("sales_array", JSON.stringify(response));
  };

  const handleProducts = (response) => {
    window.localStorage.setItem("prod_array", JSON.stringify(response));
  };

  useEffect(() => {
    console.log("testing admin persist", isAdmin);
  }, [isAdmin]);

  useEffect(() => {
    getAllCustomers()
      .then((response) => {
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
        let sales = response.sales;
        handleSales(sales);
      })
      .catch((error) => {
        throw error;
      });
  });

  useEffect(() => {
    getAllProducts()
      .then((response) => {
        handleProducts(response);
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
        <Rejected />
      )}
    </div>
  );
};

export default Admin;
