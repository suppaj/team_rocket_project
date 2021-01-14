import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { Col, Row } from 'react-bootstrap';
import { CheckOutCard, UserCheckOutForm, GuestCheckOutForm } from '../index';

const stripePromise = loadStripe("pk_test_51I8sNpFaKOewVNY4tUSyYJjV3mITvfvBrnasXHxBvbLGJywYsN5ahAiISY7KcJR0ntmCkArjeCJJGPcrsscyw4Ax00SLrCE09i");

const CheckoutPage = ({ isLoggedIn }) => {

    const cart = JSON.parse(localStorage.getItem('cart')) || []

    return (
        <>
        <div className='nes-container with-title is-rounded'>
            <p className='title'>TEAM ROCKET CHECKOUT w/ STRIPE</p>
            <Row>
                <Col>
                    {cart.map((item)=> <CheckOutCard key={item.dex_id} item={item}/>)}
                </Col>
                <Col>
                    <Elements stripe={stripePromise}>
                        {isLoggedIn ? <UserCheckOutForm /> : <GuestCheckOutForm />}
                </Elements>
                </Col>
            </Row>
        </div>
        </>
    )
};

export default CheckoutPage;