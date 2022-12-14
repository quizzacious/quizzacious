import React from 'react';
import swal from 'sweetalert';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { AutoForm, ErrorsField, SubmitField, TextField } from 'uniforms-bootstrap5';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { useParams } from 'react-router';
import LoadingSpinner from '../components/LoadingSpinner';
import { Questions } from '../../api/questions/Questions';
import { Quizzes } from '../../api/quiz/Quizzes';

const bridge = new SimpleSchema2Bridge(Questions.schema);

/* Renders the EditQuestion page for editing a single document. */
const EditQuestion = () => {
  // Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
  const { _id, _id2 } = useParams();
  // console.log('EditQuestion', _id);
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { doc, ready } = useTracker(() => {
    // Get access to Questions documents.
    const subscription = Meteor.subscribe(Questions.userPublicationName);
    const subscription2 = Meteor.subscribe(Quizzes.userPublicationName);
    // Determine if the subscription is ready
    const rdy = subscription.ready() && subscription2.ready();
    // Get the document
    const document = Questions.collection.findOne(_id);
    const document2 = Quizzes.collection.findOne(_id2);
    return {
      doc: document,
      doc2: document2,
      ready: rdy,
    };
  }, [_id]);
  // console.log('EditQuestion', doc, ready);
  // On successful submit, insert the data.
  const submit = (data) => {
    const { question, answer1, answer2, answer3, answer4, answerFinal } = data;
    Questions.collection.update(_id, _id2, { $set: { question, answer1, answer2, answer3, answer4, answerFinal } }, (error) => (error ?
      swal('Error', error.message, 'error') :
      swal('Success', 'Item updated successfully', 'success')));
  };

  return ready ? (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col xs={5}>
          <Col className="text-center"><h2>Edit Question</h2></Col>
          <AutoForm schema={bridge} onSubmit={data => submit(data)} model={doc}>
            <Card>
              <Card.Body>
                <TextField name="question" />
                <TextField name="answer1" />
                <TextField name="answer2" />
                <TextField name="answer3" />
                <TextField name="answer4" />
                <TextField name="answerFinal" />
                <SubmitField value="Save" />
                <Card.Link href="/listQuestion">Back</Card.Link>
                <ErrorsField />
              </Card.Body>
            </Card>
          </AutoForm>
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner />;
};

export default EditQuestion;
