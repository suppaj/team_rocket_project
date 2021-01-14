import React, { useEffect, useState } from "react";

import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
  Link,
  useParams,
} from "react-router-dom";

import { ButtonGroup, Dropdown } from "react-bootstrap";

import { AddToCart } from "../index";
import { getProductById } from "../../api";

const ProductPage = ({ allProducts }) => {
  const [orderAmount, setOrderAmount] = useState(1);
  const [currentPoke, setCurrentPoke] = useState({});

  // {
  //   dex_id: 1,
  //   name: "bulbasaur",
  //   type: [12, 4],
  //   description:
  //     "A strange seed was planted on its back at birth. The plant sprouts and grows with this POKéMON.",
  //   height: 7,
  //   weight: 69,
  //   price: 96.66,
  // }

  let { product_id } = useParams();
  console.log("im from the page iteself", product_id);

  useEffect(() => {
    console.log("useffect flag", product_id);
    getProductById(product_id).then((response) => {
      console.log("my response", response);
      setCurrentPoke(response);
    });
  }, []);

  // return <p>Hello World {product_id}</p>;

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
  if (currentPoke.name) {
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
          className="pokedex-entry"
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
            {type ? typeMapper(type) : ""}
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
            <div className="nes-container with-title is-dark">
              <p className="title">Description</p>
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
                orderAmount={1}
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
  } else {
    return <p>Loading...</p>;
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
              <i className="nes-ash"></i>
              <div className="nes-balloon from-left">
                <p>Hello Team Rocket!</p>
              </div>
            </section>

            <section className="message -right">
              <div className="nes-balloon from-right">
                <p>Wow I love this pokemon!</p>
              </div>
              <i className="nes-bulbasaur"></i>
            </section>
          </section>
 */
