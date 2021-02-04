// react imports
import React, { useState, useEffect } from "react";

// react bootstrap imports
import { Modal } from "react-bootstrap";

// component imports
import RollingBall from "../RollingBall";

const ProductsLoadingModal = ({ showLoading }) => {
  return (
    <>
      <Modal show={showLoading} backdrop="static" keyboard={false} centered>
        <div className="nes-container is-rounded is-dark with-title loading-modal">
          <p className="title">Please wait...</p>
          <p>'Capturing' Pokemon...</p>
          <div style={{ display: "flex", marginLeft: "10%" }}>
            <RollingBall />
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ProductsLoadingModal;
