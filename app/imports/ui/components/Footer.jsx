import React from 'react';
import { Col, Container, Nav, Row } from 'react-bootstrap';

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
const Footer = () => (
  <footer className="mt-auto py-3 bg-light text-center px-5 font1">
    <Row>
      <Col>
        <Container>
          <Nav className="justify-content-center">
            <Nav.Link href="https://quizzacious.github.io/" size="lg" variant="outline-secondary">
              ABOUT THIS SITE
            </Nav.Link>
            <Nav.Link href="https://quizzacious.github.io/">
              GO TO DOCUMENTATION SITE
            </Nav.Link>
            <Nav.Link href="#">
              WHO WE ARE
            </Nav.Link>
            <Nav.Link href="#">
              CONTACT US!
            </Nav.Link>
          </Nav>
        </Container>
      </Col>
    </Row>
  </footer>
);

export default Footer;
