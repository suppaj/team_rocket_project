import React from 'react';

const CartOverlay =(props) => {

    const cart = JSON.parse(localStorage.getItem('cart'));

    return (
        <>
        { cart.length ? cart.map((item)=> <p>{item.name} ({item.cart_quantity})</p>)
         :
        <p>No items in cart</p>
        }
        </>
    )
}

export default CartOverlay;