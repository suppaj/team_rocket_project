import React from 'react';
import { CardElement } from '@stripe/react-stripe-js';


const GuestCheckOutForm = (props) => {

    const CARD_OPTIONS = {
        style : {
            base : {
                backgroundColor: 'white',
                color: 'black',
                iconColor: 'black',
                fontSize: '1.5rem'
            },
            invalid : {
                color : 'red',
                iconColor : 'red'
            }
        }};

    return (
        
        <div className='nes-container' style={{fontSize : '1rem'}}>
            <div className='nes-field'>
                <label htmlFor='ckout-first-name'>First Name</label>
                <input type='text' id='ckout-first-name' className='nes-input' required/>
            </div>
            <div className='nes-field'>
                <label htmlFor='ckout-last-name'>Last Name</label>
                <input type='text' id='ckout-last-name' className='nes-input' required/>
            </div>
            <div className='nes-field'>
                <label htmlFor='ckout-email'>Email address</label>
                <input type='email' id='ckout-email' className='nes-input' placeholder='Enter email' required/>
                <small className='form-text'>Order confiramtion and shipping updates will be sent to this email</small>
            </div>
            <br/>
            <p>Shipping Address</p>
            <div className='nes-field'>
                <label htmlFor='ckout-ship-add1'>Address 1</label>
                <input type='text' id='ckout-ship-add1' className='nes-input' placeholder='123 Main St' required/>
            </div>
            <div className='nes-field'>
                <label htmlFor='ckout-ship-add2'>Address 2</label>
                <input type='text' id='ckout-ship-add2' className='nes-input' placeholder='Unit A, Apt 23, etc...' />
            </div>
            <div className='nes-field'>
                <label htmlFor='ckout-ship-city'>City</label>
                <input type='text' id='ckout-ship-city' className='nes-input' required placeholder='Pallet Town'/>
            </div>
            <div className='nes-field'>
                <label htmlFor='ckout-ship-state'>State</label>
                <div className='nes-select' >
                    <select required id='ckout-ship-state' defaultValue='FL' >
                        <option value='FL' >FL</option>
                    </select>  
                </div>
            </div>
            <div className='nes-field'>
                <label htmlFor='ckout-ship-zip'>Zip</label>
                <input type='text' id='ckout-ship-zip' className='nes-input'/>
            </div>
            <div className='nes-field'>
                <label htmlFor='ckout-card-info'>CC info</label>
                <CardElement id='ckout-card-info' className='nes-input' options={CARD_OPTIONS}/>
            </div>
        </div>
        
    )
}

export default GuestCheckOutForm;