import React from 'react';
// import swal from 'sweetalert';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';
import { Quizzes } from '../../api/quiz/Quizzes';
import { TakenQuizzes } from '../../api/takenquiz/TakenQuizzes';

/* Renders the QuizPage page for preparing the actual quiz. */
const QuizPage = () => {
  // Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
  const { _id } = useParams();
  // console.log('QuizPage', _id);
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { _quiz, taken, ready } = useTracker(() => {
    // Get access to Quizzes documents.
    const subscription = Meteor.subscribe(Quizzes.userPublicationName);
    const subscription2 = Meteor.subscribe(TakenQuizzes.userPublicationName);
    // Determine if the subscription is ready
    const rdy = subscription.ready() && subscription2.ready();
    // Get the document
    const quizItem = Quizzes.collection.findOne(_id);
    const takenItem = TakenQuizzes.collection.find({ quiz: _id }).fetch();
    return {
      _quiz: quizItem,
      taken: takenItem,
      ready: rdy,
    };
  }, [_id]);
  // console.log('QuizPage', doc, ready);

  const takeId = () => {
    if (taken[0]) {
      return taken[0]._id;
    }
    return TakenQuizzes.collection.insert({ taker: Meteor.user().username, quiz: _id, score: 0, createdAt: new Date() })[0]._id;
  };

  return ready ? (
    <Container id="quizpage" className="py-3">
      <Row className="justify-content-center">
        <Col xs={5}>
          <Col className="text-center"><h2>Quiz</h2></Col>
          <Card className="h-100">
            <Card.Header>
              <Card.Title>{_quiz.title}</Card.Title>
            </Card.Header>
            <Card.Body>
              <Card.Text>
                Subject: {_quiz.subject}
              </Card.Text>
              <Card.Text>
                Rating:
              </Card.Text>
              <Card.Text>
                Description: {_quiz.description}
              </Card.Text>
              <Card.Text>
                Score: {taken[0].score}/100
              </Card.Text>
              <Card.Text>
                <Link to={`/taking/${_id}/${takeId()}/1`}>Begin</Link>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner />;
};

export default QuizPage;
