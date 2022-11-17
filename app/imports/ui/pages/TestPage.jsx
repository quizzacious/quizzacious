import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { AutoForm, ErrorsField, SelectField, SubmitField, TextField } from 'uniforms-bootstrap5';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { Quizzes } from '../../api/quiz/Quizzes';

// Create a schema to specify the structure of the data to appear in the form.
const formSchema = new SimpleSchema({
  name: String,
  question: String,
  answer1: String,
  answer2: String,
  answer3: String,
  answer4: String,
  owner: String,
  answerFinal: {
    type: String,
    allowedValues: ['1', '2', '3', '4'],
    defaultValue: '1',
  },
});

const bridge = new SimpleSchema2Bridge(formSchema);

/* Renders the MakeQuiz page for making a quiz. */
const MakeQuiz = () => {

  // On submit, insert the data.
  const submit = (data, formRef) => {
    const { name, question, answer1, answer2, answer3, answer4, answerFinal } = data;
    const owner = Meteor.user().username;
    Quizzes.collection.insert(
      { name, question, answer1, answer2, answer3, answer4, answerFinal, owner },
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
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col xs={5}>
          <Col className="text-center"><h2>Create a New Quiz</h2></Col>
          <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => submit(data, fRef)}>
            <p>Title: <TextField name="name" /></p>
            <TextField name="question" />
            <TextField name="answer1" />
            <TextField name="answer2" />
            <TextField name="answer3" />
            <TextField name="answer4" />
            <SelectField name="answerFinal" />
            <SubmitField value="Submit" />
            <ErrorsField />
          </AutoForm>
        </Col>
      </Row>
    </Container>
  );
};

export default MakeQuiz;
