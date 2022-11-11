import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
const QuizItem = ({ quiz: quiz }) => (
  <tr>
    <td>{quiz.name}</td>
    <td>{quiz.quantity}</td>
    <td>{quiz.condition}</td>
    <td>
      <Link to={`/edit/${quiz._id}`}>Edit</Link>
    </td>
  </tr>
);

// Require a document to be passed to this component.
QuizItem.propTypes = {
  quiz: PropTypes.shape({
    name: PropTypes.string,
    quantity: PropTypes.number,
    condition: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
};

export default QuizItem;
