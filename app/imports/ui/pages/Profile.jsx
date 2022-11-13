import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Card, Col, Container, Row, Table, Image } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { Quiz } from '../../api/quiz/Quiz';
import QuizItem from '../components/QuizItem';
import LoadingSpinner from '../components/LoadingSpinner';

/* Renders a table containing all of the Quiz documents. Use <QuizItem> to render each row. */
const Profile = () => {
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { ready, stuffs: quizzes } = useTracker(() => {
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
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col className="py-5">
          <Card>
            <Card.Body>
              <Card.Header><Image src="https://github.com/philipmjohnson.png" /></Card.Header>
              <Card.Title className="py-3">Phillip Johnson</Card.Title>
              <Card.Text className="py-1">I am a Professor of Information and Computer Sciences at the University of Hawaii, Director of the Collaborative Software Development Laboratory, and the CEO of OpenPowerQuality.com.</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={7}>
          <Col className="text-center">
            <h2>Profile</h2>
          </Col>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Achievements</th>
                <th>History</th>
                <th>My Quizzes</th>
              </tr>
            </thead>
          </Table>
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner />);
};

export default Profile;
