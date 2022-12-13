import React from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { AutoForm, ErrorsField, SubmitField, TextField } from 'uniforms-bootstrap5';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import swal from 'sweetalert';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
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

  const { _id, num } = useParams();
  const questionNum = Number(num);
  // console.log('QuizPage', _id);
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { doc, ready } = useTracker(() => {
    // Get access to Quizzes documents.
    const subscription = Meteor.subscribe(Quizzes.userPublicationName);
    const subscription2 = Meteor.subscribe(Questions.userPublicationName);
    // Determine if the subscription is ready
    const rdy = subscription2.ready() && subscription.ready();
    // Get the document
    const document = Questions.collection.findOne(_id, num);
    const question = Questions.collection.find();
    // DELETE MAYBE??? const takenQuiz = TakenQuizzes.collection.findOne(take_id);
    return {
      doc: document,
      questions: question,
      ready: rdy,
    };
  }, [_id, num]);

  // On submit, insert the data.
  const submit = (data) => {
    const { question, answer1, answer2, answer3, answer4, answerFinal } = data;
    Questions.collection.insert(
      { quiz: _id, question, questionNum, answer1, answer2, answer3, answer4, answerFinal },
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success', 'Item added successfully', 'success');
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
          <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => submit(data, fRef)} model={doc}>
            <Card>
              <Card.Body>
                <TextField id="make-questions" name="question" />
                <TextField id="make-questions1" name="answer1" />
                <TextField id="make-questions2" name="answer2" />
                <TextField id="make-questions3" name="answer3" />
                <TextField id="make-questions4" name="answer4" />
                <TextField id="make-questions5" name="answerFinal" />
                <SubmitField id="make-questions-submit" value="Save" />
                <ErrorsField />
                <Card.Text>
                  {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                  <Link to={questionNum < 10 ? `/makeQuestions/${_id}/${questionNum + 1}` : '#'}>Next</Link>
                </Card.Text>
                <Card.Text>
                  {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                  <Link to="/listQuiz">Done</Link>
                </Card.Text>
              </Card.Body>
            </Card>
          </AutoForm>
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner />;
};

export default MakeQuestions;
