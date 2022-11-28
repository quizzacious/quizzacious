import React from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { Col, Container, Row, Table } from 'react-bootstrap';
import { Quizzes } from '../../api/quiz/Quizzes';
import QuizItemAdmin from '../components/QuizItemAdmin';
import LoadingSpinner from '../components/LoadingSpinner';

/* Renders a table containing all of the Quizzes documents. Use <QuizItemAdmin> to render each row. */
const ProfileAdmin = () => {
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { quizzes, ready } = useTracker(() => {
    // Get access to Quizzes documents.
    const subscription = Meteor.subscribe(Quizzes.adminPublicationName);
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // Get the Quizzes documents
    const items = Quizzes.collection.find({}).fetch();
    return {
      quizzes: items,
      ready: rdy,
    };
  }, []);

  return (ready ? (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col md={7}>
          <Col className="text-center"><h2>Admin</h2></Col>
          <Table striped bordered hover>
            <th>Quizzes</th>
            <tbody>
              {quizzes.map((quiz) => <QuizItemAdmin key={quiz._id} quiz={quiz} />)}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner />);
};

export default ProfileAdmin;
