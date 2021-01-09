import React, { useState, useEffect } from 'react';
import { Container, Row } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
  Link
} from 'react-router-dom';

import {
  getSomething
} from '../api';

const App = () => {
  const [message, setMessage] = useState('');

  useEffect(() => {
    getSomething()
      .then(response => {
        setMessage(response.message);
      })
      .catch(error => {
        setMessage(error.message);
      });
  });

  return (
    <>
    <div className="App">
      <h1>Hello, World!</h1>
      <h2>{ message }</h2>
    </div>
    <Container fluid>
      <Row className='bg-primary' style={{ minHeight : '10vh', width : '100vw' }}>
        HEADER AREA
      </Row>
      <Row className='bg-success' style={{ minHeight : '80vh', width : '100vw' }}> 
        MAIN BODY
      </Row>
      <Row className='bg-secondary' style={{ minHeight : '10vh', width : '100vw' }}>
        FOOTER AREA
      </Row>
    </Container>
    </>
  );
}

export default App;