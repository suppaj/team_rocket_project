import React from "react";
import { Col } from "react-bootstrap";
import { BouncingBall, CartItemCard, CartTable } from "../index";

import { loadStripe } from "@stripe/stripe-js";
// import { getCheckoutSession } from '../api'; // uncomment to use stripe hosted checkout

const stripePromise = loadStripe(
  "pk_test_51I8sNpFaKOewVNY4tUSyYJjV3mITvfvBrnasXHxBvbLGJywYsN5ahAiISY7KcJR0ntmCkArjeCJJGPcrsscyw4Ax00SLrCE09i"
);

const ShoppingCart = ({ cartID, cart, setUser, user, isLoggedIn }) => {
  // uncomment and change onClick of button to handleClick to reinstate

  return (
    <>
      <Col md={cart.length ? { span: 7 } : { span: "auto", offset: 1 }}>
        {cart.length ? (
          cart.map((order, index) => {
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
        ) : (
          <div className="message-list -left">
            <div className="nes-balloon from-right align-top">
              <p>Your cart is empty. Gotta buy them all!</p>
            </div>
            <i
              className="nes-ash align-bottom"
              style={{ transform: "scaleX(-1)" }}
            ></i>
          </div>
        )}
      </Col>
      <Col
        className={
          cart.length
            ? "align-self-start mx-auto sticky-top"
            : "mx-auto align-self-center"
        }
      >
        {cart.length ? (
          <div className="nes-container cart-order-table">
            <CartTable cart={cart} />
            <div>
              <a
                className="nes-btn is-primary"
                href="/"
                style={{ textDecoration: "none", color: "white" }}
              >
                Return to Shopping
              </a>
            </div>
            <br />
            <div>
              <a
                className={
                  cart.length ? "nes-btn is-success" : "nes-btn is-disabled"
                }
                disabled={!cart.length}
                href="/checkout"
                style={{ textDecoration: "none", color: "white" }}
              >
                Checkout
              </a>
            </div>
          </div>
        ) : (
          <div>
            <a
              className="nes-btn is-primary checkout-return-to-shopping"
              href="/"
            >
              Return to Shopping
            </a>
          </div>
        )}
        {cart.length ? <BouncingBall /> : ""}
      </Col>
    </>
  );
};

export default ShoppingCart;
