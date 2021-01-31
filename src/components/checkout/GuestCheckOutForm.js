import React, { useState } from 'react';
import {
  CardNumberElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import { Modal } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { postPaymentIntent, recordGuestOrder } from '../../api';
import CheckoutForm from './CheckOutForm';
import RollingBall from '../RollingBall';

const GuestCheckOutForm = ({ cart, user, setUser }) => {
  const stripe = useStripe();
  const elements = useElements();
  const history = useHistory();
  const [message, setMessage] = useState('');
  const [ show, setShow ] = useState(false);

  const handlePayment = async (e, formInfo) => {
    const { contactInfo } = formInfo;
    e.preventDefault();
    setShow(true)
    try {
      const { clientSecret, ckoutToken } = await postPaymentIntent(cart, user);
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: `${contactInfo.firstName} ${contactInfo.lastName}`,
          },
        },
      });
      setShow(false)
      if (result.error) {
        setMessage(result.error.message);
      } else {
        await recordGuestOrder(cart, formInfo, ckoutToken);
        localStorage.setItem('user', JSON.stringify({...user, cart : []}));
        setUser({...user, cart : []});
        history.push({
          pathname: '/checkout/success',
          state: { formInfo },
        });
      }
    } catch (error) {
      setShow(false)
      setMessage(error.message);
      throw error;
    }
  };

  return (
    <>
    <CheckoutForm handlePayment={handlePayment} cart={cart} message={message}/>

    <Modal className='nes-dialog' id='process-dialog' show={show} backdrop='static' centered keyboard='false' size='xl'>
      <Modal.Body>
          <p>PROCESSING PAYMENT</p>
          <RollingBall />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default GuestCheckOutForm;
