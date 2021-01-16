import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";

import { addCartItem, patchCartItem } from "../api";

const AddToCart = ({ product, isLoggedIn, cart_id, orderAmount }) => {
  const handleAddToCart = async () => {
    product.cart_quantity = orderAmount;
    const { cart_quantity, price, prod_id } = product;
    const currCart = JSON.parse(localStorage.getItem("cart")) || [];
    let noDuplicate = true;

    if (isLoggedIn) {
      currCart.map(async (item) => {
        if (item.prod_id === prod_id) {
          noDuplicate = false;
          item.cart_quantity += orderAmount;
          await patchCartItem(cart_id, item.cart_quantity, prod_id);
          return item;
        } else {
          return item;
        }
      });

      localStorage.setItem("cart", JSON.stringify(currCart));

      if (noDuplicate) {
        const results = await addCartItem(
          cart_id,
          prod_id,
          cart_quantity,
          price
        );

        if (results) {
          currCart.push(product);
          localStorage.setItem("cart", JSON.stringify(currCart));
        }
      }
    } else {
      currCart.map(async (item) => {
        if (item.prod_id === prod_id) {
          item.cart_quantity += orderAmount;
          noDuplicate = false;
          return item;
        } else {
          return item;
        }
      });

      if (noDuplicate) {
        currCart.push(product);
      }

      localStorage.setItem("cart", JSON.stringify(currCart));
    }
    document.getElementById("add-cart-dialog").showModal();
  };

  const handleGoToCheckout = () => {
    console.log("going to checkout");
  };

  return (
    <>
      <Button
        variant="dark"
        style={{ borderRadius: "5px" }}
        onClick={handleAddToCart}
      >
        <img
          style={{
            height: "40px",
            marginLeft: "-10px",
            marginTop: "-12px",
            marginBottom: "-8px",
          }}
          src={
            "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/master-ball.png"
          }
        />
        <span>Add to Cart</span>
      </Button>

      <dialog className="new-dialog" id="add-cart-dialog">
        <form method="dialog">
          <p className="title">Added To Cart</p>
          <img
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${product.dex_id}.png`}
          />
          <p>
            {orderAmount} {product.name.toUpperCase()}(s) has been added to your
            cart.
          </p>
          <menu className="dialog-menu">
            <button className="nes-btn is-success">Continue Shopping</button>
            {"  "}
            <button className="nes-btn is-primary" onClick={handleGoToCheckout}>
              Checkout
            </button>
          </menu>
        </form>
      </dialog>
    </>
  );
};

export default AddToCart;
