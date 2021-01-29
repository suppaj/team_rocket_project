import React, { useState, useEffect } from "react";
import { registerCustomer } from "../../api";
import { Modal, Form, Button } from "react-bootstrap";
import { Try_again, Welcome } from "../index";

const Register = () => {
  const [registerShow, setRegisterShow] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [registeredEmail, setRegisteredEmail] = useState("");
  const [registeredPassword, setRegisteredPassword] = useState("");
  const [welcomeShow, setWelcomeShow] = useState(false);
  const [ errMsg, setErrMsg ] = useState('');

  const handleCloseRegister = () => setRegisterShow(false);
  const handleShowRegister = () => setRegisterShow(true);

  const handleCustomerRegistration = (e) => {
    e.preventDefault();
    registerCustomer(
      firstName,
      lastName,
      registeredEmail,
      registeredPassword,
      false
    )
      .then((response) => {
        if (response.token) {
          console.log("this is my response", response);
          setErrMsg('');
          setWelcomeShow(true);
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
          <div>
            <p className='is-error'>{errMsg}</p>
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
      <Welcome
        setWelcomeShow={setWelcomeShow}
        welcomeShow={welcomeShow}
        firstName={firstName}
        setOuterShow={setRegisterShow}
      />
    </div>
  );
};

export default Register;
