import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Button, Card } from 'react-bootstrap';
import { Trash } from 'react-bootstrap-icons';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
const ListQuizItem = ({ quiz, collection }) => {
  const removeItem = (docID) => {
    console.log(`The item to remove is ${docID}`);
    collection.remove(docID);
  };
  return (
    <Card className="h-100">
      <Card.Header>
        <Card.Title>{quiz.title}</Card.Title>
      </Card.Header>
      <Card.Body>
        <Card.Text>
          <p>Subject: {quiz.subject}</p>
          <p>Description: {quiz.description}</p>
          <Link className="p-3" to={`/edit/${quiz._id}`}>Edit This Quiz</Link>
          <Link id="make-quest" className="p-4" to={`/thisQuiz/${quiz._id}`}>Make Questions</Link>
          <Button className="p-1" variant="danger" onClick={() => removeItem(quiz._id)}><Trash /></Button>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

// Require a document to be passed to this component.
ListQuizItem.propTypes = {
  quiz: PropTypes.shape({
    title: String,
    subject: String,
    description: String,
    createdAt: Date,
    _id: PropTypes.string,
  }).isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  collection: PropTypes.object.isRequired,
};

export default ListQuizItem;
