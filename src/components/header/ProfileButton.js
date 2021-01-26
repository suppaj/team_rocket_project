import React from 'react';
import { Dropdown} from 'react-bootstrap';


const ProfileButton = ({user}) => {

    return (
        <button type='button' className='nes-btn' href={`/users/${user.custID}/account`}>Account</button>
    )
};

export default ProfileButton;