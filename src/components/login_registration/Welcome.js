import React from "react";
import { useHistory} from 'react-router-dom'
import { Modal, Form, Button } from "react-bootstrap";

const Welcome = ({ welcomeShow, setWelcomeShow, firstName, setRegisterShow }) => {
  const welcomeHandleClose = () => setWelcomeShow(false);
  const welcomeHandleShow = () => {
    setTimeout(welcomeHandleClose, 1500);
  };
 const history = useHistory();

  return (
    <>
      <Modal show={welcomeShow} id='welcome-modal' onShow={welcomeHandleShow} onHide={welcomeHandleClose} onExited={()=> {
        history.push('/')
        setRegisterShow(false)
      }} centered>
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
