import React from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { AutoForm, ErrorsField, SubmitField, TextField } from 'uniforms-bootstrap5';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import swal from 'sweetalert';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { useParams } from 'react-router';
import { Questions } from '../../api/questions/Questions';
import { Quizzes } from '../../api/quiz/Quizzes';
import LoadingSpinner from '../components/LoadingSpinner';

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

  const { _id, ques_id } = useParams();
  // console.log('QuizPage', _id);
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { questions, ready } = useTracker(() => {
    // Get access to Quizzes documents.
    const subscription = Meteor.subscribe(Quizzes.userPublicationName);
    const subscription2 = Meteor.subscribe(Questions.userPublicationName);
    // Determine if the subscription is ready
    const rdy = subscription2.ready() && subscription.ready();
    // Get the document
    const question = Questions.collection.find();
    // DELETE MAYBE??? const takenQuiz = TakenQuizzes.collection.findOne(take_id);
    return {
      questions: question,
      ready: rdy,
    };
  }, [_id, ques_id]);

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
  return ready ? (
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
  ) : <LoadingSpinner />;
};

export default MakeQuestions;
