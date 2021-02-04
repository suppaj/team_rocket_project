import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { Col, Row } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import {
  CheckOutCard,
  UserCheckOutForm,
  GuestCheckOutForm,
  CartTable,
} from "../index";

const stripePromise = loadStripe(
  "pk_test_51I8sNpFaKOewVNY4tUSyYJjV3mITvfvBrnasXHxBvbLGJywYsN5ahAiISY7KcJR0ntmCkArjeCJJGPcrsscyw4Ax00SLrCE09i"
);

const CheckoutPage = ({ isLoggedIn, cart, user, setUser }) => {
  return (
    <>
      {cart.length ? (
        <div className="nes-container with-title is-rounded mx-auto checkout-container">
          <p className="title nes-container is-rounded">
            TEAM ROCKET CHECKOUT w/ STRIPE
          </p>
          <Row>
            <Col className="sticky-top ">
              <Elements stripe={stripePromise}>
                {isLoggedIn ? (
                  <UserCheckOutForm cart={cart} user={user} setUser={setUser} />
                ) : (
                  <GuestCheckOutForm
                    cart={cart}
                    user={user}
                    setUser={setUser}
                  />
                )}
              </Elements>
            </Col>
            <Col md={4}>
              <CartTable cart={cart} />
            </Col>
          </Row>
        </div>
      ) : (
        <Redirect to="/shoppingcart" />
      )}
    </>
  );
};

export default CheckoutPage;
