import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/**
 * The QuestionsCollection. It encapsulates state and variable values for questions.
 */
class QuestionsCollection {
  constructor() {
    // The name of this collection.
    this.name = 'QuestionsCollection';
    // Define the Mongo collection.
    this.collection = new Mongo.Collection(this.name);
    // Define the structure of each document in the collection.
    this.schema = new SimpleSchema({
      question: String,
      answer1: String,
      answer2: String,
      answer3: String,
      answer4: String,
      answerFinal: {
        type: String,
        allowedValues: ['1', '2', '3', '4'],
        defaultValue: '1',
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
 * The singleton instance of the QuestionsCollection.
 * @type {QuestionsCollection}
 */
export const Questions = new QuestionsCollection();
