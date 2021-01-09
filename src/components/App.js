import React, { useState, useEffect } from 'react';
import { Container, Row } from 'react-bootstrap';
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
    <Container>
      <Row>
        {/* add Header Component */}
      </Row>
      <Row>
        {/* add Main area components */}
      </Row>
      <Row>
        {/* Footer area */}
      </Row>
    </Container>
    </>
  );
}

export default App;