import React from 'react';
import { Dropdown} from 'react-bootstrap';


const ProfileButton = ({user}) => {

    return (
        <a type='button' className='nes-btn' href={`/users/${user.custID}/account`}>Account</a>
    )
};

export default ProfileButton;