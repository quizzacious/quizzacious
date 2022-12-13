import React from 'react';
import { Row, Col, Container, Image, Stack } from 'react-bootstrap';

/* A simple static component to render some text for the landing page. */
const Landing = () => (
  <Container id="color">
    <Stack direction="horizontal" className="py-4">
      <Row>
        <Col className="text-center">
          <Image src="https://media.tenor.com/J2RiuyvQgdEAAAAi/to-do-list-checklist.gif" width={225} />
        </Col>
      </Row>
      <Row className="px-lg-5">
        <Col>
          <h1 className="text-center text-white">
            <strong>What is Quizzacious?</strong>
          </h1>
          <p>
            Quizzacious is an app that allows users to make their own quizzes and can be used as a study tool . . .
          </p>
        </Col>
      </Row>
    </Stack>
    <Stack direction="horizontal" gap={4} className="py-lg-2 justify-content-md-evenly">
      <Row>
        <Col className="text-center">
          <a href="https://quizzacious.github.io/">
            <Image src="/images/site.png" width={225} />
          </a>
          <p>SITE</p>
          <p className="font3">Visit our official documentation site!</p>
        </Col>
        <Col className="text-center">
          <a href="https://github.com/orgs/quizzacious/people">
            <Image src="/images/profile.png" width={225} />
          </a>
          <p>ABOUT US</p>
          <p className="font3">Find us and learn about our organization!</p>
        </Col>
      </Row>
    </Stack>
  </Container>
);

export default Landing;
