import React from 'react';
import { useHistory } from 'react-router-dom';


const ProfileButton = ({user}) => {

    const history = useHistory();

    return (
        <div>
            <button type='button' className='nes-btn' onClick={()=>history.push(`/users/${user.custID}/account`)}>Account</button>
        </div>
    )
};

export default ProfileButton;