import React from "react";
import { matchPath, useLocation, useHistory } from 'react-router-dom';

const Logout = ({ setUser, setIsLoggedIn, setIsAdmin }) => {

  const location = useLocation();
  const history = useHistory();

  const handleLogout = () => {
    console.log("clicked checkout");
    localStorage.setItem("user", JSON.stringify({ cart: [] }));
    localStorage.removeItem("token");
    localStorage.removeItem("logged-in");
    setUser({ cart: [] });
    setIsLoggedIn(false);
    setIsAdmin(false);
    if (!matchPath(location.pathname, {path : '/products' })) {
      history.push('/');
    }
  };

  return (
    <div>
      <button
        type="button"
        className="nes-btn is-normal"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
};

export default Logout;
