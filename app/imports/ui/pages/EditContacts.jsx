import React from 'react';
import swal from 'sweetalert';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { AutoForm, ErrorsField, HiddenField, LongTextField, SubmitField, TextField } from 'uniforms-bootstrap5';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { useParams } from 'react-router';
import LoadingSpinner from '../components/LoadingSpinner';
import { Contacts } from '../../api/contact/Contacts';

const bridge = new SimpleSchema2Bridge(Contacts.schema);

/* Renders the EditContacts page for editing a single document. */
const EditContacts = () => {
  // Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
  const { _id } = useParams();
  // console.log('EditContacts', _id);
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { doc, ready } = useTracker(() => {
    // Get access to Contacts documents.
    const subscription = Meteor.subscribe(Contacts.userPublicationName);
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // Get the document
    const document = Contacts.collection.findOne(_id);
    return {
      doc: document,
      ready: rdy,
    };
  }, [_id]);
  // console.log('EditContacts', doc, ready);
  // On successful submit, insert the data.
  const submit = (data) => {
    const { firstName, lastName, address, major, image, description } = data;
    Contacts.collection.update(_id, { $set: { firstName, lastName, address, major, image, description } }, (error) => (error ?
      swal('Error', error.message, 'error') :
      swal('Success', 'Item updated successfully', 'success')));
  };

  return ready ? (
    <Container id="edit-contact" className="py-3">
      <Row className="justify-content-center">
        <Col xs={10}>
          <Col className="text-center"><h2>Edit Contacts</h2></Col>
          <AutoForm schema={bridge} onSubmit={data => submit(data)} model={doc}>
            <Card>
              <Card.Body>
                <Row>
                  <Col><TextField id="edit-contact-first" name="firstName" /></Col>
                  <Col><TextField id="edit-contact-last" name="lastName" /></Col>
                </Row>
                <Row>
                  <Col><TextField id="edit-contact-address" name="address" /></Col>
                  <Col><TextField id="edit-contact-image" name="image" /></Col>
                  <Col><TextField id="edit-contact-major" name="major" /></Col>
                </Row>
                <LongTextField id="edit-contact-description" name="description" />
                <SubmitField id="edit-contact-submit" value="Submit" />
                <ErrorsField />
                <HiddenField name="owner" />
              </Card.Body>
            </Card>
          </AutoForm>
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner />;
};

export default EditContacts;
