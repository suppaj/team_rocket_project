import { profileEnd } from 'console';
import React, { useEffect, useState } from 'react';

const AddToCart = ({product}) => {

    const handleClick = () => {
        const currCart = localStorage.getItem('cart');
        if (currCart) {
            currCart.push(product)
            localStorage.setItem('cart', currCart)
        } else {
            localStorage.setItem('cart', [product])
        }

        document.getElementById('add-cart-dialog').showModal();
    }

    return (
        <>
        <button type='button' class='nes-btn' onClick={handleClick}>Add To Cart</button>
        <dialog class='new-dialog' id='add-cart-dialog'>
            <form method='dialog'>
                <p class='title'>Added To Cart</p>
                <p>Your {product.name} has been added to your cart.</p>
                <menu class="dialog-menu">
                    <button class="nes-btn">Continue Shopping</button>
                    <button class="nes-btn is-primary">Checkout</button>
                </menu>
            </form>
        </dialog>

        </>
    )
}

export default AddToCart
