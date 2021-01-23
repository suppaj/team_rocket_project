import React from 'react';

const Logout = ({setUser, setCart, setIsLoggedIn, setIsAdmin}) => {

    const handleLogout = () => {
        console.log('clicked checkout');
        localStorage.setItem('cart', JSON.stringify([]));
        localStorage.setItem('user', JSON.stringify({}));
        localStorage.removeItem('admin')
        setUser({});
        setCart([]);
        setIsLoggedIn(false);
        setIsAdmin(false);
    }

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
    )
}

export default Logout