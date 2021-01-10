import React, { useEffect, useState } from 'react';

const AddToCart = ({product}) => {

    const [ orderAmount, setOrderAmount ] = useState(1);

    const handleAddToCart = () => {
        const currCart = JSON.parse(localStorage.getItem('cart'));
        product.order_quantity = orderAmount
        if (currCart) {
            currCart.push(product)
            localStorage.setItem('cart', JSON.stringify(currCart))
        } else {
            localStorage.setItem('cart', JSON.stringify([product]))
        }

        // function call for a user?

        document.getElementById('add-cart-dialog').showModal();
    }

    const handleGoToCheckout = () => {
        console.log('I want to checkout now')
        // process for guest?  process for user?
    }

    return (
        <div>
            <button type='button' className='nes-btn' onClick={()=>document.getElementById('order-amount-dialog').showModal()}><i className="nes-pokeball is-icon"></i></button>

            <dialog className='new-dialog' id='order-amount-dialog'>
                <form method='dialog'>
                    <p>How many {product.name.toUpperCase()}(s) would you like?</p>
                    <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${product.dex_id}.png`} />
                    <input className='nes-input' type='number' value={orderAmount} step={1} min={1} max={product.quantity} onChange={(e)=>setOrderAmount(e.target.value)}/>
                    <br/>
                    <br/>
                    <menu className='dialog-menu'>
                        <button className='nes-btn is-error'>Cancel</button>
                        {' '}
                        <button className='nes-btn is-success' onClick={handleAddToCart}>Add To Cart</button>
                    </menu>
                </form>
            </dialog>

            <dialog className='new-dialog' id='add-cart-dialog'>
                <form method='dialog'>
                    <p className='title'>Added To Cart</p>
                    <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${product.dex_id}.png`} />
                    <p>{orderAmount} {product.name.toUpperCase()}(s) has been added to your cart.</p>
                    <menu className="dialog-menu">
                        <button className="nes-btn is-success">Continue Shopping</button>
                        {'  '}
                        <button className="nes-btn is-primary" onClick={handleGoToCheckout}>Checkout</button>
                    </menu>
                </form>
            </dialog>

            
        </div>
    )
}

export default AddToCart
