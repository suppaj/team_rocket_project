import React, { useState, useEffect } from "react";
import { Container, Row } from "react-bootstrap";
import "./style.css";
import "bootstrap/dist/css/bootstrap.min.css";

import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
  Link,
  useLocation,
  useHistory,
} from "react-router-dom";

import { getSomething, getAllProducts, getAllTypes } from "../api";

import {
  CartButton,
  Products,
  ProductPage,
  ProductsReturn,
  ShoppingCart,
  Login,
  Register,
  CheckoutPage,
  SuccessPage,
  Admin,
} from "./index";

const App = () => {
  const [message, setMessage] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [ cart, setCart ] = useState(JSON.parse(localStorage.getItem('cart')) || [])
  const [ cartCount, setCartCount ] = useState(0)
  const [ user, setUser ] = useState(JSON.parse(localStorage.getItem('user')) || {});
  
 

  useEffect(() => {
    getSomething()
      .then((response) => {
        setMessage(response.message);
      })
      .catch((error) => {
        setMessage(error.message);
      });
    if (!localStorage.getItem('cart')) {
      localStorage.setItem('cart', JSON.stringify([]))
    };
  }, []);

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user) )
  },[user]);

  useEffect(()=>{
    findCartCount();
  },[cart]);

  const findCartCount = async () => {
    let count = 0;
    cart.map((item) => {
      console.log('cart quant: ', item.cart_quantity)
      count += parseInt(item.cart_quantity);
      return item;
    });
    console.log('cart count: ', count)
    setCartCount(count);
  };

  return (
    <Router>
      <Container fluid>
        <Row
          className="bg-primary"
          id="header"
          style={{
            minHeight: "12vh",
            width: "100vw",
          }}
        >
          <div
            className="nes-container is-rounded"
            style={{
              backgroundColor: "#E7E7E7",
              padding: "5px 5px 5px 5px",
              position: "absolute",
              left: "5px",
              top: "5px",
            }}
          >
            <img
              style={{ alignSelf: "left", height: "70px", width: "70px" }}
              src="https://www.clipartmax.com/png/full/153-1530219_team-rocket-clipart-pokemon-team-rocket-logo.png"
              alt="Team Rocket Logo"
            />
          </div>
          <ProductsReturn />
          <Login
            setIsLoggedIn={setIsLoggedIn}
            setIsAdmin={setIsAdmin}
            setFirstName={setFirstName}
            firstName={firstName}
          />
          <Register />
          <CartButton cart={cart} cartCount={cartCount}/>
        </Row>
        <Row
          className="bg-success align-items-center"
          style={{
            minHeight: "78vh",
            width: "100vw",
          }}
        >
          <Switch>
            <Route exact path="/">
              <Row
                style={{
                  marginBottom: "20px",
                  marginTop: "20px",
                  width: "100vw",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Products
                  getAllProducts={getAllProducts}
                  getAllTypes={getAllTypes}
                />
              </Row>
            </Route>
            <Route path="/products/:product_id">
              <Row
                style={{
                  marginBottom: "20px",
                  marginTop: "20px",
                  width: "100vw",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <ProductPage cart={cart} setCart={setCart} cartID={user.cartID} isLoggedIn={isLoggedIn}/>
              </Row>
            </Route>
            <Route path="/shoppingcart">
              <ShoppingCart cart={cart} setCart={setCart} isLoggedIn={isLoggedIn} cartID={user.cartID}/>
            </Route>
            <Route exact path="/checkout/success">
              <SuccessPage isLoggedIn={isLoggedIn}/>
            </Route>
            <Route path="/checkout">
              <CheckoutPage isLoggedIn={isLoggedIn} cart={cart} user={user} cart_id={user.cartID} setCart={setCart}/>
            </Route>
            <Route path="/admin">
              <Admin isAdmin={isAdmin} />
            </Route>
          </Switch>
        </Row>
        <Row
          className="bg-secondary"
          style={{ minHeight: "10vh", width: "100vw" }}
        >
          FOOTER AREA
        </Row>
      </Container>
    </Router>
  );
};
export default App;
