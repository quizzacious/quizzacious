import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Card, Col, Container, Row, Image, Stack, Nav } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { Quiz } from '../../api/quiz/Quiz';
import LoadingSpinner from '../components/LoadingSpinner';

/* Renders a table containing all of the Quiz documents. Use <QuizItem> to render each row. */
const Profile = () => {
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { ready } = useTracker(() => {
    // Note that this subscription will get cleaned up
    // when your component is unmounted or deps change.
    // Get access to Quiz documents.
    const subscription = Meteor.subscribe(Quiz.userPublicationName);
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // Get the Quiz documents
    const quizItems = Quiz.collection.find({}).fetch();
    return {
      stuffs: quizItems,
      ready: rdy,
    };
  }, []);
  return (ready ? (
    <Container>
      <Row className="justify-content-center">
        <Col className="py-5">
          <Card className="text-center h-100">
            <Card.Body>
              <Card.Header><Image roundedCircle src="https://github.com/philipmjohnson.png" width="200px" /></Card.Header>
              <Card.Title className="py-3">Phillip Johnson</Card.Title>
              <Card.Text className="py-1">I am a Professor of Information and Computer Sciences at the University of Hawaii, Director of the Collaborative Software Development Laboratory, and the CEO of OpenPowerQuality.com.</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={7} className="py-5">
          <Stack gap={4}>
            <Card>
              <Card.Header>
                <Nav fill variant="tabs" defaultActiveKey="/home">
                  <Nav.Item>
                    <Nav.Link href="/home">Go back to Landing Page</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link href="/take">Goes to Take a quiz</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link href="/menu">Goes to Make a quiz</Nav.Link>
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
