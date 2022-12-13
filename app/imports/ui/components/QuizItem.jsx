import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
const QuizItem = ({ quiz }) => (
  <Card className="h-100">
    <Card.Header>
      <Card.Title>{quiz.title}</Card.Title>
    </Card.Header>
    <Card.Body>
      <Card.Text>
        Subject: {quiz.subject}
      </Card.Text>
      <Card.Text>
        Creator: <Link key="creator" to={`/profile/${quiz.owner}`}>{quiz.owner}</Link>
      </Card.Text>
      <Card.Text>
        Description: {quiz.description}
      </Card.Text>
      <Card.Text>
        <Link key="start" to={`/quizPage/${quiz._id}`}>Start This Quiz</Link>
      </Card.Text>
    </Card.Body>
  </Card>
);

// Require a document to be passed to this component.
QuizItem.propTypes = {
  quiz: PropTypes.shape({
    title: PropTypes.string,
    subject: PropTypes.string,
    description: PropTypes.string,
    createdAt: PropTypes.instanceOf(Date),
    owner: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
};

export default QuizItem;
