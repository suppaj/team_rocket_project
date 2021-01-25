import React, { useState , useEffect } from 'react';
import { Col, Tabs, Tab } from 'react-bootstrap';
import { useParams } from 'react-router-dom'
import { NotLoggedIn, ContactProfile, ShippingProfile, BillingProfile, RollingBall } from '../index';
import { getUserProfile } from '../../api';

const UserProfile = (props) => {

    const { cust_id } = useParams();

    const [ notValid, setNotValid ] = useState(true);
    const [key, setKey] = useState('contact');
    const [ master, setMaster] = useState({})
    const [ userProfile, setUserProfile ] = useState({})
    const [ edit, setEdit ] = useState(false);

    useEffect(()=>{
        if (cust_id == JSON.parse(localStorage.getItem('user')).custID) {
        setNotValid(false);
        fetchData();
        }
    }, [])

    const fetchData = async () => {
        const userData = await getUserProfile(cust_id);
        console.log(userData);
        if (userData) {
            setMaster(userData)
            setUserProfile(userData)
        }
    }

    return (
        <>
        <Col md={{span: 8, offset : 2}}>
            { notValid ? 
            <NotLoggedIn /> : userProfile.cust_id ? 
            <div className='nes-container is-centered'>
                <p>User Profile Info</p>
                <Tabs id='profile-tabs' activeKey={key} onSelect={(k) => {setKey(k); setEdit(false); setUserProfile({...master})}}>
                    <Tab eventKey='contact' title='Contact Info'>
                        <ContactProfile user={userProfile} setUserProfile={setUserProfile} master={master} setMaster={setMaster} edit={edit} setEdit={setEdit}/>
                    </Tab>
                    <Tab eventKey='shipping' title='Shipping Address'>
                        <ShippingProfile user={userProfile} setUserProfile={setUserProfile} master={master} setMaster={setMaster} edit={edit} setEdit={setEdit}/>
                    </Tab>
                    <Tab eventKey='billing' title='Billing Address'>
                        <BillingProfile user={userProfile} setUserProfile={setUserProfile} master={master} setMaster={setMaster} edit={edit} setEdit={setEdit}/>
                    </Tab>
                </Tabs>
            </div> :
            <div className='nes-container'>
                <p className='text-center'>Loading Your Profile</p>
                <RollingBall />
            </div>
            }
        </Col>
        </>
    )
};

export default UserProfile;