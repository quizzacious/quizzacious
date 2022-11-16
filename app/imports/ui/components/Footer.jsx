import React from 'react';
import { Col, Container, Nav, Row } from 'react-bootstrap';

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
const Footer = () => (
  <footer className="mt-auto py-3 bg-light text-center px-5">
    <Row>
      <Col>
        <Container>
          <Nav className="justify-content-center">
            <Nav.Link href="https://quizzacious.github.io/" size="lg" variant="outline-secondary">
              <strong>ABOUT THIS SITE</strong>
            </Nav.Link>
            <Nav.Link href="https://quizzacious.github.io/">
              <strong>GO TO DOCUMENTATION SITE</strong>
            </Nav.Link>
            <Nav.Link href="#">
              <strong>WHO WE ARE</strong>
            </Nav.Link>
          </Nav>
        </Container>
      </Col>
    </Row>
  </footer>
);

export default Footer;
