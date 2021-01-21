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

const GuestCheckOutForm = ({ cart }) => {
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
        recordGuestOrder(cart, formInfo)
        localStorage.setItem('cart', JSON.stringify([]));
        history.push({
          pathname: '/checkout/success',
          state: { formInfo },
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
    <CheckoutForm handlePayment={handlePayment} cart={cart} message={message}/>
    <dialog className='nes-dialog' id='process-dialog'>
        <p>PROCESSING PAYMENT</p>
        <RollingBall />
      </dialog>
      {/* <div className='nes-container' id='checkout-form-guest'>
        <p id='ckout-form-info'>
          Fill out contact, shipping, billing, and CC information to complete
          your purchase.
        </p>
        <Tabs id='ckout-tabs' activeKey={key} onSelect={(k) => setKey(k)}>
          <Tab eventKey='contact' title='Contact'>
            <ContactForm
              contactInfo={contactInfo}
              setContactInfo={setContactInfo}
              formStatus={formStatus}
              setKey={setKey}
            />
          </Tab>
          <Tab
            eventKey='shipping'
            title='Shipping'
            disabled={formStatus.contact}
          >
            <ShipForm
              shipInfo={shipInfo}
              setShipInfo={setShipInfo}
              formStatus={formStatus}
              setKey={setKey}
            />
          </Tab>
          <Tab
            eventKey='billing'
            title='Billing'
            disabled={formStatus.shipping}
          >
            <BillForm
              billInfo={billInfo}
              setBillInfo={setBillInfo}
              formStatus={formStatus}
              setKey={setKey}
              handleCheckbox={handleCheckbox}
              isChecked={isChecked}
              shipInfo={shipInfo}
            />
          </Tab>
          <Tab
            eventKey='CC'
            title='Credit Card'
            disabled={
              formStatus.billing || formStatus.contact || formStatus.shipping
            }
          >
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
          </Tab>
        </Tabs>
      </div>

      <dialog className='nes-dialog' id='process-dialog'>
        <p>PROCESSING PAYMENT</p>
        <img
          id='masterball-roll'
          src={
            'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/master-ball.png'
          }
          alt='masterball animation payment processing'
          width='75'
          height='75'
        />
      </dialog> */}
    </>
  );
};

export default GuestCheckOutForm;
