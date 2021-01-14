import React, { useState } from "react";

import { Button, ButtonGroup, Dropdown, Modal } from "react-bootstrap";

import { AddToCart } from "../index";

const ProductModal = ({ currentPoke, handleClose, show }) => {
  const [quantity, setQuantity] = useState(1);

  const {
    dex_id,
    name,
    type,
    description,
    height,
    weight,
    price,
  } = currentPoke;

  function typeMapper(typeArray) {
    return typeArray.map((type, index) => {
      return (
        <span
          className={`${type} nes-container is-rounded nes-pointer`}
          style={{
            marginRight: "10px",
            marginLeft: "10px",
            padding: "2px",
          }}
          key={index}
        >
          {type}
        </span>
      );
    });
  }

  function quantityMapper(maxQuantity) {
    let quantityArray = [1];
    let n = 1;

    while (n < maxQuantity) {
      n = n + 1;
      quantityArray.push(n);
    }

    return quantityArray.map((number) => {
      return (
        <Dropdown.Item
          key={number}
          onClick={() => {
            setQuantity(number);
          }}
        >
          {number}
        </Dropdown.Item>
      );
    });
  }
  if (currentPoke) {
    return (
      <>
        <Modal
          show={show}
          onHide={handleClose}
          keyboard={false}
          style={{ textAlign: "center" }}
        >
          <Modal.Header closeButton>
            <Modal.Title>
              #{dex_id} {name}
            </Modal.Title>
          </Modal.Header>
          <img
            style={{
              height: "300px",
              width: "300px",
              marginTop: "-50px",
              marginBottom: "-80px",
            }}
            className="nes-pointer"
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${dex_id}.png`}
            alt={`a very happy ${name}`}
          />
          {typeMapper(type)}
          <Modal.Body>
            <p>
              Height: {height / 10}m Weight: {weight / 10}kg
            </p>
            <div className="nes-container is-rounded">{description}</div>
          </Modal.Body>
          <Modal.Footer
            style={{
              display: "flex",
              alignContent: "space-around",
            }}
          >
            ${(price * quantity).toFixed(2)}
            <ButtonGroup>
              <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                  Qty: {quantity}
                </Dropdown.Toggle>
                <Dropdown.Menu> {quantityMapper(10)}</Dropdown.Menu>
              </Dropdown>
              <AddToCart
                handleClose={handleClose}
                product={currentPoke}
                isLoggedIn={false}
                cart_id={1}
              />
            </ButtonGroup>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
};

export default ProductModal;
