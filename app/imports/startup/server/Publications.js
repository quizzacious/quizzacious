import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Quizzes } from '../../api/quiz/Quizzes';
import { Ratings } from '../../api/rating/Ratings';

// User-level publication.
// If logged in, then publish documents owned by this user. Otherwise publish nothing.

// Admin-level publication.
// If logged in and with admin role, then publish all documents from all users. Otherwise publish nothing.

Meteor.publish(Quizzes.userPublicationName, function () {
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;
    return Quizzes.collection.find({ owner: username });
  }
  return this.ready();
});

/** Define a publication to publish all quizzes. */
Meteor.publish(Quizzes.userPublicationName, function () {
  if (this.userId) {
    return Quizzes.collection.find();
  }
  return this.ready();
});
// Admin-level publication.
Meteor.publish(Quizzes.adminPublicationName, function () {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return Quizzes.collection.find();
  }
  return this.ready();
});

Meteor.publish(Ratings.userPublicationName, function () {
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;
    return Ratings.collection.find({ owner: username });
  }
  return this.ready();
});

/** Define a publication to publish all ratings. */
Meteor.publish(Ratings.userPublicationName, function () {
  if (this.userId) {
    return Ratings.collection.find();
  }
  return this.ready();
});

// alanning:roles publication
// Recommended code to publish roles for each user.
Meteor.publish(null, function () {
  if (this.userId) {
    return Meteor.roleAssignment.find({ 'user._id': this.userId });
  }
  return this.ready();
});
