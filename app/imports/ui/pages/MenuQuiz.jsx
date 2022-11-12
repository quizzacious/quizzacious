import React from 'react';
import { Col, Container, Row, Button } from 'react-bootstrap';
import { PeopleFill, FileEarmarkTextFill, Calendar2CheckFill } from 'react-bootstrap-icons';

/* A simple static component to render some text for the landing page. */
const MenuQuiz = () => (
  <Container id="landing-page" className="py-lg-5">
    <Row className="align-middle text-center">
      <Col xs={4}>
        <PeopleFill size={100} />
        <h1>Multiple Users</h1>
        <p>This address book enables any number of users to register and save their business contracts. You can only see the contacts you have created.</p>
        <Button>
          Make Multiple Choice Questions!
        </Button>
      </Col>
      <Col xs={4}>
        <FileEarmarkTextFill size={100} />
        <h1>Contact Details</h1>
        <p>For each contract, you can save their name, address, and phone number.</p>
        <Button>
          Make Flashcards!
        </Button>
      </Col>
      <Col xs={4}>
        <Calendar2CheckFill size={100} />
        <h1>Timestamped Notes</h1>
        <p>Each time you make contact with a contact, you can write a note that summarizes the conversation. This note is saved along with a timestamp with contact.</p>
        <Button>
          Make Open Ended Questions!
        </Button>
      </Col>
    </Row>
  </Container>
);

export default MenuQuiz;
