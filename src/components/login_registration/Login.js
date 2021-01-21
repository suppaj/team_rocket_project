import React, { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { loginCustomer } from "../../api";
import { Try_again, Welcome } from "../index";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
  Link,
} from "react-router-dom";

const Login = ({
  setIsLoggedIn,
  setIsAdmin,
  setFirstName,
  firstName,
  setUser,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginShow, setLoginShow] = useState(false);
  const [welcomeShow, setWelcomeShow] = useState(false);
  const [tryAgainShow, setTryAgainShow] = useState(false);
  const handleShowLogin = () => setLoginShow(true);
  const handleCloseLogin = () => {
    setLoginShow(false);
    setWelcomeShow(false);
  };

  const handleCustomerLogin = (e) => {
    e.preventDefault();
    loginCustomer(email, password)
      .then((response) => {
        if (response) {
          const { siteAdmin, firstName } = response;
          setWelcomeShow(true);
          setTimeout(handleCloseLogin, 2200);
          setIsAdmin(siteAdmin);
          setFirstName(firstName);
          setUser(response);
        } else {
          console.log("login credentials incorrect");
        }
      })
      .catch((error) => {
        throw error;
      });
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
          <Link href="http://localhost:5000/auth/google/">
            <div className="nes-container is-rounded login-container">
              <i id="google-icon" className="nes-icon google is-small "></i>
              <p className="login-dialogue">Sign in with Google</p>
            </div>
          </Link>
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
      <Welcome
        setWelcomeShow={setWelcomeShow}
        welcomeShow={welcomeShow}
        firstName={firstName}
      />
      <Try_again
        setTryAgainShow={setTryAgainShow}
        tryAgainShow={tryAgainShow}
      />
    </div>
  );
};

export default Login;
