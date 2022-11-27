import React from 'react';
import { Row, Col, Container, Image } from 'react-bootstrap';

/* A simple static component to render some text for the landing page. */
const Landing = () => (
  <Container>
    <Row className="align-items-center font1 text-white-50">
      <Col>
        <p>
          Quizzacious is a quiz maker that allows users to make their own quizzes and improve your grades
        </p>
      </Col>
      <Col className="text-center">
        <Image src="/images/mountain.png" height={300} />
      </Col>
    </Row>
    <Row className="font1 text-white-50">
      <Col className="text-center">
        <Image src="/images/quiz.png" width={250} />
      </Col>
      <Col>
        <p>Our journey started with a single step! Now you can do it too! Click the mountain for Documentation Site . . . </p>
      </Col>
    </Row>
  </Container>
);

export default Landing;
