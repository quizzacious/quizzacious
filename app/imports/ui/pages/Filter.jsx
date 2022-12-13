import React from 'react';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import { Container, Card, Row, Col } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { _ } from 'meteor/underscore';
import { AutoForm, SelectField, SubmitField } from 'uniforms-bootstrap5';
import LoadingSpinner from '../components/LoadingSpinner';
import { useStickyState } from '../utilities/StickyState';
import { ComponentIDs } from '../utilities/ids';
import QuizItem from '../components/QuizItem';
import { Quizzes } from '../../api/quiz/Quizzes';

/* Create a schema to specify the structure of the data to appear in the form. */
const makeSchema = (allInterests) => new SimpleSchema({
  subject: { type: Array, label: 'Subject', optional: true },
  'subject.$': { type: String, allowedValues: allInterests },
});

/* Renders the Profile Collection as a set of Cards. */
const Filter = () => {
  const [subject, setInterests] = useStickyState('interests', []);

  const { ready, quizzes } = useTracker(() => {
    // Note that this subscription will get cleaned up
    // when your component is unmounted or deps change.
    // Get access to Quizzes documents.
    const subscription = Meteor.subscribe(Quizzes.userPublicationName);
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // Get the Quizzes documents
    const quizItems = Quizzes.collection.find({}).fetch();
    return {
      quizzes: quizItems,
      ready: rdy,
    };
  }, []);
  const submit = (data) => {
    setInterests(data.subject || []);
  };

  const allInterests = _.uniq(_.pluck(quizzes, 'subject'));
  const formSchema = makeSchema(allInterests);
  const bridge = new SimpleSchema2Bridge(formSchema);
  const quizSubject = quizzes.filter(pI => subject.includes(pI.subject));
  const transform = (label) => ` ${label}`;

  return ready ? (
    <Container id="takequiz" className="py-3">
      <AutoForm schema={bridge} onSubmit={data => submit(data)} model={{ subject }}>
        <Card>
          <Card.Body id={ComponentIDs.filterFormInterests}>
            <SelectField name="subject" multiple placeholder="Subject" checkboxes transform={transform} />
            <SubmitField id={ComponentIDs.filterFormSubmit} value="Submit" />
          </Card.Body>
        </Card>
      </AutoForm>
      <Row xs={1} md={2} lg={4} className="g-2" style={{ paddingTop: '10px' }}>
        {quizSubject.map((quiz, index) => (<Col key={index}><QuizItem quiz={quiz} /></Col>))}
      </Row>
    </Container>
  ) : <LoadingSpinner />;
};

export default Filter;
