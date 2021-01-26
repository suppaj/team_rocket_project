import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import { updateUserShipping } from '../../api';
import { RollingBall } from '../index';
import { statesOptions } from '../checkout/utilities';

const ShippingProfile = ({user, setUserProfile, master, setMaster, edit, setEdit}) => {

    const [ message, setMessage ] = useState('');
    const [ show, setShow ] = useState(false);

    const handleSave = async (e) => {
        e.preventDefault();
<<<<<<< HEAD
        
        setShow(true);
        const results = await updateUserShipping(user);
        setShow(false);
        setMaster({...master, ...results});
        setUserProfile({...master, ...results})
=======
        if (user.ship_add1 && user.ship_city && user.ship_state &&  user.ship_zipcode) {
         
            document.getElementById('update-dialog').style.display='block';
            const results = await updateUserShipping(user);
            document.getElementById('update-dialog').style.display = 'none';
            setMaster({...master, ...results});
            setUserProfile({...master, ...results})
            setEdit(false);
            setMessage('Changes Saved');
            return
        }
>>>>>>> master
        setEdit(false);
        return;
    }

    const handleCancel = (e) => {
        e.preventDefault();
        setUserProfile(master);
        setEdit(false);
    }

    return (
        
        <div className='nes-container'>
            {edit ?
            <div className='text-left'>
                <p>Shipping Address</p>
                
                <div className='nes-field'>
                    <label htmlFor='profile-ship-add1'>Address 1</label>
                    <input
                    type='text'
                    id='profile-ship-add1'
                    className='nes-input'
                    placeholder='123 Main St'
                    value={user.ship_add1}
                    required
                    onChange={(e) => setUserProfile({ ...user, ship_add1: e.target.value })}
                    />
                </div>
                <div className='nes-field'>
                    <label htmlFor='profile-ship-add2'>Address 2</label>
                    <input
                    type='text'
                    id='profile-ship-add2'
                    className='nes-input'
                    placeholder='Unit A, Apt 23, etc...'
                    value={user.ship_add2}
                    onChange={(e) => setUserProfile({ ...user, ship_add2: e.target.value })}
                    />
                </div>
                <div className='nes-field'>
                    <label htmlFor='profile-ship-city'>City</label>
                    <input
                    type='text'
                    id='profile-ship-city'
                    className='nes-input'
                    required
                    placeholder='Kanto Region'
                    value={user.ship_city}
                    onChange={(e) => setUserProfile({ ...user, ship_city: e.target.value })}
                    />
                </div>
                <div className='nes-field' >
                    <label htmlFor='profile-ship-state'>State</label>
                    <div className='nes-select'>
                    <select
                        id='profile-ship-state'
                        value={user.ship_state}
                        onChange={(e) =>
                        setUserProfile({ ...user, ship_state: e.target.value })
                        }
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
                    <label htmlFor='profile-ship-zip'>Zipcode</label>
                    <input
                    type='text'
                    id='profile-ship-zip'
                    className='nes-input'
                    value={user.ship_zipcode}
                    required
                    onChange={(e) =>
                        setUserProfile({ ...user, ship_zipcode: e.target.value })
                    }
                    placeholder='12345 or 12345-0000'
                    autoComplete='postal-code'
                    />
                </div>
                <button type='submit' className='nes-btn is-success' onClick={handleSave}>Save Changes</button>
                {' '}
                <button type='button' className='nes-btn is-error' onClick={handleCancel}>Cancel Changes</button>
            </div>
            : user.ship_add1 && user.ship_city && user.ship_state &&  user.ship_zipcode ? 
            <div className='text-left'>
                <p>Your Shipping Address:</p>
                <p>{user.first_name} {user.last_name}</p>
                <p>{user.ship_add1}</p>
                <p>{user.ship_add2}</p>
                <p>{user.ship_city}, {user.ship_state} {user.ship_zipcode}</p>
            { message ?
            <div className='nes-container is-dark'>
                <p>{message}</p>
            </div> : ''}
            <button type='button' className='nes-btn'onClick={()=>{setEdit(true); setMessage('')}}>Edit</button>
            </div>
            :
            <div>
                <p>Your shipping address is incomplete, click Edit to update your information</p>
                <button type='button' className='nes-btn'onClick={()=>{setEdit(true); setMessage('')}}>Edit</button>
            </div>}
            {/* modal */}
            <Modal className='nes-dialog' show={show} backdrop='static' centered keyboard='false' size='xl'>
                <Modal.Body>
                    <p>Updating Profile</p>
                    <RollingBall />
                </Modal.Body>
            </Modal>
        </div>
    )
};

export default ShippingProfile;