import React from "react";
import { Modal } from "react-bootstrap";

const TryAgain = ({ setTryAgainShow, tryAgainShow }) => {
  

  const tryAgainHandleClose = () => setTryAgainShow(false);
  // const tryAgainHandleShow = () => setTryAgainShow(true);

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

export default TryAgain;
