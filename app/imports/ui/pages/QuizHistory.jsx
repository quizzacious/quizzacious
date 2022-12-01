import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Col, Container, Row } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import QuizItem from '../components/QuizItem';
import LoadingSpinner from '../components/LoadingSpinner';
import { TakenQuizzes } from '../../api/takenquiz/TakenQuizzes';

/* Renders a table containing all of the Quizzes documents. Use <QuizItem> to render each row. */
const QuizHistory = () => {
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { ready, stuffs: quizzes } = useTracker(() => {
    // Note that this subscription will get cleaned up
    // when your component is unmounted or deps change.
    // Get access to Quizzes documents.
    const subscription = Meteor.subscribe(TakenQuizzes.userPublicationName);
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // Get the Quizzes documents
    const quizItems = TakenQuizzes.collection.find({}).fetch();
    return {
      stuffs: quizItems,
      ready: rdy,
    };
  }, []);
  return (ready ? (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col>
          <Col className="text-center">
            <h2>Previous Taken Quizzes</h2>
          </Col>
          <Row xs={1} md={2} lg={3} className="g-4">
            {quizzes.map((quiz, index) => (<Col key={index}><QuizItem quiz={quiz} /></Col>))}
          </Row>
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner />);
};

export default QuizHistory;
