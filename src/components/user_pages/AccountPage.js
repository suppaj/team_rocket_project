import React from 'react';
import {Col, Row} from 'react-bootstrap';
import { OrderHistory, UserProfile} from '../index';

const AccountPage = () => {

    return (
        <Row className='justify-content-center'>
            <Col sm={{span: 10, offset: 1}} md={{span: 10, offset: 1}} lg={{span: 10, offset: 1}} xl={5} className=' justify-content-center'>
                <UserProfile />
            </Col>
            <Col sm={{span: 10, offset: 1}} md={{span: 10, offset: 1}} lg={{span: 10, offset: 1}} xl={5} className=' justify-content-center'>
                <OrderHistory />
            </Col>
        </Row>
    )
};

export default AccountPage;