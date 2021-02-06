import React, { useState, useEffect } from "react";
import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from "@stripe/react-stripe-js";
import { Tabs, Tab } from "react-bootstrap";
import ContactForm from "./ContactForm";
import ShipForm from "./ShipForm";
import BillForm from "./BillForm";

const CheckOutForm = ({ handlePayment, cart, firstOrder, user, message }) => {
  const [key, setKey] = useState("contact");
  const [isChecked, setisChecked] = useState(false);
  const [contactInfo, setContactInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });
  const [shipInfo, setShipInfo] = useState({
    add1: "",
    add2: "",
    city: "",
    state: "",
    zipcode: "",
  });
  const [billInfo, setBillInfo] = useState({
    add1: "",
    add2: "",
    city: "",
    state: "",
    zipcode: "",
  });
  const [formStatus, setFormStatus] = useState({
    contact: true,
    shipping: true,
    billing: true,
  });

  const getSubTotal = () => {
    let subTotal = 0;
    for (let item of cart) {
      subTotal += item.cart_quantity * item.price;
    }
    return subTotal;
  };

  useEffect(() => {
    if (firstOrder) {
      setContactInfo({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.custEmail,
      });
      setFormStatus({ ...formStatus, contact: false });
      setKey("shipping");
    }
  }, []);

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

  const handleCheckbox = () => {
    const checked = document.getElementById("same-as-shipping").checked;
    setisChecked(checked);
    if (checked) {
      setBillInfo(shipInfo);
    }
  };

  return (
    <div className="nes-container" id="checkout-form-guest">
      <p id="ckout-form-info">
        Fill out contact, shipping, billing, and CC information to complete your
        purchase.
      </p>
      <Tabs id="ckout-tabs" activeKey={key} onSelect={(k) => setKey(k)}>
        <Tab eventKey="contact" title="Contact">
          <ContactForm
            contactInfo={contactInfo}
            setContactInfo={setContactInfo}
            formStatus={formStatus}
            setKey={setKey}
            firstOrder={firstOrder}
          />
        </Tab>
        <Tab eventKey="shipping" title="Shipping" disabled={formStatus.contact}>
          <ShipForm
            shipInfo={shipInfo}
            setShipInfo={setShipInfo}
            formStatus={formStatus}
            setKey={setKey}
          />
        </Tab>
        <Tab eventKey="billing" title="Billing" disabled={formStatus.shipping}>
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
          eventKey="CC"
          title="Credit Card"
          disabled={
            formStatus.billing || formStatus.contact || formStatus.shipping
          }
        >
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
            onClick={(e) =>
              handlePayment(e, { contactInfo, shipInfo, billInfo })
            }
          >
            PAY ${getSubTotal().toFixed(2)}
          </button>
          <p className="checkout-error-message">{message}</p>
          <div className="nes-container is-dark">
            <p>
              To demonstrate checkout please use either of these two TEST credit
              cards. Use any expiration date in the future and 3 digits for the
              CVC code.
            </p>
            <p>Test Card #1: 4242 4242 4242 4242</p>
            <p>Test Card #2: 4000 0000 0000 0002</p>
          </div>
        </Tab>
      </Tabs>
    </div>
  );
};

export default CheckOutForm;
