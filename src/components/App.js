import React, { useState, useEffect } from "react";
import { Modal, Container, Row, Form, Button } from "react-bootstrap";
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
  loginCustomer,
  registerCustomer,
} from "../api";

import { Products, ProductSearch, ProductSorter } from "./index";

const App = () => {
  const [message, setMessage] = useState("");
  const [allProducts, setAllProducts] = useState([]);
  const [currentProducts, setCurrentProducts] = useState([]);
  const [loginShow, setLoginShow] = useState(false);
  const [registerShow, setRegisterShow] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [registeredEmail, setRegisteredEmail] = useState("");
  const [registeredPassword, setRegisteredPassword] = useState("");

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const handleCloseLogin = () => setLoginShow(false);
  const handleShowLogin = () => setLoginShow(true);
  const handleCloseRegister = () => setRegisterShow(false);
  const handleShowRegister = () => setRegisterShow(true);

  const handleCustomerLogin = (e) => {
    e.preventDefault();
    loginCustomer(email, password);
    setIsLoggedIn(true);
  };

  const handleCustomerRegistration = (e) => {
    e.preventDefault();
    registerCustomer(
      firstName,
      lastName,
      registeredEmail,
      registeredPassword,
      false
    );
  };

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
          id="header"
          style={{ minHeight: "10vh", width: "100vw" }}
        >
          HEADER AREA
          <button
            type="button"
            className="nes-btn is-normal"
            onClick={handleShowLogin}
          >
            Login
          </button>
          <button
            type="button"
            className="nes-btn is-normal"
            onClick={handleShowRegister}
          >
            Register
          </button>
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
        </Row>
      </Container>

      {/* LOGIN Form */}
      <Modal show={loginShow} onHide={handleCloseLogin} centered>
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formBasicUsername">
              <div className="nes-field">
                <Form.Label>Email</Form.Label>

                <input
                  type="text"
                  id="name_field"
                  className="nes-input"
                  placeholder="Email"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                ></input>
              </div>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <div className="nes-field">
                <Form.Label>Password</Form.Label>

                <input
                  type="text"
                  id="name_field"
                  className="nes-input"
                  type="password"
                  placeholder="Password"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                ></input>
              </div>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Body className="login-auth-section">
          <div className="nes-container is-rounded login-container">
            <p className="login-dialogue">Continue as Guest</p>
          </div>

          <div className="nes-container is-rounded login-container">
            <i id="google-icon" className="nes-icon google is-small "></i>
            <p className="login-dialogue">Sign in with Google</p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="dark" onClick={handleCloseLogin}>
            Close
          </Button>
          <Button variant="dark" onClick={handleCustomerLogin}>
            Login
          </Button>
        </Modal.Footer>
      </Modal>

      {/* REGISTRATION FORM */}
      <Modal show={registerShow} onHide={handleCloseRegister} centered>
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formBasicFirstName">
              <div className="nes-field">
                <Form.Label>First Name</Form.Label>

                <input
                  type="text"
                  id="name_field"
                  className="nes-input"
                  placeholder="First Name"
                  onChange={(e) => {
                    setFirstName(e.target.value);
                  }}
                ></input>
              </div>
            </Form.Group>

            <Form.Group controlId="formBasicLastName">
              <div className="nes-field">
                <Form.Label>Last Name</Form.Label>

                <input
                  type="text"
                  id="name_field"
                  className="nes-input"
                  type="text"
                  placeholder="Last Name"
                  onChange={(e) => {
                    setLastName(e.target.value);
                  }}
                ></input>
              </div>
            </Form.Group>
            <Form.Group controlId="formBasicRegisterEmail">
              <div className="nes-field">
                <Form.Label>Email</Form.Label>

                <input
                  type="text"
                  id="name_field"
                  className="nes-input"
                  type="text"
                  placeholder="Email"
                  onChange={(e) => {
                    setRegisteredEmail(e.target.value);
                  }}
                ></input>
              </div>
            </Form.Group>
            <Form.Group controlId="formBasicRegisterPassword">
              <div className="nes-field">
                <Form.Label>Password</Form.Label>

                <input
                  type="text"
                  id="name_field"
                  className="nes-input"
                  type="password"
                  placeholder="Password"
                  onChange={(e) => {
                    setRegisteredPassword(e.target.value);
                  }}
                ></input>
              </div>
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="dark" onClick={handleCloseRegister}>
            Close
          </Button>
          <Button variant="dark" onClick={handleCustomerRegistration}>
            Register
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default App;
