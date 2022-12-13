import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Col, Container, Row } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import LoadingSpinner from '../components/LoadingSpinner';
import { Questions } from '../../api/questions/Questions';
import ListQuestionItem from '../components/ListQuestionItem';

/* Renders a table containing all of the Questions documents. Use <QuestionItem> to render each row. */
const ListQuestion = () => {
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { ready, stuffs: questions } = useTracker(() => {
    // Note that this subscription will get cleaned up
    // when your component is unmounted or deps change.
    // Get access to Questions documents.
    const subscription = Meteor.subscribe(Questions.userPublicationName);
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // Get the Questions documents
    const questionItems = Questions.collection.find({}).fetch();
    return {
      stuffs: questionItems,
      ready: rdy,
    };
  }, []);
  return (ready ? (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col>
          <Col className="text-center">
            <h2>Questions</h2>
          </Col>
          <Row xs={1} md={2} lg={3} className="g-4">
            {questions.map((question, index) => (<Col key={index}><ListQuestionItem question={question} collection={Questions.collection} /></Col>))}
          </Row>
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner />);
};

export default ListQuestion;
