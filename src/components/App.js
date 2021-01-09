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

import { AddToCart } from './index';
import { getSomething, getAllProducts } from "../api";
import Products from "./Products";

const App = () => {
  const [message, setMessage] = useState("");
  const [allProducts, setAllProducts] = useState([]);

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
        console.log("response:", response);
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
      <h2>{ message }</h2>
    </div>
    <Container fluid>
      <Row className='bg-primary' style={{ minHeight : '10vh', width : '100vw' }}>
        HEADER AREA
      </Row>
      <Row className='bg-success' style={{ minHeight : '80vh', width : '100vw' }}> 
        MAIN BODY
        <AddToCart product={{dex_id: 7,
          name: "squirtle",
          type: ["water"],
          description:
            "Shoots water at prey while in the water. Withdraws into its shell when in danger.",
          height: 5,
          weight: 90,
          price: 20,
        }}/>
      </Row>
      <Row className='bg-secondary' style={{ minHeight : '10vh', width : '100vw' }}>
        FOOTER AREA
      </Row>
    </Container>
    </>
  );
};

export default App;
