import React from "react";
import { Col } from "react-bootstrap";
import { CartItemCard, CartTable } from "../index";

import { loadStripe } from "@stripe/stripe-js";
// import { getCheckoutSession } from '../api'; // uncomment to use stripe hosted checkout

const stripePromise = loadStripe(
  "pk_test_51I8sNpFaKOewVNY4tUSyYJjV3mITvfvBrnasXHxBvbLGJywYsN5ahAiISY7KcJR0ntmCkArjeCJJGPcrsscyw4Ax00SLrCE09i"
);

const ShoppingCart = ({ cartID, cart, setUser, user, isLoggedIn }) => {
  // uncomment and change onClick of button to handleClick to reinstate

  return cart.length ? (
    <>
      <Col md={cart.length ? { span: 7 } : { span: "auto", offset: 1 }}>
        {cart.length
          ? cart.map((order, index) => {
              return (
                <CartItemCard
                  key={index}
                  order={order}
                  cart={cart}
                  user={user}
                  setUser={setUser}
                  cart_id={cartID}
                  isLoggedIn={isLoggedIn}
                />
              );
            })
          : ""}
      </Col>
      <Col
        className={
          cart.length
            ? "align-self-start mx-auto sticky-top "
            : "mx-auto align-self-center"
        }
      >
        {cart.length ? (
          <div className="cart-order-table-container nes-container">
            <CartTable cart={cart} />
            <div>
              <a className="nes-btn is-primary cart-return-btn" href="/">
                Return to Shopping
              </a>
            </div>
            <br />
            <div>
              <a
                className={
                  cart.length
                    ? "nes-btn is-success cart-btn"
                    : "nes-btn is-disabled cart-checkout-btn"
                }
                disabled={!cart.length}
                href="/checkout"
              >
                Checkout
              </a>
            </div>
          </div>
        ) : (
          ""
        )}
      </Col>
    </>
  ) : (
    <div className="empty-cart-container nes-container">
      <div className="message-list -left">
        <div className="nes-balloon from-right align-top">
          <p>Your cart is empty. Gotta buy them all!</p>
        </div>
        <i className="nes-ash align-bottom ash-icon"></i>
      </div>
      <a className="nes-btn is-primary cart-return-btn" href="/">
        Return to Shopping
      </a>
    </div>
  );
};

export default ShoppingCart;

{
  /*  */
}

{
  /*  */
}
