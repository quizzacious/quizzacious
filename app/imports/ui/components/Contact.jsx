import React from 'react';
import PropTypes from 'prop-types';
import { Image, Card, Stack, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
const Contact = ({ contact }) => (
  <Card className="h-100">
    <Card.Header>
      <Stack direction="horizontal" gap={3}>
        <Image thumbnail src={contact.image} width={150} />
        <Stack direction="vertical" gap={1}>
          <Card.Title>{contact.firstName} {contact.lastName} #{contact.owner}</Card.Title>
          <Card.Subtitle>{contact.address}</Card.Subtitle>
          <hr />
          <Card.Title>Major: <Badge>{contact.major}</Badge></Card.Title>
        </Stack>
      </Stack>
    </Card.Header>
    <Card.Body>
      <Card.Title>About Me</Card.Title>
      <Card.Text>{contact.description}</Card.Text>
    </Card.Body>
    <Card.Footer> <Link id="contact-edit" to={`/contacts/${contact._id}`}>Edit Profile</Link> </Card.Footer>
  </Card>
);

// Require a document to be passed to this component.
Contact.propTypes = {
  contact: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    address: PropTypes.string,
    major: PropTypes.string,
    image: PropTypes.string,
    description: PropTypes.string,
    _id: PropTypes.string,
    owner: PropTypes.string,
  }).isRequired,
};

export default Contact;
