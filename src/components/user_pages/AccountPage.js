import React from "react";
import { Col, Row } from "react-bootstrap";
import { OrderHistory, UserProfile } from "../index";

const AccountPage = () => {
  return (
    <div className="account-container">
      <div className="nes-container profile-container">
        <UserProfile />
      </div>
      <div className="justify-content-center nes-container order-history-container">
        <OrderHistory />
      </div>
    </div>
  );
};

export default AccountPage;
