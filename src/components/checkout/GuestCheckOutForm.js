import React from 'react';


const GuestCheckOutForm = (props) => {

    return (
        <>
        <div className='nes-container'>
            <div className='nes-field'>
                <label for ='ckout-first-name'>First Name</label>
                <input type='text' id='ckout-first-name' className='nes-input' />
            </div>
            <div className='nes-field'>
                <label for ='ckout-last-name'>Last Name</label>
                <input type='text' id='ckout-last-name' className='nes-input' />
            </div>
            <div className='nes-field'>
                <label for ='ckout-email'>Email address</label>
                <input type='email' id='ckout-email' className='nes-input' placeholder='Enter email' />
                <small className='form-text text-muted'>Order confiramtion and shipping updates will be sent to this email</small>
            </div>
            <p>Shipping Address</p>
            <div className='nes-field'>
                <label for ='ckout-ship-add1'>Address 1</label>
                <input type='text' id='ckout-ship-add1' className='nes-input' placeholder='123 Main St'/>
            </div>
            <div className='nes-field'>
                <label for ='ckout-ship-add2'>Address 2</label>
                <input type='text' id='ckout-ship-add2' className='nes-input' placeholder='Unit A, Apt 23, etc...'/>
            </div>
            <div className='nes-field'>
                <label for ='ckout-ship-city'>City</label>
                <input type='text' id='ckout-ship-city' className='nes-input' />
            </div>
            <div className='is-inline'>
                <label for='ckout-ship-state'>State</label>
                <div className='nes-select'>
            </div>
            </div>
        </div>
        </>
    )
}

export default GuestCheckOutForm;