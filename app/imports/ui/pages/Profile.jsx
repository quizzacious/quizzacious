import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Card, Col, Container, Row, Stack, Nav } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import LoadingSpinner from '../components/LoadingSpinner';
import Contact from '../components/Contact';
import { Contacts } from '../../api/contact/Contacts';

/* Renders a table containing all of the Quizzes documents. Use <QuizItem> to render each row. */
const Profile = () => {
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { ready, contacts } = useTracker(() => {
    // Note that this subscription will get cleaned up
    // when your component is unmounted or deps change.
    // Get access to Quizzes documents.
    const subscription = Meteor.subscribe(Contacts.userPublicationName);
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // Get the Quizzes documents
    const contactItems = Contacts.collection.find({}).fetch();
    return {
      contacts: contactItems,
      ready: rdy,
    };
  }, []);
  return (ready ? (
    <Container>
      <Row className="justify-content-center">
        <Col className="py-5">
          <Row>
            {contacts.map((contact) => (<Col key={contact._id}><Contact contact={contact} /></Col>))}
          </Row>
        </Col>
        <Col md={7} className="py-5">
          <Stack gap={4}>
            <Card>
              <Card.Header>
                <Nav fill variant="tabs" defaultActiveKey="/home">
                  <Nav.Item>
                    <Nav.Link href="/home">Home Page</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link href="/take">Take a Quiz</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link href="/make">Make a Quiz</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link href="/listQuiz">Your Quizzes</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link href="/history">Quiz History</Nav.Link>
                  </Nav.Item>
                </Nav>
              </Card.Header>
              <Card.Body>
                <Card.Title>Mockup Tab</Card.Title>
                <Card.Text>
                  Does something corresponding to the Tab chosen
                </Card.Text>
              </Card.Body>
            </Card>
          </Stack>
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner />);
};

export default Profile;
