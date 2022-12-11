import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Col, Container, Form, Row } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import QuizItem from '../components/QuizItem';
import LoadingSpinner from '../components/LoadingSpinner';
import { Quizzes } from '../../api/quiz/Quizzes';
// import Filter from '../components/Filter';

/* Renders a table containing all of the Quizzes documents. Use <QuizItem> to render each row. */
const TakeQuiz = () => {
  const OnChangeValue = () => {
    // eslint-disable-next-line no-restricted-globals
    console.log(event.target.value);
    // eslint-disable-next-line no-restricted-globals
    return event.target.value;
  };
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
    <Container id="takequiz" className="py-3">
      <Row className="justify-content-center">
        <Col>
          <Col className="text-center">
            <h2>Take Quiz</h2>
          </Col>
          <Row xs={1} md={2} lg={3} className="g-4">
            <Form.Control
              as="select"
              custom
              /* eslint-disable-next-line react/jsx-no-bind */
              onChange={OnChangeValue.bind(this)}
            >
              <option>Filter by Subject</option>
              <option value="Math">Math</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </Form.Control>
            {quizzes.filter(quiz => quiz.subject === 'Math').map((quiz, index) => (<Col key={index}><QuizItem quiz={quiz} /></Col>))}
          </Row>
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner />);
};

export default TakeQuiz;
