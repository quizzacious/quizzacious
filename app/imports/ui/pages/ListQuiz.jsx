import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Col, Container, Row } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import LoadingSpinner from '../components/LoadingSpinner';
import { Quizzes } from '../../api/quiz/Quizzes';
import EditQuizItem from '../components/EditQuizItem';

/* Renders a table containing all of the Quizzes documents. Use <QuizItem> to render each row. */
const ListQuiz = () => {
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { ready, stuffs: quizzes } = useTracker(() => {
    // Note that this subscription will get cleaned up
    // when your component is unmounted or deps change.
    // Get access to Quizzes documents.
    const subscription = Meteor.subscribe(Quizzes.userPublicationName);
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // Get the Quizzes documents
    const quizItems = Quizzes.collection.find({}).fetch();
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
            <h2>Your Quizzes</h2>
          </Col>
          <Row xs={1} md={2} lg={3} className="g-4">
            {quizzes.map((quiz, index) => (<Col key={index}><EditQuizItem quiz={quiz} /></Col>))}
          </Row>
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner />);
};

export default ListQuiz;
