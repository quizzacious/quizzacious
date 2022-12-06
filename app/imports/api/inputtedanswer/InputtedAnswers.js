import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/**
 * The InputtedAnswersCollection. It encapsulates state and variable values for the answer in a taken quiz.
 */
class InputtedAnswersCollection {
  constructor() {
    // The name of this collection.
    this.name = 'InputtedAnswersCollection';
    // Define the Mongo collection.
    this.collection = new Mongo.Collection(this.name);
    // Define the structure of each document in the collection.
    this.schema = new SimpleSchema({
      taker: String,
      takenQuiz: String,
      questionNum: Number,
      answer: {
        type: String,
        allowedValues: ['1', '2', '3', '4'],
      },
    }, { tracker: Tracker });
    // Attach the schema to the collection, so all attempts to insert a document are checked against schema.
    this.collection.attachSchema(this.schema);
    // Define names for publications and subscriptions
    this.userPublicationName = `${this.name}.publication.user`;
    this.adminPublicationName = `${this.name}.publication.admin`;
  }
}

/**
 * The singleton instance of the TakenQuizzesCollection.
 * @type {InputtedAnswersCollection}
 */
export const InputtedAnswers = new InputtedAnswersCollection();
