import React from 'react';

const CartOverlay =({cart}) => {

    return (
        <>
        { cart.length ? cart.map((item)=> <p key={item.name}>{item.name} ({item.cart_quantity})</p>)
         :
        <p>No items in cart</p>
        }
        </>
    )
}

export default CartOverlay;