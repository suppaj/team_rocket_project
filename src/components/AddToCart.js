import React from "react";
import { Button } from "react-bootstrap";
import { useHistory } from 'react-router-dom';

import { addCartItem, patchCartItem } from "../api";

const AddToCart = ({ product, isLoggedIn, cartID, orderAmount, cart, setCart }) => {

  const history = useHistory();

  const handleAddToCart = async () => {
    product.cart_quantity = orderAmount;
    const { cart_quantity, price, prod_id } = product;
    const currCart = [...cart];
    let noDuplicate = true;
    console.log('logged in:', isLoggedIn, ' cart id:', cartID, 'order amount', orderAmount);
    if (isLoggedIn) {
      currCart.map(async (item) => {
        if (item.prod_id === prod_id) {
          noDuplicate = false;
          item.cart_quantity = parseInt(item.cart_quantity) + parseInt(orderAmount);
          await patchCartItem(cartID, item.cart_quantity, prod_id);
          return item;
        } else {
          return item;
        }
      });
      setCart(currCart);
      localStorage.setItem("cart", JSON.stringify(currCart));

      if (noDuplicate) {
        const results = await addCartItem(
          cartID,
          prod_id,
          cart_quantity,
          price
        );

        if (results) {
          currCart.push(product);
          console.log('currentcart', currCart)
          setCart(currCart);
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
      setCart(currCart);
      localStorage.setItem("cart", JSON.stringify(currCart));
    }
    document.getElementById("add-cart-dialog").showModal();
  };

  const handleGoToCheckout = () => {
    history.push('/checkout');
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
