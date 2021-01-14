import React, { useState } from "react";

import { ButtonGroup, Dropdown } from "react-bootstrap";

import { AddToCart } from "../index";

const ProductPage = (props) => {
  const [orderAmount, setOrderAmount] = useState(1);
  const [currentPoke, setCurrentPoke] = useState({
    dex_id: 133,
    name: "eevee",
    type: ["normal"],
    description:
      "Its genetic code is irregular. It may mutate if it is exposed to radiation from element STONEs.",
    height: 3,
    weight: 65,
    price: 99.99,
    quantity: 10,
  });

  const {
    dex_id,
    name,
    type,
    description,
    height,
    weight,
    price,
    quantity,
  } = currentPoke;

  function typeMapper(typeArray) {
    return typeArray.map((type, index) => {
      return (
        <span
          className={`${type} nes-container is-rounded`}
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
    let quantityArray = [maxQuantity];
    let n = maxQuantity;

    while (n > 1) {
      n = n - 1;
      quantityArray.push(n);
    }

    return quantityArray.map((number) => {
      return (
        <Dropdown.Item
          key={number}
          onClick={() => {
            setOrderAmount(number);
          }}
        >
          {number}
        </Dropdown.Item>
      );
    });
  }
  if (currentPoke) {
    return (
      <div
        className="product-page nes-container "
        style={{
          width: "80vw",
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr 1fr",
          gridTemplateRows: "1fr 1fr",
          backgroundColor: "#abbbd1",
        }}
      >
        <section
          class="pokedex-entry"
          style={{
            gridColumn: "1/3",
            gridRow: "1/3",
            display: "grid",
            gridTemplateRows: "1fr 1fr",
            gridTemplateColumns: "1fr 1fr",
          }}
        >
          <div
            style={{
              gridRow: "1/2",
              gridColumn: "1/2",
              display: "flex",
              flexWrap: "wrap",
              alignContent: "center",
              justifyContent: "center",
            }}
          >
            <img
              style={{
                height: "300px",
                width: "300px",
                marginTop: "-80px",
              }}
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${dex_id}.png`}
              alt={`a very happy ${name}`}
            />
            <p
              style={{
                marginTop: "-50px",
                fontSize: "1.5rem",
              }}
            >
              No.{dex_id}
            </p>
          </div>
          <div
            style={{
              gridRow: "1/2",
              gridColumn: "2/3",
              textAlign: "center",
            }}
          >
            <h4
              style={{
                textTransform: "capitalize",
                fontSize: "2rem",
                marginTop: "30px",
              }}
            >
              {name}
            </h4>
            {typeMapper(type)}
            <p style={{ marginTop: "20px" }}>Height: {height / 10}m</p>
            <p>Weight: {weight / 10}kg</p>
            <p style={{ fontSize: "2rem" }}>${price}</p>
          </div>
          <div
            style={{
              gridRow: "2/3",
              gridColumn: "1/3",
            }}
          >
            <div class="nes-container with-title is-dark">
              <p class="title">Description</p>
              <p>{description}</p>
            </div>
            <ButtonGroup>
              <Dropdown drop="up">
                <Dropdown.Toggle
                  variant="dark"
                  id="quantity-dropdown"
                  size="sm"
                >
                  Qty: {orderAmount}
                </Dropdown.Toggle>
                <Dropdown.Menu>{quantityMapper(quantity)}</Dropdown.Menu>
              </Dropdown>
              <AddToCart
                product={currentPoke}
                isLoggedIn={false}
                orderAmount={orderAmount}
              />
            </ButtonGroup>
          </div>
        </section>
        <section
          className="review-section"
          style={{
            gridColumn: "3/5",
            gridRow: "1/3",
          }}
        ></section>
      </div>
    );
  }
};

export default ProductPage;

/*
<section
            className="message-list"
            style={{
              display: "flex",
              flexWrap: "wrap",
              backgroundColor: "green",
            }}
          >
            <section className="message -left">
              <i class="nes-ash"></i>
              <div className="nes-balloon from-left">
                <p>Hello Team Rocket!</p>
              </div>
            </section>

            <section className="message -right">
              <div className="nes-balloon from-right">
                <p>Wow I love this pokemon!</p>
              </div>
              <i class="nes-bulbasaur"></i>
            </section>
          </section>
 */
