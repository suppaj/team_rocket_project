import React, { useState, useEffect }from 'react';
import { CardElement, CardNumberElement, CardExpiryElement, CardCvcElement } from '@stripe/react-stripe-js';
import { Tabs, Tab } from 'react-bootstrap';


const GuestCheckOutForm = (props) => {

    const [ key, setKey ] = useState('contact')
    const [ isChecked, setisChecked ] = useState(false)
    const [ contactInfo, setContactInfo ] = useState({firstName : '', lastName : '', email : ''})
    const [ shipInfo, setShipInfo ] = useState({ add1 : '' , add2 : '', city : '', state: '', zipcode: '' });
    const [ billInfo, setBillInfo ] = useState({ add1 : '' , add2 : '', city : '', state: '', zipcode: '' });
    const [ formStatus , setFormStatus] = useState({contact : true , shipping: true, billing : true});

    useEffect(()=>{
        
        setFormStatus({...formStatus, contact : true})
        Object.values(contactInfo).map((value)=>{
            console.log('map method running')
            if (!value) {
                return
            } else { console.log('empty value')
                setFormStatus({...formStatus, contact : true}) }
        })
    }, [contactInfo]);

    const CARD_OPTIONS = {
        style : {
            base : {
                backgroundColor: 'white',
                color: 'black',
                iconColor: 'black',
                fontSize: '24px'
            },
            invalid : {
                color : 'red',
                iconColor : 'red'
            }
        }};

    const handleCheckbox = () => {
        const checked = document.getElementById('same-as-shipping').checked
        setisChecked(checked);
        if (checked) {
            setBillInfo(shipInfo);
        }
    }

    return (
        
        <div className='nes-container' id='checkout-form-guest'>
            <p id='ckout-form-info'>Fill out contact, shipping,billing, and CC information to complete your purchase.</p>
            <Tabs 
            id='ckout-tabs'
            activeKey={key}
            onSelect={(k)=> setKey(k)}>
                <Tab eventKey='contact' title='Contact'>
                    <div className='nes-field'>
                        <label htmlFor='ckout-first-name'>First Name</label>
                        <input type='text' id='ckout-first-name' className='nes-input' placeholder='Giovanni' value={contactInfo.firstName} required onChange={(e)=>setContactInfo({...contactInfo, firstName : e.target.value})}/>
                    </div>
                    <div className='nes-field'>
                        <label htmlFor='ckout-last-name'>Last Name</label>
                        <input type='text' id='ckout-last-name' className='nes-input' placeholder='Unknown' value={contactInfo.lastName} required onChange={(e)=>setContactInfo({...contactInfo, lastName : e.target.value})}/>
                    </div>
                    <div className='nes-field'>
                        <label htmlFor='ckout-email'>Email address</label>
                        <input type='email' id='ckout-email' className='nes-input' placeholder='Enter email' value={contactInfo.email} required onChange={(e)=>setContactInfo({...contactInfo, email : e.target.value})}/>
                        <small className='form-text'>Order confiramtion and shipping updates will be sent to this email</small>
                    </div>
                </Tab>
                <Tab eventKey='shipping' title='Shipping' disabled={formStatus.contact}>
                    <p>Shipping Address</p>
                    <div className='nes-field'>
                        <label htmlFor='ckout-ship-add1'>Address 1</label>
                        <input type='text' id='ckout-ship-add1' className='nes-input' placeholder='123 Main St' value={shipInfo.add1} required onChange={(e)=>setShipInfo({...shipInfo, add1 : e.target.value})}/>
                    </div>
                    <div className='nes-field'>
                        <label htmlFor='ckout-ship-add2'>Address 2</label>
                        <input type='text' id='ckout-ship-add2' className='nes-input' placeholder='Unit A, Apt 23, etc...' value={shipInfo.add2} onChange={(e)=>setShipInfo({...shipInfo, add2 : e.target.value})}/>
                    </div>
                    <div className='nes-field'>
                        <label htmlFor='ckout-ship-city'>City</label>
                        <input type='text' id='ckout-ship-city' className='nes-input' required placeholder='Kanto Region' value={shipInfo.city} onChange={(e)=>setShipInfo({...shipInfo, city : e.target.value})}/>
                    </div>
                    <div className='nes-field'>
                        <label htmlFor='ckout-ship-state'>State</label>
                        <div className='nes-select' >
                            <select required id='ckout-ship-state' defaultValue='FL' onChange={(e)=>setShipInfo({...shipInfo, state : e.target.value})}>
                                <option value='FL' >FL</option>
                            </select>  
                        </div>
                    </div>
                    <div className='nes-field'>
                        <label htmlFor='ckout-ship-zip'>Zip</label>
                        <input type='text' id='ckout-ship-zip' className='nes-input' value={shipInfo.zipcode} required onChange={(e)=>setShipInfo({...shipInfo, zipcode : e.target.value})} placeholder='12345 or 12345-0000'/>
                    </div>
                </Tab>
                <Tab eventKey='billing' title='Billing' disabled={formStatus.shipping}>
                        <p>Billing Address</p>
                        <label>
                            <input type='checkbox' id='same-as-shipping' className='nes-checkbox is-small' onChange={handleCheckbox}/>
                            <span id='same-shipping-text'>Same as shipping</span>
                        </label>
                    
                    <div className='nes-field'>
                        <label htmlFor='ckout-bill-add1'>Address 1</label>
                        <input type='text' id='ckout-bill-add1' className='nes-input' placeholder='123 Edgeof' disabled={isChecked} value={isChecked ? shipInfo.add1 :billInfo.add1} required onChange={(e)=>setBillInfo({...billInfo, add1 : e.target.value})}/>
                    </div>
                    <div className='nes-field'>
                        <label htmlFor='ckout-bill-add2'>Address 2</label>
                        <input type='text' id='ckout-bill-add2' className='nes-input' placeholder='Unit A, Apt 23, etc...' disabled={isChecked} value={isChecked ? shipInfo.add2 :billInfo.add2} onChange={(e)=>setBillInfo({...billInfo, add2 : e.target.value})}/>
                    </div>
                    <div className='nes-field'>
                        <label htmlFor='ckout-bill-city'>City</label>
                        <input type='text' id='ckout-bill-city' className='nes-input' disabled={isChecked} value={isChecked ? shipInfo.city :billInfo.city} required placeholder='Pallet Town' onChange={(e)=>setBillInfo({...billInfo, city : e.target.value})}/>
                    </div>
                    <div className='nes-field'>
                        <label htmlFor='ckout-bill-state'>State</label>
                        <div className='nes-select' >
                            <select required id='ckout-bill-state' disabled={isChecked} value={isChecked ? shipInfo.state :billInfo.state} onChange={(e)=>setBillInfo({...billInfo, state : e.target.value})} >
                                <option value='FL' >FL</option>
                            </select>  
                        </div>
                    </div>
                    <div className='nes-field'>
                        <label htmlFor='ckout-bill-zip'>Zip</label>
                        <input type='text' id='ckout-bill-zip' className='nes-input' disabled={isChecked} value={isChecked ? shipInfo.zipcode :billInfo.zipcode} required onChange={(e)=>setBillInfo({...billInfo, zipcode : e.target.value})} placeholder='12345 or 12345-0000'/>
                    </div>
                </Tab>
                <Tab eventKey='CC' title='Credit Card' disabled={formStatus.billing && formStatus.contact && formStatus.shipping}>
                    <p>Payment Information</p>
                    <div id='cc-info-box'>
                        <CardNumberElement options={CARD_OPTIONS} />
                        <CardExpiryElement options={CARD_OPTIONS} />
                        <CardCvcElement options={CARD_OPTIONS} />
                    </div>
                    <button className='nes-button' style={{ fontSize: '1.5rem', width : '100%'}} onClick={()=>console.log('payment clicked')}>PAY</button>
                </Tab>
            </Tabs>  
        </div>
        
    )
}

export default GuestCheckOutForm;