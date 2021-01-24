import React from 'react';

const NotLoggedIn = (props) => {

    return (
        <>
        <div className='nes-container'>
            <div className='nes-balloon from-right'>
                <p>You must be logged in to access this page</p>
            </div>
            <i className='nes-ash align-bottom' style={{transform : 'scaleX(-1)'}}></i>
        </div>
        </>
    )
}

export default NotLoggedIn