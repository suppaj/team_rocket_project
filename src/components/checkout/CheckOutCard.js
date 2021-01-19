import React from 'react';

const CheckOutCard = ({ item }) => {

    const { price, name, cart_quantity : quantity, dex_id } = item

    return (
        <div className='nes-container'>
            <p>{name}</p>
            <img className='cart-order-image' src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${dex_id}.png`} alt={name}/>
            <p>${price}</p>
            <p># in order: {quantity}</p>
            <p>Item Total: ${(quantity * price).toFixed(2)}</p>
        </div>
    )
};

export default CheckOutCard;