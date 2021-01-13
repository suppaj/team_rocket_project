import React, { useEffect, useState } from "react";

import { Button, ButtonGroup, Dropdown, Modal } from "react-bootstrap";

const ProductModal = () => {
  const [show, setShow] = useState(true);
  const [quantity, setQuantity] = useState(1);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const test = {
    dex_id: 1,
    name: "bulbasaur",
    type: ["grass", "poison"],
    description:
      "A strange seed was planted on its back at birth. The plant sprouts and grows with this POKéMON.",
    height: 7,
    weight: 69,
    price: 96.66,
  };
  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Launch static backdrop modal
      </Button>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        style={{ textAlign: "center" }}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            #{test.dex_id} {test.name}
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
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${test.dex_id}.png`}
        />
        {typeMapper(test.type)}
        <Modal.Body>
          <p>
            Height: {test.height / 10}m Weight: {test.weight / 10}kg
          </p>
          <div className="nes-container is-rounded">{test.description}</div>
        </Modal.Body>
        <Modal.Footer>
          <ButtonGroup>
            <Dropdown>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                Qty: {quantity}
              </Dropdown.Toggle>
              <Dropdown.Menu> {quantityMapper(10)}</Dropdown.Menu>
            </Dropdown>
            <Button variant="primary" onClick={handleClose}>
              Add to Cart
            </Button>
          </ButtonGroup>
        </Modal.Footer>
      </Modal>
    </>
  );
};

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
    return <Dropdown.Item key={number}>{number}</Dropdown.Item>;
  });
}

export default ProductModal;
