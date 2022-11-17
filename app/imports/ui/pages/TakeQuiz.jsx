import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Col, Container, Row } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { Quiz } from '../../api/quiz/Quiz';
import QuizItem from '../components/QuizItem';
import LoadingSpinner from '../components/LoadingSpinner';
import { Quizzes } from '../../api/quiz/Quizzes';

/* Renders a table containing all of the Quiz documents. Use <QuizItem> to render each row. */
const TakeQuiz = () => {
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { ready, stuffs: quizzes } = useTracker(() => {
    // Note that this subscription will get cleaned up
    // when your component is unmounted or deps change.
    // Get access to Quiz documents.
    const subscription2 = Meteor.subscribe(Quiz.userPublicationName);
    const subscription = Meteor.subscribe(Quizzes.userPublicationName);
    // Determine if the subscription is ready
    const rdy = subscription.ready() && subscription2.ready();
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
        <Col>
          <Col className="text-center">
            <h2>Take Quiz</h2>
          </Col>
          <Row xs={1} md={2} lg={3} className="g-4">
            {quizzes.map((quiz, index) => (<Col key={index}><QuizItem quiz={quiz} /></Col>))}
          </Row>
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner />);
};

export default TakeQuiz;
