import React from 'react';
import { calcOrderTotal } from '../../api/utils';


const OrderTable = ({order}) => {


    return (
        <>
        <table className='nes-table is-bordered is-centered mx-auto' >
            <thead>
                <tr>
                    <td colSpan='5'>{order.date}</td>
                </tr>
                <tr className='text-center'>
                    <td></td>
                    <td>Item</td>
                    <td>Quantity</td>
                    <td>Item Price</td>
                    <td>Item Total</td>
                </tr>
            </thead>
            <tbody>
            {order.order.map((item)=>{
                return (
                    <tr key={item.name} className='text-center'>
                        <td><img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${item.dex_id}.png`} alt={`${item.name} image`} /></td>
                        <td>{item.name.charAt(0).toUpperCase() + item.name.slice(1)}</td>
                        <td>{item.order_quantity}</td>
                        <td>${item.order_price}</td>
                        <td>${(item.order_price * item.order_quantity).toFixed(2)}</td> 
                    </tr>
                )
            })}
                <tr>
                    <td colSpan='4' className='text-right'>Order Total</td>
                    <td className='text-center'>${calcOrderTotal(order.order)}</td>
                </tr>
            </tbody>   
        </table>
        </>
    )
}

export default OrderTable