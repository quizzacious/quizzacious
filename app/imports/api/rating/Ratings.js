import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/**
 * The RatingsCollection. It encapsulates state and variable values for quiz.
 */
class RatingsCollection {
  constructor() {
    // The name of this collection.
    this.name = 'RatingsCollection';
    // Define the Mongo collection.
    this.collection = new Mongo.Collection(this.name);
    // Define the structure of each document in the collection.
    this.schema = new SimpleSchema({
      reviewer: String,
      quiz: String,
      rating: {
        type: SimpleSchema.Integer,
        min: 1,
        max: 5,
      },
      createdAt: Date,
      feedback: {
        type: String,
        optional: true,
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
 * The singleton instance of the RatingsCollection.
 * @type {RatingsCollection}
 */
export const Ratings = new RatingsCollection();
