import React, { useEffect, useState } from 'react';

const AddToCart = ({product}) => {

    const handleClick = () => {
        const currCart = JSON.parse(localStorage.getItem('cart')).cart;
        if (currCart) {
            currCart.push(product)
            localStorage.setItem('cart', JSON.stringify({cart : currCart}))
        } else {
            localStorage.setItem('cart', JSON.stringify({cart :[product]}))
        }

        document.getElementById('add-cart-dialog').showModal();
    }

    return (
        <>
        <button type='button' className='nes-btn' onClick={handleClick}>Add To Cart</button>
        <dialog className='new-dialog' id='add-cart-dialog'>
            <form method='dialog'>
                <p className='title'>Added To Cart</p>
                <p>Your {product.name} has been added to your cart.</p>
                <menu className="dialog-menu">
                    <button className="nes-btn">Continue Shopping</button>
                    <button className="nes-btn is-primary">Checkout</button>
                </menu>
            </form>
        </dialog>

        </>
    )
}

export default AddToCart
