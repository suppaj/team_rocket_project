import React, { useState, useEffect } from 'react';
import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import { Tabs, Tab } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { postPaymentIntent, recordGuestOrder } from '../../api';
import CheckoutForm from './CheckOutForm';
import RollingBall from '../RollingBall';
// import ContactForm from './ContactForm';
// import ShipForm from './ShipForm';
// import BillForm from './BillForm';

const GuestCheckOutForm = ({ cart, setCart }) => {
  const stripe = useStripe();
  const elements = useElements();
  const history = useHistory();
  const [message, setMessage] = useState('');

  const handlePayment = async (e, formInfo) => {
    const { contactInfo } = formInfo;
    e.preventDefault();
    document.getElementById('process-dialog').showModal();
    try {
      const { clientSecret } = await postPaymentIntent(cart);
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: `${contactInfo.firstName} ${contactInfo.lastName}`,
          },
        },
      });
      document.getElementById('process-dialog').style.display = 'none';
      if (result.error) {
        setMessage(result.error.message);
      } else {
        setMessage(`Payment ${result.paymentIntent.status}`); //not really needed anymore
        await recordGuestOrder(cart, formInfo);
        setCart([]);
        localStorage.setItem('cart', JSON.stringify([]));
        history.push({
          pathname: '/checkout/success',
          state: { formInfo },
        });
      }
    } catch (error) {
      document.getElementById('process-dialog').style.display = 'none';
      setMessage(error.message);
      throw error;
    }
  };

  return (
    <>
    <CheckoutForm handlePayment={handlePayment} cart={cart} message={message}/>
    <dialog className='nes-dialog' id='process-dialog'>
        <p>PROCESSING PAYMENT</p>
        <RollingBall />
      </dialog>
    </>
  );
};

export default GuestCheckOutForm;
