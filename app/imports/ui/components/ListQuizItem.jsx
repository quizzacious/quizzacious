import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
const ListQuizItem = ({ quiz }) => (
  <Card className="h-100">
    <Card.Header>
      <Card.Title>{quiz.title}</Card.Title>
    </Card.Header>
    <Card.Body>
      <Card.Text>
        <p>Subject: {quiz.subject}</p>
        <p>Rating:</p>
        <p>Description: {quiz.description}</p>
        <Link to={`/edit/${quiz._id}`}>Edit This Quiz</Link>
      </Card.Text>
    </Card.Body>
  </Card>
);

// Require a document to be passed to this component.
ListQuizItem.propTypes = {
  quiz: PropTypes.shape({
    title: String,
    subject: String,
    description: String,
    createdAt: Date,
    _id: PropTypes.string,
  }).isRequired,
};

export default ListQuizItem;
