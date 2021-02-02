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
    <>
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
        <a
          href="/"
          onClick={() => {
            localStorage.removeItem("sortQuery");
            localStorage.removeItem("searchQuery");
            localStorage.removeItem("filterQuery");
            localStorage.removeItem("pageQuery");
          }}
        >
          <img
            style={{ alignSelf: "left", height: "70px", width: "70px" }}
            src="https://www.clipartmax.com/png/full/153-1530219_team-rocket-clipart-pokemon-team-rocket-logo.png"
            alt="Team Rocket Logo"
          />
        </a>
      </div>
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
            setIsAdmin={setIsAdmin}
            setFirstName={setFirstName}
            firstName={firstName}
            setUser={setUser}
            cart={cart}
            setCart={setCart}
            setWelcomeShow={setWelcomeShow}
          />
          <Register
            setWelcomeShow={setWelcomeShow}
            welcomeShow={welcomeShow}
            setOuterShow={() => null}
            firstName={firstName}
            setFirstName={setFirstName}
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
    </>
  );
};

export default Header;
