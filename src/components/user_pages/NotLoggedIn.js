import React from 'react';

const NotLoggedIn = (props) => {

    return (
        <>
        <div className='nes-container is-centered' >
            <div className='nes-balloon from-right'>
                <p>The account you are trying to access is not logged in.</p>
                <p>Please log in to access this information</p>
            </div>
            <i className='nes-ash align-bottom' style={{transform : 'scaleX(-1)'}}></i>
        </div>
        </>
    )
}

export default NotLoggedIn