import React, { useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import { CartItemCard } from './index';


const ShoppingCart = ({ cart_id, cust_id }) => {

    const [ cart, setCart ] = useState( JSON.parse(localStorage.getItem('cart') ) || [] );

    return (
        <Row>
            <Col md={8} sm={12}>
                <div className='nes-container with-title'>
                    <p className='title'>TEAM ROCKET CART</p>
                    <br/>
                    {cart.length ? cart.map((order, index)=>{
                        return <CartItemCard key={index} order={order} cart={cart} setCart={setCart} cart_id={cart_id}/>
                    }) : <div className='message-list -left'>
                            <i className='nes-ash align-bottom'></i>
                            <div className='nes-balloon from-left align-top'>
                                <p>Your cart is empty. Gotta buy them all!</p>
                            </div>
                        </div> }
                </div>
                <button type='button' className='nes-btn is-success'>Continue to Checkout</button>
            </Col>
            <Col md={4} sm={12}>
            itemized info about account.. etc
            </Col>
        </Row>

        
    )
}

export default ShoppingCart