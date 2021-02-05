import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Register,
  Login,
  Logout,
  ProfileButton,
  ProductsReturn,
  CartButton,
  Access,
  Welcome,
} from "../index";

const Header = ({
  setIsLoggedIn,
  setIsAdmin,
  setFirstName,
  firstName,
  setUser,
  cart,
  setCart,
  isAdmin,
  isLoggedIn,
  cartCount,
  user,
}) => {
  const [welcomeShow, setWelcomeShow] = useState(false);

  return (
    <div className="header-container">
      <div className="header-banner">
        <a
          href="/"
          onClick={() => {
            localStorage.removeItem("sortQuery");
            localStorage.removeItem("searchQuery");
            localStorage.removeItem("filterQuery");
            localStorage.removeItem("pageQuery");
          }}
        >
          <h1>Team Rocket Pet Shop</h1>
        </a>
      </div>
      <div className="header-button-group">
        <ProductsReturn />
        {isLoggedIn ? (
          <>
            <Logout
              setUser={setUser}
              setIsAdmin={setIsAdmin}
              setIsLoggedIn={setIsLoggedIn}
            />{" "}
            <ProfileButton user={user} />
          </>
        ) : (
          <>
            <Login
              setIsLoggedIn={setIsLoggedIn}
              setFirstName={setFirstName}
              setUser={setUser}
              cart={cart}
              setWelcomeShow={setWelcomeShow}
            />
            <Register
              setWelcomeShow={setWelcomeShow}
              firstName={firstName}
              setFirstName={setFirstName}
              setIsLoggedIn={setIsLoggedIn}
              setUser={setUser}
            />{" "}
          </>
        )}

        {isAdmin ? (
          <Link to="/admin">
            <Access isAdmin={isAdmin} />
          </Link>
        ) : (
          ""
        )}

        <CartButton cart={cart} cartCount={cartCount} />

        {/* modal moved to live in header */}
        <Welcome
          setWelcomeShow={setWelcomeShow}
          welcomeShow={welcomeShow}
          firstName={firstName}
          setOuterShow={() => null}
        />
      </div>
    </div>
  );
};

export default Header;
