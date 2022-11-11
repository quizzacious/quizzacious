import React from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { Col, Container, Row, Table } from 'react-bootstrap';
import { Quiz } from '../../api/quiz/Quiz';
import QuizItemAdmin from '../components/QuizItemAdmin';
import LoadingSpinner from '../components/LoadingSpinner';

/* Renders a table containing all of the Quiz documents. Use <QuizItemAdmin> to render each row. */
const ProfileAdmin = () => {
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { stuffs: quizzes, ready } = useTracker(() => {
    // Get access to Quiz documents.
    const subscription = Meteor.subscribe(Quiz.adminPublicationName);
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // Get the Quiz documents
    const items = Quiz.collection.find({}).fetch();
    return {
      stuffs: items,
      ready: rdy,
    };
  }, []);
  return (ready ? (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col md={7}>
          <Col className="text-center"><h2>Profile (Admin)</h2></Col>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Name</th>
                <th>Question</th>
              </tr>
            </thead>
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
