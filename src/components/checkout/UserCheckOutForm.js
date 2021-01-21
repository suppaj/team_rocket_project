import React, { useState, useEffect } from 'react';
import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import { useHistory } from 'react-router-dom';
import { postPaymentIntent, getUserShipInfo, recordShipandBill, recordUserOrder } from '../../api';
import RollingBall from '../RollingBall';
import CheckOutForm from './CheckOutForm';

const UserCheckOutForm = ({
  cart,
  user = { first_name: 'Kyle', last_name: 'Howell', cust_id: 7, cust_email : 'kylhowl@gmail.com' },
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const history = useHistory();

  const [firstOrder, setFirstOrder] = useState(true);
  const [message, setMessage] = useState('');

  const [shipInfo, setshipInfo] = useState({
    add1: '',
    add2: '',
    city: '',
    state: '',
    zipcode: '',
  });

  useEffect(() => {
    async function fetchData() {
      const results = await getUserShipInfo(user.cust_id);
      if (results.cust_id) {
        setshipInfo(results);
        setFirstOrder(false);
      }
    }
    fetchData();
  }, []);

  const getSubTotal = () => {
    let subTotal = 0;
    for (let item of cart) {
      subTotal += item.cart_quantity * item.price;
    }
    return subTotal;
  };

  const CARD_OPTIONS = {
    style: {
      base: {
        backgroundColor: 'white',
        color: 'black',
        iconColor: 'black',
        fontSize: '24px',
      },
      invalid: {
        color: 'red',
        iconColor: 'red',
      },
    },
  };

  const handlePayment = async (e, formInfo) => {
    e.preventDefault();
    document.getElementById('process-dialog').showModal();
    try {
      const { clientSecret } = await postPaymentIntent(cart);
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: `${user.first_name} ${user.last_name}`,
          },
        },
      });
      document.getElementById('process-dialog').style.display = 'none';
      if (result.error) {
        setMessage(result.error.message);
      } else if (firstOrder) {
        setMessage(`Payment ${result.paymentIntent.status}`); //not really needed anymore
        // function to record userOrder, and shipping info etc...
        await recordShipandBill(formInfo, user.cust_id);
        console.log('completed this step')
        await recordUserOrder(user.cust_id, cart);
        localStorage.setItem('cart', JSON.stringify([]));
        history.push({
          pathname: '/checkout/success',
          state: { formInfo },
        });
      } else {
        // function to record userOrder
        await recordUserOrder(user.cust_id, cart);
        localStorage.setItem('cart', JSON.stringify([]));
        history.push({
          pathname: '/checkout/success',
          state: { message : 'Thank you for your order'}
        });
      }
    } catch (error) {
      document.getElementById('process-dialog').style.display = 'none';
      setMessage(error);
      throw error;
    }
  };

  return (
    <>
      {firstOrder ? (
        <CheckOutForm
          handlePayment={handlePayment}
          firstOrder={firstOrder}
          cart={cart}
          user={user}
        />
      ) : (
        <div className='nes-container'>
          <p>
            To change shipping information, go to your profile settings{' '}
            <a>here.</a>
          </p>
          <p>Ship to:</p>
          <p>{shipInfo.ship_add1}</p>
          <p>{shipInfo.ship_add2}</p>
          <p>
            {shipInfo.ship_city}, {shipInfo.ship_state} {shipInfo.ship_zipcode}
          </p>
          <br />
          <p>Payment Information</p>
          <div id='cc-info-box'>
            Card Number
            <CardNumberElement options={CARD_OPTIONS} />
            Expiration Date
            <CardExpiryElement options={CARD_OPTIONS} />
            Security Code
            <CardCvcElement options={CARD_OPTIONS} />
          </div>
          <button
            className='nes-btn is-primary'
            style={{ fontSize: '1.5rem', width: '100%' }}
            onClick={handlePayment}
          >
            PAY ${getSubTotal().toFixed(2)}
          </button>
          <p>{message}</p>
          <p>test CC card#: 4242 4242 4242 4242</p>
        </div>
      )}
      {/* modal */}
      <dialog className='nes-dialog' id='process-dialog'>
        <p>PROCESSING PAYMENT</p>
        <RollingBall />
      </dialog>
    </>
  );
};

export default UserCheckOutForm;
