import React, { useState } from 'react';
import { Row, Col, Button } from 'react-bootstrap';

const CartItemCard = ({ order }) => {

    const [ adjustOrder, setAdjustOrder ] = useState(false);
    const [ orderAmount, setOrderAmount ] = useState(order.order_quantity)


    const handleRemoveItem = () => {
        console.log('I want to remove this item')
        // remove item for guest, create route for user
    }

    const handleChange = (e) => {
        if (e.target.value > order.quantity) {
            setOrderAmount(order.quantity)
        } else if (e.target.value < 1) {
            setOrderAmount(1);
        } else { setOrderAmount(e.target.value)}
    }


    return (
        <div className='nes-container with-title'>
            <Row>
                <Col>
                    <img className='cart-order-image' src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${order.dex_id}.png`} alt={order.name}/>
                    <p>${order.price}</p>
                    {adjustOrder ?
                    <div className='nes-field'>
                        <label >Quantity:</label>
                        <input className='nes-input' type='number' id='order_adjust' style={{width : '6rem'}} value={orderAmount} step={1} min={1} max={order.quantity} onChange={handleChange} autoFocus/>
                        <Button variant='link' onClick={()=>setAdjustOrder(false)}>confirm change</Button>
                    </div>
                    :
                    <p>Quantity: {orderAmount}  <Button variant='link' onClick={() => setAdjustOrder(true)}>change</Button></p>}
                    <p>Item Total: ${(orderAmount * order.price)}</p>
                    <br/>
                    <button type='button' className='nes-btn is-error' onClick={handleRemoveItem}>Remove Item</button>
                </Col>
                <Col>
                    <p>{order.name.toUpperCase()}</p>
                    <p>Description:  {order.description}</p>
                    <p>Height: {order.height}</p>
                    <p>Weight: {order.weight}</p>
                    <p>Type: {order.type.map((type, index) => {
                                return (
                                <span
                                    className={`${type} typing nes-container is-rounded`}
                                    style={{
                                    marginRight: "10px",
                                    marginLeft: "10px",
                                    padding: "2px",
                                    }}
                                    key={index} >                            
                                    {type}
                                </span>)})}
                    </p>
                    
                </Col>
            </Row>
            
        </div>
    )
};

export default CartItemCard