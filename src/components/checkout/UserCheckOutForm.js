import React, { useState, useEffect } from "react";
import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useHistory } from "react-router-dom";
import { Modal } from "react-bootstrap";
import {
  postPaymentIntent,
  getUserShipInfo,
  recordShipandBill,
  recordUserOrder,
  clearUserCart,
} from "../../api";
import RollingBall from "../RollingBall";
import CheckOutForm from "./CheckOutForm";

const UserCheckOutForm = ({ cart, user, setUser }) => {
  const stripe = useStripe();
  const elements = useElements();
  const history = useHistory();

  const [show, setShow] = useState(false);
  const [firstOrder, setFirstOrder] = useState(true);
  const [message, setMessage] = useState("");

  const [shipInfo, setshipInfo] = useState({
    add1: "",
    add2: "",
    city: "",
    state: "",
    zipcode: "",
  });

  useEffect(() => {
    async function fetchData() {
      const results = await getUserShipInfo(user.custID, user.token);
      if (results.cust_id) {
        setshipInfo(results);
        setFirstOrder(false);
      }
      if (results.message) {
        history.push("/whothis");
      }
    }
    fetchData();
  }, [history, user.custID, user.token]);

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
        backgroundColor: "white",
        color: "black",
        iconColor: "black",
        fontSize: "24px",
      },
      invalid: {
        color: "red",
        iconColor: "red",
      },
    },
  };

  const handlePayment = async (e, formInfo) => {
    e.preventDefault();
    setShow(true);
    try {
      const { clientSecret } = await postPaymentIntent(cart, user);
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: `${user.firstName} ${user.lastName}`,
          },
        },
      });
      setShow(false);
      if (result.error) {
        setMessage(result.error.message);
      } else if (firstOrder) {
        await recordShipandBill(formInfo, user.custID, user.token);
        await recordUserOrder(user.custID, cart, user.token);
        await clearUserCart(user.cartID, user.token);
        localStorage.setItem("user", JSON.stringify({ ...user, cart: [] }));
        setUser({ ...user, cart: [] });
        history.push({
          pathname: "/checkout/success",
          state: { message: "Thank you for your order" },
        });
      } else {
        await recordUserOrder(user.custID, cart, user.token);
        await clearUserCart(user.cartID, user.token);
        localStorage.setItem("user", JSON.stringify({ ...user, cart: [] }));
        setUser({ ...user, cart: [] });
        history.push({
          pathname: "/checkout/success",
          state: { message: "Thank you for your order" },
        });
      }
    } catch (error) {
      setShow(false);
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
          message={message}
        />
      ) : (
        <div className="nes-container">
          <p>
            To change shipping information, go to your profile settings{" "}
            <a href={`/users/${user.custID}/account`}>here.</a>
          </p>
          <p>Ship to:</p>
          <p>
            {user.firstName} {user.lastName}
          </p>
          <p>{shipInfo.ship_add1}</p>
          <p>{shipInfo.ship_add2}</p>
          <p>
            {shipInfo.ship_city}, {shipInfo.ship_state} {shipInfo.ship_zipcode}
          </p>
          <br />
          <p>Payment Information</p>
          <div id="cc-info-box">
            Card Number
            <CardNumberElement options={CARD_OPTIONS} />
            Expiration Date
            <CardExpiryElement options={CARD_OPTIONS} />
            Security Code
            <CardCvcElement options={CARD_OPTIONS} />
          </div>
          <button
            className="nes-btn is-primary checkout-pay-btn"
            onClick={handlePayment}
          >
            PAY ${getSubTotal().toFixed(2)}
          </button>
          <p>{message}</p>
          <div className='nes-container is-dark'>
            <p>To demonstrate checkout please use either of these two TEST credit cards.  Use any expiration date in the future and 3 digits for the CVC code.</p>
            <p>Test Card #1: 4242 4242 4242 4242</p>
            <p>Test Card #2: 4000 0000 0000 0002</p>
          </div>
        </div>
      )}
      {/* modal */}
      <Modal
        className="nes-dialog"
        id="process-dialog"
        show={show}
        backdrop="static"
        centered
        keyboard="false"
        size="xl"
      >
        <Modal.Body>
          <p>PROCESSING PAYMENT</p>
          <RollingBall />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default UserCheckOutForm;
