import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Button, Card } from 'react-bootstrap';
import { Trash } from 'react-bootstrap-icons';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
const ListQuestionItem = ({ question, collection }) => {
  const removeItem = (docID) => {
    console.log(`The item to remove is ${docID}`);
    collection.remove(docID);
  };
  return (
    <Card className="h-100">
      <Card.Body>
        <Card.Text>
          <p>Question: {question.question}</p>
          <p>Answer 1: {question.answer1}</p>
          <p>Answer 2: {question.answer2}</p>
          <p>Answer 3: {question.answer3}</p>
          <p>Answer 4: {question.answer4}</p>
          <p>Correct Answer: {question.answerFinal}</p>
          <Link className="p-3" to={`/editQuestion/${question._id}`}>Edit This Question</Link>
          <Button className="p-1" variant="danger" onClick={() => removeItem(question._id)}><Trash /></Button>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

// Require a document to be passed to this component.
ListQuestionItem.propTypes = {
  question: PropTypes.shape({
    question: String,
    answer1: String,
    answer2: String,
    answer3: String,
    answer4: String,
    answerFinal: String,
    _id: PropTypes.string,
    questionNum: PropTypes.number,
  }).isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  collection: PropTypes.object.isRequired,
};

export default ListQuestionItem;