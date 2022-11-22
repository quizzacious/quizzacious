import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/**
 * The TakenQuizzesCollection. It encapsulates state and variable values for a taken quiz.
 */
class TakenQuizzesCollection {
  constructor() {
    // The name of this collection.
    this.name = 'TakenQuizzesCollection';
    // Define the Mongo collection.
    this.collection = new Mongo.Collection(this.name);
    // Define the structure of each document in the collection.
    this.schema = new SimpleSchema({
      taker: String,
      quiz: String,
      score: Number,
      createdAt: Date,
      inputtedAnswers: [String],
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
 * @type {TakenQuizzesCollection}
 */
export const TakenQuizzes = new TakenQuizzesCollection();
