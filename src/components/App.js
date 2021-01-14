import React, { useState, useEffect } from "react";
import { Container, Row } from "react-bootstrap";

import "bootstrap/dist/css/bootstrap.min.css";

import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
  Link,
} from "react-router-dom";

import {
  getSomething,
  getAllProducts,
  getAllTypes,
  loginCustomer,
  registerCustomer,
} from "../api";

import { CartButton, Products, ShoppingCart, Login, Register } from "./index";

const App = () => {
  const [message, setMessage] = useState("");

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    getSomething()
      .then((response) => {
        setMessage(response.message);
      })
      .catch((error) => {
        setMessage(error.message);
      });
  }, []);

  return (
    <Router>
      <div className="App">
        <h1>Hello, World!</h1>
        <h2>{message}</h2>
      </div>
      <Container fluid>
        <Row
          className="bg-primary"
          id="header"
          style={{ minHeight: "10vh", width: "100vw" }}
        >
          HEADER AREA
          <Login setIsLoggedIn={setIsLoggedIn} />
          <Register />
        </Row>
        <Row
          className="bg-success"
          style={{
            minHeight: "80vh",
            width: "100vw",
          }}
        >
          <Switch>
            <Route exact path="/">
              <Row
                style={{
                  marginBottom: "20px",
                  marginTop: "20px",
                  width: "100vw",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Products
                  getAllProducts={getAllProducts}
                  getAllTypes={getAllTypes}
                />
              </Row>
            </Route>
            <Route path="/shoppingcart">
              <ShoppingCart />
            </Route>
            <Route path="/admin">{/* admin component */}</Route>
          </Switch>
        </Row>
        <Row
          className="bg-secondary"
          style={{ minHeight: "10vh", width: "100vw" }}
        >
          FOOTER AREA
        </Row>
      </Container>
    </Router>
  );
};

export default App;
