import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Col, Button } from 'react-bootstrap';

/* After the user clicks the "SignOut" link in the NavBar, log them out and display this page. */
const SignOut = () => {
  Meteor.logout();
  return (
    <Col id="signout-page" className="text-center py-3"><h2>You are signed out.</h2></Col>
    <Button href="/IntroPage">Go back to Home Page!</Button>
  );
};

export default SignOut;
