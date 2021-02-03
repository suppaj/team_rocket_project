import React from "react";
import { Col } from "react-bootstrap";
import { BouncingBall, CartItemCard, CartTable } from "../index";

const ShoppingCart = ({ cartID, cart, setUser, user, isLoggedIn }) => {
 
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
        md={cart.length ? { span: 3 } : { span: 4 }}
        className={
          cart.length
            ? "align-self-start mx-auto sticky-top"
            : "mx-auto align-self-center"
        }
      >
        {cart.length ? (
          <>
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
          </>
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
