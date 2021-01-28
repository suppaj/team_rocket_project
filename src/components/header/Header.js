import React from 'react';
import { Link } from 'react-router-dom';
import {
    Register,
    Login,
    Logout,
    ProfileButton,
    ProductsReturn,
    CartButton,
    Access
} from '../index';

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
    user
    }
    ) => {

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
            <img
              style={{ alignSelf: "left", height: "70px", width: "70px" }}
              src="https://www.clipartmax.com/png/full/153-1530219_team-rocket-clipart-pokemon-team-rocket-logo.png"
              alt="Team Rocket Logo"
            />
          </div>
          <ProductsReturn />

            { isLoggedIn ?
            <>
            <Logout
                setUser={setUser}
                setIsAdmin={setIsAdmin}
                setIsLoggedIn={setIsLoggedIn}
              /> <ProfileButton user={user} /></>
              :
            <> 
            <Login
                setIsLoggedIn={setIsLoggedIn}
                setIsAdmin={setIsAdmin}
                setFirstName={setFirstName}
                firstName={firstName}
                setUser={setUser}
                cart={cart}
                setCart={setCart}
            />
            <Register /> </>
            }

        { isAdmin ?
            <Link to="/admin">
              <Access isAdmin={isAdmin} />
            </Link>
            :
            ''
            }
          

        <CartButton cart={cart} cartCount={cartCount} />
        </>
    )
}

export default Header;