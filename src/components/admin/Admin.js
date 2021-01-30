import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import {
  getAllCustomers,
  getSalesData,
  adminGetAllProducts,
} from "../../api/index";
import { Customer_admin, Metrics, Product_admin, Rejected } from "./index";

const Admin = ({ isAdmin }) => {
  const [productEdited, setProductEdited] = useState(false);

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
    if (isAdmin) {
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
    }
  }, []);

  useEffect(() => {
    if (isAdmin) {
      getSalesData()
        .then((response) => {
          let sales = response.sales;
          const result = sales.sort(
            (a, b) =>
              parseFloat(b.transaction_date) - parseFloat(a.transaction_date)
          );
          handleSales(result);
        })
        .catch((error) => {
          throw error;
        });
    }
  });

  useEffect(() => {
    if (isAdmin) {
      adminGetAllProducts()
        .then((response) => {
          const prodArr = response.products;
          const result = prodArr.sort(
            (a, b) => parseFloat(a.prod_id) - parseFloat(b.prod_id)
          );

          handleProducts(result);
        })
        .catch((error) => {
          throw error;
        });
    }
  }, [productEdited]);

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
            <Product_admin
              isAdmin={isAdmin}
              setProductEdited={setProductEdited}
              productEdited={productEdited}
            />
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
