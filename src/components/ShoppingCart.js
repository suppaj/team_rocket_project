import React, { useState } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { CartItemCard } from './index';

import { loadStripe } from '@stripe/stripe-js';
import { getCheckoutSession } from '../api';

const stripePromise = loadStripe("pk_test_51I8sNpFaKOewVNY4tUSyYJjV3mITvfvBrnasXHxBvbLGJywYsN5ahAiISY7KcJR0ntmCkArjeCJJGPcrsscyw4Ax00SLrCE09i");

const ShoppingCart = ({ cartID, cart, setCart, isLoggedIn }) => {

    // uncomment and change onClick of button to handleClick to reinstate

    // const handleClick = async () => {
    //     const stripe = await stripePromise;
    //     console.log('stripe', stripe)

    //     const ckOutArray = cart.map((item)=>{
    //         return {
    //             price_data: {
    //                 currency: 'usd',
    //                 product_data : {
    //                     name: item.name,
    //                     images: [`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${item.dex_id}.png`]
    //                 },
    //                 unit_amount: item.price*100,
    //             },
    //             quantity: item.cart_quantity
    //         }
    //     });

    //     console.log(ckOutArray);

    //     const session = await getCheckoutSession(ckOutArray);
    //     console.log('session', session);

    //     const result = await stripe.redirectToCheckout({
    //         sessionId: session.id
    //     });
    //     console.log('results', result)
    //     if (result.error) {
    //         // If `redirectToCheckout` fails due to a browser or network
    //         // error, display the localized error message to your customer
    //         // using `result.error.message`.
    //         console.log(result.error.message)
    //     }      
    // }

    return (
        <Row>
            <Col md={8} sm={12}>
                <div className='nes-container with-title'>
                    <p className='title'>TEAM ROCKET CART</p>
                    <br/>
                    {cart.length ? cart.map((order, index)=>{
                        return <CartItemCard key={index} order={order} cart={cart} setCart={setCart} cart_id={cartID} isLoggedIn={isLoggedIn}/>
                    }) : <div className='message-list -left'>
                            <i className='nes-ash align-bottom'></i>
                            <div className='nes-balloon from-left align-top'>
                                <p>Your cart is empty. Gotta buy them all!</p>
                            </div>
                        </div> }
                </div>
                <Button href='/checkout' className={ cart.length ? 'nes-btn is-success' : 'nes-btn is-success'} disabled={!cart.length}>Continue to Checkout</Button>
                {' '}
                <Button href='/' className='nes-btn is-primary' >Return to Shopping</Button>
            </Col>
            <Col md={4} sm={12}>
            itemized info about account.. etc
            </Col>
        </Row>

        
    )
}

export default ShoppingCart