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

import { AddToCart, ShoppingCart } from './index';
import { getSomething, getAllProducts } from "../api";

import { Products, ProductSearch, ProductSorter } from "./index";

const App = () => {
  const [message, setMessage] = useState("");
  const [allProducts, setAllProducts] = useState([]);
  const [currentProducts, setCurrentProducts] = useState([]);

  useEffect(() => {
    getSomething()
      .then((response) => {
        setMessage(response.message);
      })
      .catch((error) => {
        setMessage(error.message);
      });

    getAllProducts()
      .then((response) => {
        setAllProducts(response);
        setCurrentProducts(response);
      })
      .catch((error) => {
        console.log("Error fetching products!");
        console.log(error);
      });
  }, []);

  return (
    <>
      <div className="App">
        <h1>Hello, World!</h1>
        <h2>{message}</h2>
      </div>
      <Container fluid>
        <Row
          className="bg-primary"
          style={{ minHeight: "10vh", width: "100vw" }}
        >
          HEADER AREA
        </Row>
        <Row
          className="bg-success"
          style={{
            minHeight: "80vh",
            width: "100vw",
          }}
        >
          <Row
            style={{
              marginBottom: "20px",
              marginTop: "20px",
              width: "100vw",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <ProductSearch
              allProducts={allProducts}
              setCurrentProducts={setCurrentProducts}
            />
            <ProductSorter
              allProducts={allProducts}
              setAllProducts={setAllProducts}
              currentProducts={currentProducts}
              setCurrentProducts={setCurrentProducts}
            />
          </Row>
          <Row
            style={{
              width: "100vw",
              display: "flex",
              justifyContent: "space-evenly",
            }}
          >
            <Products currentProducts={currentProducts} />
          </Row>
        </Row>
        <Row
          className="bg-secondary"
          style={{ minHeight: "10vh", width: "100vw" }}
        >
          FOOTER AREA
          <ShoppingCart />
        </Row>
      </Container>
    </>
  );
};

export default App;
