import React from 'react';
import { Col } from 'react-bootstrap';
import { BouncingBall, CartItemCard, CartTable } from '../index';

import { loadStripe } from '@stripe/stripe-js';
// import { getCheckoutSession } from '../api'; // uncomment to use stripe hosted checkout

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
        <>
            <Col md={cart.length ? {span: 7}:{span :'auto', offset: 1}} >
                    {cart.length ? cart.map((order, index)=>{
                        return <CartItemCard key={index} order={order} cart={cart} setCart={setCart} cart_id={cartID} isLoggedIn={isLoggedIn}/>
                    }) : <div className='message-list -left'>
                            <div className='nes-balloon from-right align-top'>
                                <p>Your cart is empty. Gotta buy them all!</p>
                            </div>
                            <i className='nes-ash align-bottom' style={{transform : 'scaleX(-1)'}}></i>                         
                        </div> }                
            </Col>
            <Col md={cart.length ? {span: 3}:{span: 4}} className={cart.length ? 'align-self-start mx-auto sticky-top' : 'mx-auto align-self-center'}>
            { cart.length ? <>
                <CartTable cart={cart} /> 
                <div>
                <a className='nes-btn is-primary' href='/' style={{textDecoration:'none', color: 'white'}}>Return to Shopping</a>
            </div>
            <br/>
            <div>
                <a className={ cart.length ? 'nes-btn is-success' : 'nes-btn is-disabled'} disabled={!cart.length} href='/checkout' style={{textDecoration:'none', color: 'white'}}>Checkout</a>
            </div></>
                : 
                <div>
                    <a className='nes-btn is-primary' href='/' style={{textDecoration:'none', color: 'white'}}>Return to Shopping</a>
                </div>
            }
            {cart.length ?
            <BouncingBall /> :
            ''} 
            </Col>
        </>

        
    )
}

export default ShoppingCart