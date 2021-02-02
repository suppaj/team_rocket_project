import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Col } from 'react-bootstrap';
import { getUserOrderHistory } from '../../api';
import { RollingBall, OrderTable, NotLoggedIn } from '../index';

const OrderHistory = (props) => {

    const { cust_id } = useParams();

    const [ notValid, setNotValid ] = useState(true)
    const [ orderHistory , setOrderHistory] = useState('');

    async function fetchHistory() {
                const results = await getUserOrderHistory(cust_id);
                setOrderHistory(results);
    }    

    useEffect(()=>{
        if (cust_id == JSON.parse(localStorage.getItem('user')).custID) {
        setNotValid(false)
        fetchHistory();
        }
    }, [])

    return (
        <>
            <br/>
            <h4 className='text-center'>Order History</h4>
            { notValid ? <NotLoggedIn /> : orderHistory ? 
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