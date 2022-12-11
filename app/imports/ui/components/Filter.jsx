import { Form } from 'react-bootstrap';
import React from 'react';

const Filter = () => {
  const OnChangeValue = () => {
    // eslint-disable-next-line no-restricted-globals
    console.log(event.target.value);
    // eslint-disable-next-line no-restricted-globals
    return event.target.value;
  };
  return (
    <Form.Control
      as="select"
      custom
      /* eslint-disable-next-line react/jsx-no-bind */
      onChange={OnChangeValue.bind(this)}
    >
      <option>Filter by Subject</option>
      <option value="Math">One</option>
      <option value="2">Two</option>
      <option value="3">Three</option>
    </Form.Control>
  );
};
console.log('Print');
export default Filter;
