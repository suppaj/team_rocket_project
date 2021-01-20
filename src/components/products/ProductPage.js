import React, { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import { ButtonGroup, Dropdown } from "react-bootstrap";

// component imports
import ProductReviews from "./ProductReviews";
import { AddToCart } from "../index";

// function imports
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
          gridTemplateRows: "1fr 1fr auto",
          backgroundColor: "#abbbd1",
        }}
      >
        <section
          className="pokedex-entry"
          className="nes-container is-rounded"
          style={{
            gridColumn: "2/4",
            gridRow: "1/3",
            display: "grid",
            gridTemplateRows: "1fr 1fr",
            girdTempalteColumns: "1fr 1fr",
            placeItems: "center",
            textAlign: "center",
          }}
        >
          <div
            className="poke-top-left"
            style={{
              gridRow: "1/2",
              gridColumn: "2/3",
              display: "grid",
              placeItems: "center",
            }}
          >
            <img
              style={{
                height: "300px",
                width: "300px",
                marginTop: "-60px",
                marginLeft: "-50px",
                marginRight: "-50px",
                float: "top",
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
            className="poke-top-right"
            style={{
              gridRow: "1/2",
              gridColumn: "3/4",
              display: "grid",
              placeItems: "center",
            }}
          >
            <div>
              <h4
                style={{
                  textTransform: "capitalize",
                  marginTop: "30px",
                  fontSize: "1.6rem",
                }}
              >
                {name}
              </h4>
              <div style={{ marginBottom: "10px" }}>
                {type ? typeMapper(type) : ""}
              </div>
              <p>Height: {height / 10}m</p>
              <p>Weight: {weight / 10}kg</p>
              <p style={{ fontSize: "1.6rem" }}>${price}</p>
            </div>
          </div>
          <div
            style={{
              gridRow: "2/3",
              gridColumn: "2/4",
              display: "grid",
            }}
          >
            <div
              className="nes-container with-title is-dark"
              style={{ textAlign: "left" }}
            >
              <p className="title">Description</p>
              <p>{description}</p>
            </div>
            <ButtonGroup style={{ placeSelf: "center", marginTop: "25px" }}>
              <Dropdown drop="up" style={{ marginRight: "10px" }}>
                <Dropdown.Toggle variant="dark" id="quantity-dropdown">
                  Qty: {orderAmount}
                </Dropdown.Toggle>
                <Dropdown.Menu
                  style={{ maxHeight: "40vh", overflow: "scroll" }}
                >
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
        </section>
        <ProductReviews />
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
