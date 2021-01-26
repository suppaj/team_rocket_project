import React, { useEffect, useState } from 'react';
import { useParams, Redirect, useHistory } from 'react-router-dom';
import { Col } from 'react-bootstrap';
import { getUserOrderHistory } from '../../api';
import { RollingBall, OrderTable, NotLoggedIn } from '../index';

const Order_History = (props) => {

    const { cust_id } = useParams();

    const [ notValid, setNotValid ] = useState(true)
    const [ orderHistory , setOrderHistory] = useState('');

    async function fetchHistory() {
                const results = await getUserOrderHistory(cust_id);
                setOrderHistory(results);
                console.log(results);
    }    

    useEffect(()=>{
        if (cust_id === JSON.parse(localStorage.getItem('user')).custID) {
        setNotValid(false)
        fetchHistory();
        }
    }, [])

    return (
        <>
        <Col md={{span: 8, offset : 2}}>
            { notValid ? <NotLoggedIn /> : orderHistory ? 
                orderHistory.length ? 
                    orderHistory.map((order)=> <OrderTable key={order.date} order={order}/>)
                : <div className='nes-container'>YOU HAVE NO ORDERS AT THIS TIME.</div>
            : 
            <div className='loading-screen nes-container'>LOADING ORDER HISTORY <div><RollingBall /></div> </div>}
        </Col>
        </>
    )
}

export default Order_History