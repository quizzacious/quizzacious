import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Col, Button } from 'react-bootstrap';

/* After the user clicks the "SignOut" link in the NavBar, log them out and display this page. */
const SignOut = () => {
  Meteor.logout();
  return (
    <Container className="text-center py-3">
      <Col id="signout-page"><h2>You are signed out.</h2></Col>
      <Button href="/home">Go back to Home Page!</Button>
    </Container>
  );
};

export default SignOut;
