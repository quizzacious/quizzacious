import React from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { AutoForm, ErrorsField, SubmitField, TextField } from 'uniforms-bootstrap5';
import swal from 'sweetalert';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { Questions } from '../../api/questions/Questions';

// Create a schema to specify the structure of the data to appear in the form.

const formSchema = new SimpleSchema({
  question: String,
  answer1: String,
  answer2: String,
  answer3: String,
  answer4: String,
  answerFinal: {
    type: String,
    allowedValues: ['1', '2', '3', '4'],
    defaultValue: '1',
  },
});

const bridge = new SimpleSchema2Bridge(formSchema);

/* Renders the MakeQuestions page for making a question. */
const MakeQuestions = () => {

  // On submit, insert the data.
  const submit = (data, formRef) => {
    const { question, answer1, answer2, answer3, answer4, answerFinal } = data;
    Questions.collection.insert(
      { question, answer1, answer2, answer3, answer4, answerFinal },
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
    <Container className="py-3" id="makequestions">
      <Row className="justify-content-center">
        <Col xs={5}>
          <Col className="text-center"><h2>Make Questions</h2></Col>
          <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => submit(data, fRef)}>
            <Card>
              <Card.Body>
                <TextField id="make-questions" name="question" />
                <TextField id="make-questions1" name="answer1" />
                <TextField id="make-questions2" name="answer2" />
                <TextField id="make-questions3" name="answer3" />
                <TextField id="make-questions4" name="answer4" />
                <TextField id="make-questions5" name="answerFinal" />
                <SubmitField id="make-questions-submit" value="Next" />
                <ErrorsField />
              </Card.Body>
            </Card>
          </AutoForm>
        </Col>
      </Row>
    </Container>
  );
};

export default MakeQuestions;
