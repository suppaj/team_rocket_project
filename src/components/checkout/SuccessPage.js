import React, { useEffect, useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { Col, Button } from 'react-bootstrap';
import { Welcome } from '../index';
import { registerCustomer } from '../../api';

const SuccessPage = ({ isLoggedIn }) => {
  const location = useLocation();
  const history = useHistory();

  const [pwd, setPwd] = useState('');
  const [confirmPwd, setConfirmPwd] = useState('');
  const [noMatch, setNoMatch] = useState(true);
  const [message, setMessage] = useState('');
  const [formInfo, setFormInfo] = useState({ contactInfo: { firstName: '' } });
  const [welcomeShow, setWelcomeShow] = useState(false);

  useEffect(() => {
    if (!location.state && !isLoggedIn) {
      history.push('/');
    } else setFormInfo({ ...location.state.formInfo });
  }, []);

  useEffect(() => {
    if (pwd === confirmPwd) {
      setNoMatch(false);
      setMessage('');
    } else {
      setNoMatch(true);
    }
    if (!pwd) {
      setNoMatch(true);
    } else if (pwd && pwd !== confirmPwd) {
      setMessage('Passwords do not match');
    }
  }, [pwd, confirmPwd]);

  const handleRegister = async () => {
    const { firstName, lastName, email } = formInfo.contactInfo;
    const results = await registerCustomer(
      firstName,
      lastName,
      email,
      pwd,
      false
    );
    console.log(results);
    if (results) {
      setWelcomeShow(true);
    } else {
      setMessage(
        'Account with that e-mail exists, login with that email or register with a different email. Returning you to our home page.'
      );
      setTimeout(() => {
        history.push('/');
      }, 2000);
    }
  };

  return (
    <Col md={{ span: 6, offset: 3 }}>
      <div className='nes-container '>
        {isLoggedIn ? (
          <>
            <p>Thank you for your purchase!</p>
            <Button href='/' className='nes-btn is-success'>
              Continue Shopping
            </Button>
          </>
        ) : (
          <>
            <p>Thank you for your purchase!</p>
            <p>
              Would you like to create an account? You just need to set a
              password.
            </p>
            <div className='nes-field'>
              <label htmlFor='ckout_pwd_field'>Password</label>
              <input
                type='password'
                id='ckout_pwd_field'
                className='nes-input'
                value={pwd}
                placeholder=''
                onChange={(e) => setPwd(e.target.value)}
              />
            </div>
            <br />
            <div className='nes-field'>
              <label htmlFor='ckout_confirm_pwd_field'>Confirm Password</label>
              <input
                type='password'
                id='ckout_confirm_pwd_field'
                className={noMatch ? 'nes-input' : 'nes-input is-success'}
                value={confirmPwd}
                placeholder='confirm your password'
                onChange={(e) => setConfirmPwd(e.target.value)}
              />
            </div>
            {message ? <p>{message}</p> : <br />}
            <button
              type='button'
              className={noMatch ? 'nes-btn is-disabled' : 'nes-btn'}
              disabled={noMatch}
              onClick={handleRegister}
            >
              Register
            </button>{' '}
            <Button variant='link' href='/' style={{ color: 'white' }}>
              No thanks, return to shopping
            </Button>
          </>
        )}
      </div>

      <Welcome
        setWelcomeShow={setWelcomeShow}
        welcomeShow={welcomeShow}
        firstName={formInfo.contactInfo.firstName}
        setOuterShow={()=>'nothing'}
      />
    </Col>
  );
};

export default SuccessPage;
