import React, { useState, useEffect } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { loginCustomer } from "../api";

const Login = ({ setIsLoggedIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleShowLogin = () => setLoginShow(true);
  const [loginShow, setLoginShow] = useState(false);

  const handleCloseLogin = () => setLoginShow(false);

  const handleCustomerLogin = (e) => {
    e.preventDefault();
    loginCustomer(email, password);
    setIsLoggedIn(true);
  };

  return (
    <div>
      <button
        type="button"
        className="nes-btn is-normal"
        onClick={handleShowLogin}
      >
        Login
      </button>
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
    </div>
  );
};

export default Login;
