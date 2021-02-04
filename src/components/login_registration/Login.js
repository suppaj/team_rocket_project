import React, { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { loginCustomer } from "../../api";
import { TryAgain } from "../index";
import {
  Link,
} from "react-router-dom";

const Login = ({
  setIsLoggedIn,
  setFirstName,
  setUser,
  cart,
  setWelcomeShow,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginShow, setLoginShow] = useState(false);
  const [tryAgainShow, setTryAgainShow] = useState(false);
  const [ errMsg, setErrMsg ] = useState('')
  const handleShowLogin = () => setLoginShow(true);
  const handleCloseLogin = () => {
    setLoginShow(false);
    setWelcomeShow(false);
  };

  const handleCustomerLogin = (e) => {
    e.preventDefault();
    loginCustomer(email, password, cart)
      .then((response) => {
        if (response.cart) {
          const { firstName } = response;
          setLoginShow(false);
          setFirstName(firstName);
          setUser(response);
          setWelcomeShow(true);
          setIsLoggedIn(true);
        } else {
          setErrMsg(response.message);
        }
      })
      .catch((error) => {
        throw error;
      });
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
                  id="password_field"
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
          <div>
            <p className='nes-text is-error'>{errMsg}</p>
          </div>
        </Modal.Body>
        <Modal.Body className="login-auth-section">
          <Link to="localhost:5000/auth/google/">
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
      
      <TryAgain
        setTryAgainShow={setTryAgainShow}
        tryAgainShow={tryAgainShow}
      />
    </div>
  );
};

export default Login;
