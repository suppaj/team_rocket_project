import React, { useEffect, useState } from 'react';
import { useParams, Redirect } from 'react-router-dom';
import { getUserOrderHistory } from '../../api';
import { RollingBall, OrderTable } from '../index';

const OrderHistory = () => {

    const { cust_id } = useParams();

    const [ notValid, setNotValid ] = useState(false)
    const [ orderHistory , setOrderHistory] = useState('');


       

    useEffect(()=>{
        async function fetchHistory() {
                const results = await getUserOrderHistory(cust_id, JSON.parse(localStorage.getItem('user')).token);
                setOrderHistory(results);
        } 
        if (parseInt(cust_id) === JSON.parse(localStorage.getItem('user')).custID) {
        fetchHistory();
        } else { 
            setNotValid(true)
        }
    }, [cust_id])

    return (
        <>
            <br/>
            <h4 className='text-center'>Order History</h4>
            { notValid ? <Redirect to='/whothis' /> : orderHistory ? 
                orderHistory.length ? 
                    orderHistory.map((order)=> {
                    return (
                        <div key={order.date}>
                        <OrderTable  order={order} />
                        <br/>
                        </div>
                    )
                })
                : <div className='nes-container'>YOU HAVE NO ORDERS AT THIS TIME.</div>
            : 
            <div className='loading-screen nes-container'>LOADING ORDER HISTORY <div><RollingBall /></div> </div>}
        </>
    )
}

export default OrderHistory