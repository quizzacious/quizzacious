import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { AutoForm, ErrorsField, SubmitField, TextField } from 'uniforms-bootstrap5';
import swal from 'sweetalert';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { Quizzes } from '../../api/quiz/Quizzes';

// Create a schema to specify the structure of the data to appear in the form.

const formSchema = new SimpleSchema({
  title: String,
  subject: String,
  description: String,
});

const bridge = new SimpleSchema2Bridge(formSchema);

/* Renders the MakeQuiz page for making a quiz. */
const MakeQuiz = () => {

  // On submit, insert the data.
  const submit = (data, formRef) => {
    const { title, subject, description } = data;
    const owner = Meteor.user().username;
    const questions = [];
    const createdAt = new Date();
    Quizzes.collection.insert(
      { title, subject, description, createdAt, owner, questions },
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success', 'Item added successfully', 'success');
          formRef.reset();
        }
      },
    );
  };

  // Render the form. Use Uniforms: https://github.com/vazco/uniforms
  let fRef = null;
  return (
    <Container id="makequiz" className="py-3">
      <Row className="justify-content-center">
        <Col xs={5}>
          <Col className="text-center"><h2>Make Quiz</h2></Col>
          <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => submit(data, fRef)}>
            <Card>
              <Card.Body>
                <TextField id="make-quiz-title" name="title" />
                <TextField id="make-quiz-subject" name="subject" />
                <TextField id="make-quiz-description" name="description" />
                <SubmitField id="make-quiz-submit" value="Save" />
                <Card.Link id="make-quiz" href="/listQuiz">Create Questions</Card.Link>
                <ErrorsField />
              </Card.Body>
            </Card>
          </AutoForm>
        </Col>
      </Row>
    </Container>
  );
};

export default MakeQuiz;
