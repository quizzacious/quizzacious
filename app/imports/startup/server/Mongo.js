import { Meteor } from 'meteor/meteor';
import { Quizzes } from '../../api/quiz/Quizzes.js';

/* eslint-disable no-console */

// Initialize the database with a default data document.
const addData = (data) => {
  console.log(`  Adding: ${data.title} (${data.owner})`);
  Quizzes.collection.insert(data);
};

// Initialize the QuizzesCollection if empty.
if (Quizzes.collection.find().count() === 0) {
  if (Meteor.settings.defaultQuizzes) {
    console.log('Creating default quizzes.');
    Meteor.settings.defaultQuizzes.forEach(data => addData(data));
  }
}
