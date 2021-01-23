import React, { useEffect, useState } from "react";
import { Row, Col, Button } from "react-bootstrap";

import { deleteCartItem, patchCartItem } from "../api";

const CartItemCard = ({
  order: product,
  isLoggedIn,
  cart,
  setCart,
  cart_id,
}) => {
  const [adjustOrder, setAdjustOrder] = useState(false);
  const [orderAmount, setOrderAmount] = useState(product.cart_quantity);

  useEffect(()=>{
    setOrderAmount(product.cart_quantity);
  },[cart])

  const handleRemoveItem = () => {
    const copyCart = [...cart];
    if (isLoggedIn) {
      cart.forEach(async (item, index) => {
        if (item.prod_id === product.prod_id) {
          copyCart.splice(index, 1);
          await deleteCartItem(cart_id, product.prod_id);
        }
      });
      setCart(copyCart);
      localStorage.setItem("cart", JSON.stringify(copyCart));
    } else {
      cart.forEach(async (item, index) => {
        if (item.prod_id === product.prod_id) {
          copyCart.splice(index, 1);
        }
      });
      setCart(copyCart);
      localStorage.setItem("cart", JSON.stringify(copyCart));
    }
  };

  const handleChange = (e) => {
    if (e.target.value > product.quantity) {
      setOrderAmount(product.quantity);
    } else if (e.target.value < 1) {
      setOrderAmount(1);
    } else {
      setOrderAmount(e.target.value);
    }
  };

  const handleLoseFocus = () => {
    setAdjustOrder(false);
    const copyCart = [...cart];
    copyCart.map(async (item) => {
      if (item.prod_id === product.prod_id) {
        item.cart_quantity = orderAmount;
        if (isLoggedIn) {
          await patchCartItem(cart_id, orderAmount, item.prod_id);
        }
        return item;
      } else {
        return item;
      }
    });
    setCart(copyCart);
    localStorage.setItem("cart", JSON.stringify(copyCart));
  };

  return (
    <div className="nes-container is-rounded">
      <Row>
        <Col md='auto'>
          <img
            className="cart-order-image"
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${product.dex_id}.png`}
            alt={product.name}
            width='300'
            height='300'
          />
        </Col>
        <Col md='auto'>
          <p>Unit Price:</p>
          <p>${product.price}</p>
          {adjustOrder ? (
            <div className="nes-field">
              <label>Quantity:</label>
              <input
                className="nes-input"
                type="number"
                id="order_adjust"
                style={{ width: "6rem" }}
                value={orderAmount}
                step={1}
                min={1}
                max={product.quantity}
                onChange={handleChange}
                onBlur={handleLoseFocus}
                autoFocus
              />
              <br/>
              <Button variant="link" onClick={() => setAdjustOrder(false)}>
                confirm change
              </Button>
            </div>
          ) : (
            <>
            <p>
              Quantity: {orderAmount}
            </p>
            <Button variant="link" onClick={() => setAdjustOrder(true)}>
              change
            </Button>
            </>
          )}
          <p>Item Total:</p>
          <p>${(orderAmount * product.price).toFixed(2)}</p>
          <br />
          <button
            type="button"
            className="nes-btn is-error"
            onClick={handleRemoveItem}
          >
            Remove Item
          </button>
        </Col>
        <Col >
          <p>{product.name.toUpperCase()}</p>
          <p>Description: {product.description}</p>
          <p>Height: {product.height/10} m</p>
          <p>Weight: {product.weight/10} kg</p>
        </Col>
      </Row>
    </div>
  );
};

export default CartItemCard;
