import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { Col, Row } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import { CheckOutCard, UserCheckOutForm, GuestCheckOutForm, CartTable } from '../index';

const stripePromise = loadStripe(
  'pk_test_51I8sNpFaKOewVNY4tUSyYJjV3mITvfvBrnasXHxBvbLGJywYsN5ahAiISY7KcJR0ntmCkArjeCJJGPcrsscyw4Ax00SLrCE09i'
);

const CheckoutPage = ({ isLoggedIn, cart, user, setCart }) => {

  
  return (
    <>{ cart.length ? 
      <div className='nes-container with-title is-rounded w-75 mx-auto'>
        <p className='title'>TEAM ROCKET CHECKOUT w/ STRIPE</p>
        <Row>
          {/* <Col md={3}>
            {cart.map((item) => (
              <CheckOutCard key={item.dex_id} item={item} />
            ))}
          </Col> */}
          <Col  className='sticky-top'>
            <Elements stripe={stripePromise}>
              {isLoggedIn ? (
                <UserCheckOutForm cart={cart} user={user} setCart={setCart}/>
              ) : (
                <GuestCheckOutForm cart={cart} setCart={setCart} />
              )}
            </Elements>
          </Col>
          <Col >
            <CartTable cart={cart} />
          </Col>
        </Row>
      </div>
      :
      <Redirect to='/shoppingcart' />}
    </>
  );
};

export default CheckoutPage;
