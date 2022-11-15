import React from 'react';
import { Container, Button } from 'react-bootstrap';

/* A simple static component to render some text for the landing page. */
const Intro = () => (
  <Container className="text-center py-5">
    <h1>Welcome to QUIZZACIOUS!</h1>
    <Button href="/signin">Sign in</Button>
  </Container>
);

export default Intro;
