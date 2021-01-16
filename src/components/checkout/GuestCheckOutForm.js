import React, { useState, useEffect } from 'react';
import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import { Tabs, Tab } from 'react-bootstrap';
import { postPaymentIntent } from '../../api';
import ContactForm from './ContactForm';
import ShipForm from './ShipForm';
import BillForm from './BillForm';

const GuestCheckOutForm = ({ cart }) => {
  const stripe = useStripe();
  const elements = useElements();

  const [key, setKey] = useState('contact');
  const [isChecked, setisChecked] = useState(false);
  const [contactInfo, setContactInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
  });
  const [shipInfo, setShipInfo] = useState({
    add1: '',
    add2: '',
    city: '',
    state: '',
    zipcode: '',
  });
  const [billInfo, setBillInfo] = useState({
    add1: '',
    add2: '',
    city: '',
    state: '',
    zipcode: '',
  });
  const [formStatus, setFormStatus] = useState({
    contact: true,
    shipping: true,
    billing: true,
  });
  const [message, setMessage] = useState('');

  const getSubTotal = () => {
    let subTotal = 0;
    for (let item of cart) {
      subTotal += item.cart_quantity * item.price;
    }
    return subTotal;
  };

  useEffect(() => {
    setFormStatus({ ...formStatus, contact: false });
    Object.values(contactInfo).map((value) => {
      if (value) {
        return value;
      } else {
        setFormStatus({ ...formStatus, contact: true });
        return value;
      }
    });
  }, [contactInfo]);

  useEffect(() => {
    setFormStatus({ ...formStatus, shipping: false });
    let copyShip = { ...shipInfo };
    delete copyShip.add2;
    Object.values(copyShip).map((value) => {
      if (value) {
        return value;
      } else {
        setFormStatus({ ...formStatus, shipping: true });
        return value;
      }
    });
  }, [shipInfo]);

  useEffect(() => {
    setFormStatus({ ...formStatus, billing: false });
    let copyBill = { ...billInfo };
    delete copyBill.add2;
    Object.values(copyBill).map((value) => {
      if (value) {
        return value;
      } else {
        setFormStatus({ ...formStatus, billing: true });
        return value;
      }
    });
  }, [billInfo]);

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

  const handleCheckbox = () => {
    const checked = document.getElementById('same-as-shipping').checked;
    setisChecked(checked);
    if (checked) {
      setBillInfo(shipInfo);
    }
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    document.getElementById('process-dialog').showModal();
    const { clientSecret } = await postPaymentIntent(cart);
    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardNumberElement),
        billing_details: {
          name: `${contactInfo.firstName} ${contactInfo.lastName}`,
        },
      },
    });
    document.getElementById('process-dialog').style.display='none';
    if (result.error) {
      setMessage(result.error.message);
    } else {
      setMessage(`Payment ${result.paymentIntent.status}`);
    }
  };

  return (
    <>
    <div className='nes-container' id='checkout-form-guest'>
      <p id='ckout-form-info'>
        Fill out contact, shipping, billing, and CC information to complete your
        purchase.
      </p>
      <Tabs id='ckout-tabs' activeKey={key} onSelect={(k) => setKey(k)}>
        <Tab eventKey='contact' title='Contact'>
          <ContactForm contactInfo={contactInfo} setContactInfo={setContactInfo} formStatus={formStatus} setKey={setKey} />
        </Tab>
        <Tab eventKey='shipping' title='Shipping' disabled={formStatus.contact}>
          <ShipForm shipInfo={shipInfo} setShipInfo={setShipInfo} formStatus={formStatus} setKey={setKey}/>
        </Tab>
        <Tab eventKey='billing' title='Billing' disabled={formStatus.shipping}>
          <BillForm billInfo={billInfo} setBillInfo={setBillInfo} formStatus={formStatus} setKey={setKey} handleCheckbox={handleCheckbox} isChecked={isChecked} shipInfo={shipInfo}/>
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
            <CardNumberElement options={CARD_OPTIONS} />
            <CardExpiryElement options={CARD_OPTIONS} />
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

    <dialog class='nes-dialog' id='process-dialog'>
          <p>PROCESSING PAYMENT</p>
          <img id='masterball-roll' src={
            "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/master-ball.png" 
          }
          alt='masterball animation payment processing' width='75' height='75'/>      
    </dialog>
    </> 
  );
};

export default GuestCheckOutForm;
