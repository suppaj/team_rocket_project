import React, { useState, useEffect } from 'react';
import { Button, Badge, Col, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { CartOverlay } from './index';

const CartButton = ({ updateFlag = false }) => {

    const [ cartCount, setCartCount ] = useState( 0 )

    useEffect(()=>{
        findCartCount();
    },[updateFlag])

    const findCartCount = () => {
        const cart = JSON.parse(localStorage.getItem('cart'));
        let count = 0;
        cart.map((item)=>{
            count += item.cart_quantity;
            return item
        })
        setCartCount(count);
    }

    return (
        <Col sm={1} md={1} lg={1} xl={1}>
            <OverlayTrigger placement='left' overlay={
                <Tooltip>
                    <CartOverlay />
                </Tooltip>
            }>
                <Button href='/shoppingcart' variant='link' style={{color : 'white', fontSize : '1rem'}}>
                    <span>{cartCount}
                <Badge><i className='fas fa-shopping-cart' style={{color : 'white', fontSize : '2rem'}}></i></Badge>
                </span>
                <span className='sr-only'>total items in cart</span>
                </Button>
            </OverlayTrigger>
        </Col>
    )
}

export default CartButton;