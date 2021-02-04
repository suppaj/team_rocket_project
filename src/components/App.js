import React, { useState, useEffect } from "react";
import { Container, Row } from "react-bootstrap";
import "./style.css";
import "bootstrap/dist/css/bootstrap.min.css";

import {
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom";

import { getSomething, getAllProducts, getAllTypes } from "../api";

import {
  Products,
  ProductPage,
  ShoppingCart,
  CheckoutPage,
  SuccessPage,
  Admin,
  AccountPage,
  Header,
  NotLoggedIn,
} from "./index";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || { cart: [] }
  );
  const [firstName, setFirstName] = useState("");
  const [cart, setCart] = useState(user.cart || []);
  const [cartCount, setCartCount] = useState(0);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    
    if (user.firstName) {
      setIsLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
    setCart(user.cart);
    if (user.firstName) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
    if (user.siteAdmin) {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
  }, [user]);

  useEffect(() => {
    findCartCount();
  }, [cart]);

  const findCartCount = async () => {
    let count = 0;
    cart.map((item) => {
      count += parseInt(item.cart_quantity);
      return item;
    });

    setCartCount(count);
  };

  return (
    <Router>
      <Container fluid>
        <Row className="site-header" id="header">
          <Header
            setIsLoggedIn={setIsLoggedIn}
            setIsAdmin={setIsAdmin}
            setFirstName={setFirstName}
            firstName={firstName}
            setUser={setUser}
            cart={cart}
            setCart={setCart}
            isAdmin={isAdmin}
            isLoggedIn={isLoggedIn}
            cartCount={cartCount}
            user={user}
          />
        </Row>
        <Row className="site-body">
          <Switch>
            <Route exact path="/">
              <Row className="products-container">
                <Products
                  getAllProducts={getAllProducts}
                  getAllTypes={getAllTypes}
                />
              </Row>
            </Route>
            <Route path="/products/:product_id">
              <Row className="products-container">
                <ProductPage
                  cartID={user.cartID}
                  isLoggedIn={isLoggedIn}
                  user={user}
                  cart={cart}
                  setUser={setUser}
                />
              </Row>
            </Route>
            <Route path="/shoppingcart">
              <ShoppingCart
                cart={cart}
                user={user}
                setUser={setUser}
                isLoggedIn={isLoggedIn}
                cartID={user.cartID}
              />
            </Route>
            <Route exact path="/checkout/success">
              <SuccessPage isLoggedIn={isLoggedIn} />
            </Route>
            <Route path="/checkout">
              <CheckoutPage
                isLoggedIn={isLoggedIn}
                cart={cart}
                user={user}
                cart_id={user.cartID}
                setUser={setUser}
              />
            </Route>
            <Route path="/admin">
              <Admin isAdmin={isAdmin} />
            </Route>
            <Route path="/users/:cust_id/account">
              <AccountPage />
            </Route>
            <Route path="/whothis">
              <NotLoggedIn />
            </Route>
          </Switch>
        </Row>
        <Row className="site-footer">FOOTER AREA</Row>
      </Container>
    </Router>
  );
};
export default App;
