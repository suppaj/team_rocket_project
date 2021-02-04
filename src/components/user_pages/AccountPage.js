import React from "react";
import { Col, Row } from "react-bootstrap";
import { OrderHistory, UserProfile } from "../index";

const AccountPage = () => {
  return (
    <div className="account-container">
      <Row className="justify-content-center">
        <Col className="justify-content-center nes-container profile-container">
          <UserProfile />
        </Col>
        <Col className="justify-content-center nes-container order-history-container">
          <OrderHistory />
        </Col>
      </Row>
    </div>
  );
};

export default AccountPage;
