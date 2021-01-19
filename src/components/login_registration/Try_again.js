import React, { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";

const Try_again = ({ setTryAgainShow, tryAgainShow }) => {
  //   const [tryAgainShow, setTryAgainShow] = useState(false);

  const tryAgainHandleClose = () => setTryAgainShow(false);
  const tryAgainHandleShow = () => setTryAgainShow(true);

  return (
    <>
      <Modal show={tryAgainShow} onHide={tryAgainHandleClose} centered>
        <Modal.Body>
          <div className="nes-container is-rounded is-dark">
            <p>
              Please enter a valid {"email".toUpperCase()} and{" "}
              {"password".toUpperCase()}!
            </p>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Try_again;
