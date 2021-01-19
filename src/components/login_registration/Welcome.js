import React from "react";
import { Modal, Form, Button } from "react-bootstrap";

const Welcome = ({ welcomeShow, setWelcomeShow, firstName }) => {
  const welcomeHandleClose = () => setWelcomeShow(false);
  const welcomeHandleShow = () => {
    setWelcomeShow(true);
    setTimeout(welcomeHandleClose, 1200);
  };
  return (
    <>
      <Modal show={welcomeShow} onHide={welcomeHandleClose} centered>
        <Modal.Body>
          <div className="nes-container is-rounded">
            <p>Welcome {firstName.toUpperCase()}!</p>
          </div>
          <audio autoPlay="autoplay">
            <source src="https://www.myinstants.com/instant/pokemon-item-received-55816/?utm_source=copy&utm_medium=share"></source>
          </audio>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Welcome;
