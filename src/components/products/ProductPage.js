import React, { useEffect, useState } from "react";

import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
  Link,
  useParams,
} from "react-router-dom";

import { Button, ButtonGroup, Dropdown } from "react-bootstrap";

import { AddToCart } from "../index";
import { getProductById } from "../../api";

const ProductPage = ({ allProducts }) => {
  const [orderAmount, setOrderAmount] = useState(1);
  const [currentPoke, setCurrentPoke] = useState({});

  let { product_id } = useParams();

  useEffect(() => {
    getProductById(product_id).then((response) => {
      setCurrentPoke(response);
    });
  }, []);

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
        <div
          style={{
            gridRow: "1/2",
            gridColumn: "2/3",
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
            gridColumn: "3/4",
            textAlign: "center",
          }}
        >
          <h4
            style={{
              textTransform: "capitalize",
              fontSize: "1.8rem",
              marginTop: "30px",
              overflow: "auto",
            }}
          >
            {name}
          </h4>
          {type ? typeMapper(type) : ""}
          <p style={{ marginTop: "20px" }}>Height: {height / 10}m</p>
          <p>Weight: {weight / 10}kg</p>
          <p style={{ fontSize: "1.8rem" }}>${price}</p>
        </div>
        <div
          style={{
            gridRow: "2/3",
            gridColumn: "2/4",
          }}
        >
          <div className="nes-container with-title is-dark">
            <p className="title">Description</p>
            <p>{description}</p>
          </div>
          <ButtonGroup style={{ textAlign: "center" }}>
            <Dropdown drop="up" style={{ marginRight: "10px" }}>
              <Dropdown.Toggle variant="dark" id="quantity-dropdown">
                Qty: {orderAmount}
              </Dropdown.Toggle>
              <Dropdown.Menu style={{ maxHeight: "40vh", overflow: "scroll" }}>
                {quantityMapper(quantity)}
              </Dropdown.Menu>
            </Dropdown>
            <AddToCart
              product={currentPoke}
              isLoggedIn={false}
              orderAmount={orderAmount}
            />
          </ButtonGroup>
        </div>
      </div>
    );
  } else {
    return <p>Loading...</p>;
  }
};

export default ProductPage;

/*
todo add scroll bar to the dropdown menu for quantity
 */
