import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { Col, Row } from 'react-bootstrap';
import { CheckOutCard, UserCheckOutForm, GuestCheckOutForm } from '../index';

const stripePromise = loadStripe(
  'pk_test_51I8sNpFaKOewVNY4tUSyYJjV3mITvfvBrnasXHxBvbLGJywYsN5ahAiISY7KcJR0ntmCkArjeCJJGPcrsscyw4Ax00SLrCE09i'
);

const CheckoutPage = ({ isLoggedIn = true }) => {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];

  return (
    <>
      <div className='nes-container with-title is-rounded w-100'>
        <p className='title'>TEAM ROCKET CHECKOUT w/ STRIPE</p>
        <Row>
          <Col md={3}>
            {cart.map((item) => (
              <CheckOutCard key={item.dex_id} item={item} />
            ))}
          </Col>
          <Col md={5}>
            <Elements stripe={stripePromise}>
              {isLoggedIn ? (
                <UserCheckOutForm cart={cart} />
              ) : (
                <GuestCheckOutForm cart={cart} />
              )}
            </Elements>
          </Col>
          <Col md={4}>ORDER ITEMIZED DETAILS</Col>
        </Row>
      </div>
    </>
  );
};

export default CheckoutPage;
