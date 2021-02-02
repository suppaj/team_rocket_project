import React, { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import { ButtonGroup, Dropdown } from "react-bootstrap";

import "../style.css";

// component imports
import ProductReviews from "./ProductReviews";
import { AddToCart } from "../index";
import TypeMapper from "./TypeMapper";

// function imports
import { getProductById } from "../../api";

const ProductPage = ({ cart, setCart, cartID, isLoggedIn, user, setUser }) => {
  const [orderAmount, setOrderAmount] = useState(1);
  const [currentPoke, setCurrentPoke] = useState({});
  const [maxQuantity, setMaxQuantity] = useState(currentPoke.quantity || 0);
  const [tookEmAll, setTookEmAll] = useState(false);

  let { product_id } = useParams();

  useEffect(() => {
    getProductById(product_id).then((response) => {
      setCurrentPoke(response);
    });
  }, []);
  useEffect(() => {
    if (currentPoke.quantity) {
      setMaxQuantity(currentPoke.quantity);
      for (let item of cart) {
        if (item.prod_id === parseInt(product_id)) {
          setMaxQuantity(currentPoke.quantity - parseInt(item.cart_quantity));
          if (currentPoke.quantity === parseInt(item.cart_quantity)) {
            setTookEmAll(true);
          } else {
            setTookEmAll(false);
          }
          break;
        }
      }
    }
  }, [currentPoke, cart]);

  const handleChange = (e) => {
    if (parseInt(e.target.value) < 1) {
      setOrderAmount(1);
    } else if (parseInt(e.target.value) > maxQuantity) {
      setOrderAmount(maxQuantity);
    } else {
      setOrderAmount(parseInt(e.target.value));
    }
  };

  const {
    dex_id,
    name,
    type,
    description,
    height,
    weight,
    price,
    quantity,
    reviews,
  } = currentPoke;

  if (currentPoke.name) {
    return (
      <div className="product-page">
        <section className="pokedex-entry nes-container">
          <div className="poke-top-left">
            <img
              className="product-image"
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${dex_id}.png`}
              alt={`a very happy ${name}`}
            />
            <p className="product-dex-id">No.{dex_id}</p>
          </div>
          <div className="poke-top-right">
            <div>
              <h4>{name}</h4>
              <div className="product-type-mapper">
                <TypeMapper typeArray={type} />
              </div>
              <p>Height: {height / 10}m</p>
              <p>Weight: {weight / 10}kg</p>
              {maxQuantity ? (
                <p>{maxQuantity} available</p>
              ) : (
                <p className="nes-container is-dark">Out of Stock</p>
              )}
              <p className="product-price">${price}</p>
            </div>
          </div>
          <div className="poke-bottom-row">
            <div className="nes-container with-title is-dark">
              <p className="title">Description</p>
              <p>{description}</p>
            </div>
            {maxQuantity ? (
              <ButtonGroup className="product-button-group">
                <div className="nes-field is-inline">
                  <label htmlFor="order-amount">Quantity:</label>
                  <input
                    type="number"
                    id="order-amount"
                    className="nes-input"
                    value={isNaN(orderAmount) ? 1 : orderAmount}
                    min={1}
                    max={maxQuantity}
                    onChange={handleChange}
                  />
                </div>
                <AddToCart
                  product={currentPoke}
                  isLoggedIn={isLoggedIn}
                  orderAmount={orderAmount}
                  cart={cart}
                  setCart={setCart}
                  cartID={cartID}
                  user={user}
                  setUser={setUser}
                />
              </ButtonGroup>
            ) : tookEmAll ? (
              <div className="nes-container is-dark">
                <p>
                  Looks like you are buying all our{" "}
                  {currentPoke.name.charAt(0).toUpperCase() +
                    currentPoke.name.slice(1)}{" "}
                  supply. Jessie, James and Meowth will have to "catch" more.
                </p>
              </div>
            ) : (
              <div className="nes-container is-dark">
                <p>
                  {currentPoke.name.charAt(0).toUpperCase() +
                    currentPoke.name.slice(1)}{" "}
                  is OUT OF STOCK! Jessie, James and Meowth are currently out
                  trying to "catch" more.
                </p>
              </div>
            )}
          </div>
        </section>
        <ProductReviews
          reviews={reviews}
          product_id={product_id}
          isLoggedIn={isLoggedIn}
          user={user}
        />
      </div>
    );
  } else {
    return <p>Loading...</p>;
  }
};

export default ProductPage;
