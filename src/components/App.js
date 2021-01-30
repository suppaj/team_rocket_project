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
  
  Products,
  ProductPage,
  ProductsReturn,
  ShoppingCart,
  CheckoutPage,
  SuccessPage,
  Admin,
  OrderHistory,
  UserProfile,
  AccountPage,
  Header,
  InvalidUser,
  NotLoggedIn,
} from "./index";

import { Access } from "./admin/index";

const App = () => {
  const [message, setMessage] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(
    JSON.parse(localStorage.getItem("logged-in")) || false
  );
  const [isAdmin, setIsAdmin] = useState(localStorage.getItem("token") || null);
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || { cart: [] }
  );
  const [firstName, setFirstName] = useState("");
  const [cart, setCart] = useState(user.cart || []);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    getSomething()
      .then((response) => {
        setMessage(response.message);
      })
      .catch((error) => {
        setMessage(error.message);
      });
    if (user.custID) {
      setIsLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));

    setCart(user.cart);
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
        <Row
          className="bg-primary"
          id="header"
          style={{
            minHeight: "12vh",
            width: "100vw",
          }}
        >
          <Header setIsLoggedIn={setIsLoggedIn}
              setIsAdmin={setIsAdmin}
              setFirstName={setFirstName}
              firstName={firstName}
              setUser={setUser}
              cart={cart}
              setCart={setCart}
              isAdmin={isAdmin}
              isLoggedIn={isLoggedIn}
              cartCount={cartCount}
              user={user}/>
        </Row>
        <Row
          className="bg-success "
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
            <Route path='/whothis'>
              <NotLoggedIn />
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
