import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Card, Col, Container, Row, Button } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import LoadingSpinner from '../components/LoadingSpinner';
import Contact from '../components/Contact';
import { Contacts } from '../../api/contact/Contacts';

/* Renders a table containing all of the Quizzes documents. Use <QuizItem> to render each row. */
const Profile = () => {
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { ready, contacts } = useTracker(() => {
    // Note that this subscription will get cleaned up
    // when your component is unmounted or deps change.
    // Get access to Quizzes documents.
    const subscription = Meteor.subscribe(Contacts.userPublicationName);
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // Get the Quizzes documents
    const contactItems = Contacts.collection.find({}).fetch();
    return {
      contacts: contactItems,
      ready: rdy,
    };
  }, []);

  const newProfile = () => {
    if (contacts[0]) {
      return <div />;
    }
    return (
      <div>
        <Card.Footer as="h5">Create Your Own Profile</Card.Footer>
        <Card.Body>
          <Card.Title>Create Your Profile!</Card.Title>
          <Card.Text>Use the button to create your own profile . .
          </Card.Text>
          <Button href="/addprofile">Profile</Button>
        </Card.Body>
      </div>
    );
  };

  return (ready ? (
    <Container>
      <Row className="justify-content-center">
        <Col className="py-5">
          <Row>
            {contacts.map((contact) => (<Col key={contact._id}><Contact contact={contact} /></Col>))}
          </Row>
        </Col>
        <Col md={7} className="py-5">
          <Card>
            <Card.Header as="h5">Check Your Own Quizzes</Card.Header>
            <Card.Body>
              <Card.Title>Look at your quizzes . . . </Card.Title>
              <Card.Text>This is a button to see your own quizzes that you made!</Card.Text>
              <Button href="/listQuiz">Your Quizzes</Button>
            </Card.Body>
            <Card.Footer as="h5">Check Your Quizzes History</Card.Footer>
            <Card.Body>
              <Card.Title>Look through your quiz history!</Card.Title>
              <Card.Text>Look at what you have taken in the past and see what you can do better . . .</Card.Text>
              <Button href="/history">Quiz History</Button>
            </Card.Body>
            {newProfile()}
          </Card>
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner />);
};

export default Profile;
