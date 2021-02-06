import React, { useState } from "react";
import { registerCustomer } from "../../api";
import { Modal, Form, Button } from "react-bootstrap";

const Register = ({
  setWelcomeShow,
  firstName,
  setFirstName,
  setIsLoggedIn,
  setUser,
}) => {
  const [registerShow, setRegisterShow] = useState(false);
  const [lastName, setLastName] = useState("");
  const [registeredEmail, setRegisteredEmail] = useState("");
  const [registeredPassword, setRegisteredPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const handleCloseRegister = () => setRegisterShow(false);
  const handleShowRegister = () => setRegisterShow(true);

  const handleCustomerRegistration = (e) => {
    const cart = JSON.parse(localStorage.getItem("user")) || { cart: [] };
    e.preventDefault();
    registerCustomer(
      firstName,
      lastName,
      registeredEmail,
      registeredPassword,
      false,
      cart
    )
      .then((response) => {
        if (response.token && response.custID) {
          const { firstName } = response;
          console.log("this is my response", response);
          setErrMsg("");
          setRegisterShow(false);
          setWelcomeShow(true);
          setFirstName(firstName);
          setUser(response);
          setIsLoggedIn(true);
        } else {
          setErrMsg(response.message);
        }
      })
      .catch((error) => console.error(error));
  };
  return (
    <div>
      <button
        type="button"
        className="nes-btn is-normal"
        onClick={handleShowRegister}
      >
        Register
      </button>
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
                  id="first_name_field"
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
                  id="last_name_field"
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
                  id="email_field"
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
                  id="password_field"
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
          <div>
            <p className="is-error">{errMsg}</p>
          </div>
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
    </div>
  );
};

export default Register;
