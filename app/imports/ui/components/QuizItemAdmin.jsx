import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

/** Renders a single row in the List Stuff (Admin) table. See pages/ListStuffAdmin.jsx. */
const QuizItemAdmin = ({ quiz }) => (
  <tr>
    <td>{quiz.name}</td>
    <td>{quiz.quantity}</td>
    <td>{quiz.condition}</td>
    <td>{quiz.owner}</td>
    <td>
      <Link to={`/edit/${quiz._id}`}>Edit</Link>
    </td>
  </tr>
);

// Require a document to be passed to this component.
QuizItemAdmin.propTypes = {
  quiz: PropTypes.shape({
    name: PropTypes.string,
    quantity: PropTypes.number,
    condition: PropTypes.string,
    _id: PropTypes.string,
    owner: PropTypes.string,
  }).isRequired,
};

export default QuizItemAdmin;
