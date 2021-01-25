import React, {useState, useEffect} from 'react';
import { updateUserBilling } from '../../api';
import { RollingBall } from '../index';
import { statesOptions } from '../checkout/utilities';

const BillingProfile = ({user, setUserProfile, master, setMaster, edit, setEdit}) => {

    const { ship_add1, ship_add2, ship_city, ship_zipcode, ship_state, bill_add1, bill_add2, bill_city, bill_zipcode, bill_state} = user

    const [ message, setMessage ] = useState('');
    const [ isChecked, setisChecked ] = useState(false)

    useEffect(()=>{
        if (edit) {
        if (ship_add1 === bill_add1 && ship_add2 === bill_add2 && ship_city === bill_city && ship_state === bill_state && ship_zipcode === bill_zipcode) {
            document.getElementById('same-as-shipping').checked = true
            console.log('all equal');
            setisChecked(true)
        }}
    },[edit])

    const handleSave = async (e) => {
        e.preventDefault();
        
        document.getElementById('update-dialog').style.display='block';
        const results = await updateUserBilling(user);
        document.getElementById('update-dialog').style.display = 'none';
        setMaster({...master, ...results});
        setUserProfile({...master, ...results})
        setEdit(false);
        setMessage('Changes Saved');
    }

    const handleCancel = (e) => {
        e.preventDefault();
        setUserProfile(master);
        setEdit(false);
    }

    const handleCheckbox = () => {
        const checked = document.getElementById('same-as-shipping').checked;
        setisChecked(checked);
        if (checked) {
          setUserProfile({...user, bill_add1 : user.ship_add1, bill_add2 : user.ship_add2, bill_city : user.ship_city, bill_state : user.ship_state, bill_zipcode : user.ship_zipcode});
        }
      };

    return (
        
        <div className='nes-container'>
            {edit ?
            <div className='text-left'>
                <p>Billing Address</p>
                <label>
                    <input
                    type='checkbox'
                    id='same-as-shipping'
                    className='nes-checkbox is-small'
                    onChange={handleCheckbox}
                    />
                    <span id='same-shipping-text'>Same as shipping</span>
                </label>
                <div className='nes-field'>
                    <label htmlFor='profile-bill-add1'>Address 1</label>
                    <input
                    type='text'
                    id='profile-bill-add1'
                    className='nes-input'
                    placeholder='123 Main St'
                    value={user.bill_add1}
                    disabled={isChecked}
                    required
                    onChange={(e) => setUserProfile({ ...user, bill_add1: e.target.value })}
                    />
                </div>
                <div className='nes-field'>
                    <label htmlFor='profile-bill-add2'>Address 2</label>
                    <input
                    type='text'
                    id='profile-bill-add2'
                    className='nes-input'
                    placeholder='Unit A, Apt 23, etc...'
                    disabled={isChecked}
                    value={user.bill_add2}
                    onChange={(e) => setUserProfile({ ...user, bill_add2: e.target.value })}
                    />
                </div>
                <div className='nes-field'>
                    <label htmlFor='profile-bill-city'>City</label>
                    <input
                    type='text'
                    id='profile-bill-city'
                    className='nes-input'
                    required
                    placeholder='Kanto Region'
                    disabled={isChecked}
                    value={user.bill_city}
                    onChange={(e) => setUserProfile({ ...user, bill_city: e.target.value })}
                    />
                </div>
                <div className='nes-field' >
                    <label htmlFor='profile-bill-state'>State</label>
                    <div className='nes-select'>
                    <select
                        id='profile-bill-state'
                        value={user.bill_state}
                        onChange={(e) =>
                        setUserProfile({ ...user, bill_state: e.target.value })
                        }
                        disabled={isChecked}
                        placeholder='State...'
                        autoComplete='address-level1'
                    >
                        <option value={''} disabled >
                        State...
                        </option>
                        {statesOptions()}
                    </select>
                    </div>
                </div>
                <div className='nes-field' >
                    <label htmlFor='profile-bill-zip'>Zipcode</label>
                    <input
                    type='text'
                    id='profile-bill-zip'
                    className='nes-input'
                    value={user.bill_zipcode}
                    disabled={isChecked}
                    required
                    onChange={(e) =>
                        setUserProfile({ ...user, bill_zipcode: e.target.value })
                    }
                    placeholder='12345 or 12345-0000'
                    autoComplete='postal-code'
                    />
                </div>
                <button type='submit' className='nes-btn is-success' onClick={handleSave}>Save Changes</button>
                {' '}
                <button type='button' className='nes-btn is-error' onClick={handleCancel}>Cancel Changes</button>
            </div>
            :
            <div className='text-left'>
                <p>Your Billing Address:</p>
                <p>{user.bill_add1}</p>
                <p>{user.bill_add2}</p>
                <p>{user.bill_city}, {user.bill_city} {user.bill_zipcode}</p>
            { message ?
            <div className='nes-container is-dark'>
                <p>{message}</p>
            </div> : ''}
            <button type='button' className='nes-btn'onClick={()=>{setEdit(true); setMessage('')}}>Edit</button>
            </div>
            }
            {/* modal */}
            <dialog className='nes-dialog' id='update-dialog'>
                <p>Updating Profile</p>
                <div>
                <RollingBall />
                </div>
            </dialog>
        </div>
    )
};

export default BillingProfile;