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
        <p>Subject: {quiz.subject}</p>
        <p>Rating:</p>
        <p>Description: {quiz.description}</p>
        <Link to={`/quizPage/${quiz._id}`}>Edit This Quiz</Link>
      </Card.Text>
    </Card.Body>
  </Card>
);

// Require a document to be passed to this component.
QuizItem.propTypes = {
  quiz: PropTypes.shape({
    title: String,
    subject: String,
    description: String,
    createdAt: Date,
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
    _id: PropTypes.string,
  }).isRequired,
};

export default QuizItem;
