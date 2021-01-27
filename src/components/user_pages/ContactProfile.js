import React, {useState} from 'react';
import { RollingBall } from '../index';
import { updateUserContact } from '../../api';

const ContactProfile = ({user, setUserProfile, master, setMaster, edit, setEdit}) => {

    const [ message, setMessage ] = useState('');

    const handleSave = async (e) => {
        e.preventDefault();
        if ( user.first_name && user.last_name && user.cust_email) {
            let userUpdate = {...user}
            if ( user.cust_email !== master.cust_email) {
            userUpdate = {...user, emailChange : true }
            }
            document.getElementById('update-dialog').style.display='block';
            const results = await updateUserContact(userUpdate);
            document.getElementById('update-dialog').style.display = 'none';
            if (results.message) {
                console.log(results.message)
                setMessage('Account with that email already exists, changes canceled.')
                setUserProfile(master);
                setEdit(false);
            } else {
                setMaster({...master, ...results});
                setUserProfile({...master, ...results})
                setEdit(false);
                setMessage('Changes Saved');
            }
        } else {
        setEdit(false);
        setMessage('Changes canceled, no fields can be blank')
        setUserProfile({...master}) 
        }

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
                <div className='nes-field'>
                    <label htmlFor='profile-first-name'>First Name</label>
                    <input
                    type='text'
                    id='profile-first-name'
                    className='nes-input'
                    value={user.first_name}
                    required
                    onChange={(e) =>
                        setUserProfile({...user, first_name : e.target.value})
                    }
                    />
                </div>
                <div className='nes-field'>
                    <label htmlFor='profile-last-name'>Last Name</label>
                    <input
                    type='text'
                    id='profile-last-name'
                    className='nes-input'
                    value={user.last_name}
                    required
                    onChange={(e) =>
                        setUserProfile({...user, last_name : e.target.value})
                    }
                    />
                </div>
                <div className='nes-field'>
                    <label htmlFor='profile-email'>Email address</label>
                    <input
                    type='email'
                    id='profile-email'
                    className='nes-input'
                    placeholder='Enter email'
                    value={user.cust_email}
                    required
                    onChange={(e) =>
                        setUserProfile({...user, cust_email : e.target.value}) 
                    } 
                    />
                </div>
                <br/>
                <button type='submit' className='nes-btn is-success ' onClick={handleSave}>Save Changes</button>
                {' '}
                <button type='button' className='nes-btn is-error ' onClick={handleCancel}>Cancel Changes</button>
            </div>
            :
            <div className='text-left'>
            <p>Name: {user.first_name} {user.last_name}</p>
            <p>Email: {user.cust_email}</p>
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

export default ContactProfile;