import React from 'react';
import swal from 'sweetalert';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { AutoForm, ErrorsField, SelectField, SubmitField } from 'uniforms-bootstrap5';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import SimpleSchema from 'simpl-schema';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';
import { Quizzes } from '../../api/quiz/Quizzes';
import { InputtedAnswers } from '../../api/inputtedanswer/InputtedAnswers';

/* Renders the QuizPage page for preparing the actual quiz. */
const QuizPage = () => {
  // Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
  const { _id, take_id, num } = useParams();
  const questionNum = Number(num);
  // console.log('QuizPage', _id);
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { quiz, answers, ready } = useTracker(() => {
    // Get access to Quizzes documents.
    const subscription = Meteor.subscribe(Quizzes.userPublicationName);
    const subscription3 = Meteor.subscribe(InputtedAnswers.userPublicationName);
    // Determine if the subscription is ready
    const rdy = subscription.ready() && subscription3.ready();
    // Get the document
    const quizItem = Quizzes.collection.findOne(_id);
    const answerItems = InputtedAnswers.collection.find({ takenQuiz: take_id, questionNum }).fetch();
    return {
      quiz: quizItem,
      answers: answerItems,
      ready: rdy,
    };
  }, [_id, num]);
  // console.log('QuizPage', doc, ready);

  const bridge = new SimpleSchema2Bridge(new SimpleSchema({ answer: {
    type: String,
    allowedValues: ['1', '2', '3', '4'],
    defaultValue: (answers[0] ? answers[0].answer : '5'),
  } }));

  // On successful submit, insert the data.
  const submit = (data) => {
    const taker = Meteor.user().username;
    const takenQuiz = take_id;
    const answer = `${data.answer}`;
    if (answers[0]) {
      InputtedAnswers.collection.update(answers[0]._id, { $set: { taker, takenQuiz, questionNum, answer } }, (error) => (error ?
        swal('Error', error.message, 'error') :
        swal('Success', 'Item updated successfully', 'success')));
    } else {
      InputtedAnswers.collection.insert({ taker, takenQuiz, questionNum, answer }, (error) => (error ?
        swal('Error', error.message, 'error') :
        swal('Success', 'Item updated successfully', 'success')));
    }
  };

  return ready ? (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col xs={5}>
          <Col className="text-center"><h2>{quiz.title}</h2></Col>
          <AutoForm schema={bridge} onSubmit={data => submit(data)}>
            <Card>
              <Card.Body>
                <Card.Text>
                  Question: {quiz.questions[num - 1].question}
                </Card.Text>
                <Card.Text>
                  1: {quiz.questions[num - 1].answer1}
                </Card.Text>
                <Card.Text>
                  2: {quiz.questions[num - 1].answer2}
                </Card.Text>
                <Card.Text>
                  3: {quiz.questions[num - 1].answer3}
                </Card.Text>
                <Card.Text>
                  4: {quiz.questions[num - 1].answer4}
                </Card.Text>
                <SelectField name="answer" />
                <SubmitField value="Submit" />
                <ErrorsField />
                <Card.Text>
                  {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                  <Link to={questionNum > 1 ? `/taking/${_id}/${take_id}/${questionNum - 1}` : '#'}>Prev</Link>
                </Card.Text>
                <Card.Text>
                  {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                  <Link to={questionNum < 10 ? `/taking/${_id}/${take_id}/${questionNum + 1}` : '#'}>Next</Link>
                </Card.Text>
              </Card.Body>
            </Card>
          </AutoForm>
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner />;
};

export default QuizPage;
