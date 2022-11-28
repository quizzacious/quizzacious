import React from 'react';
import swal from 'sweetalert';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { AutoForm, SubmitField } from 'uniforms-bootstrap5';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { useParams } from 'react-router';
import LoadingSpinner from '../components/LoadingSpinner';
import { Quizzes } from '../../api/quiz/Quizzes';

const bridge = new SimpleSchema2Bridge(Quizzes.schema);

/* Renders the DeleteQuiz page for editing a single document. */
const DeleteQuiz = () => {
  // Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
  const { _id } = useParams();
  // console.log('DeleteQuiz', _id);
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { doc, ready } = useTracker(() => {
    // Get access to Quizzes documents.
    const subscription = Meteor.subscribe(Quizzes.adminPublicationName);
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // Get the document
    const document = Quizzes.collection.findOne(_id);
    return {
      doc: document,
      ready: rdy,
    };
  }, [_id]);
  // On successful submit, insert the data.
  const submit = () => {
    Quizzes.collection.remove(_id, (error) => (error ?
      swal('Error', error.message, 'error') :
      swal('Success', 'Item deleted successfully', 'success')));
  };

  return ready ? (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col xs={5}>
          <Col className="text-center"><h2>Delete Quiz</h2></Col>
          <AutoForm schema={bridge} onSubmit={data => submit(data)} model={doc} />
          <Card>
            <Card.Body>
              <SubmitField value="Submit" />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner />;
};

export default DeleteQuiz;
