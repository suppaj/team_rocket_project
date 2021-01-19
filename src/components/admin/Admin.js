import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Customer_admin, Metrics, Product_admin } from "./index";
import { Navbar, NavDropdown, Button } from "react-bootstrap";
const Admin = ({ isAdmin }) => {
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

          <div id="admin-label" class="nes-container is-rounded is-dark">
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
