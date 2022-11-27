import React from 'react';
import { Row, Col, Container, Stack, Image } from 'react-bootstrap';

/* A simple static component to render some text for the landing page. */
const Landing = () => (
  <Container className="align-items-center py-4 font1">
    <Row>
      <Col>
        <p>
          Quizzacious is quiz maker that allows users to make their own quizzes . . .
        </p>
      </Col>
      <Col className="text-xl-center">
        <Image src="/images/quizlist.png" height={350} />
      </Col>
    </Row>
  </Container>
);

export default Landing;
