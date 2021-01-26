import React from 'react';

const Logout = ({setUser, setIsLoggedIn, setIsAdmin}) => {

    const handleLogout = () => {
        console.log('clicked checkout');
        localStorage.setItem('user', JSON.stringify({cart:[]}));
        localStorage.removeItem('admin')
        setUser({cart:[]});
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