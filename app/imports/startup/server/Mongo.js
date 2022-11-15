import { Meteor } from 'meteor/meteor';
import { Quiz } from '../../api/quiz/Quiz.js';
import { Quizzes } from '../../api/quiz/Quizzes';

/* eslint-disable no-console */

// Initialize the database with a default data document.
const addData2 = (data) => {
  console.log(`  Adding: ${data.name} (${data.owner})`);
  Quiz.collection.insert(data);
};

// Initialize the StuffsCollection if empty.
if (Quiz.collection.find().count() === 0) {
  if (Meteor.settings.defaultData) {
    console.log('Creating default data.');
    Meteor.settings.defaultData.forEach(data => addData2(data));
  }
}

const addData = (data) => {
  console.log(`  Adding: ${data.title} (${data.owner})`);
  Quizzes.collection.insert(data);
};

// Initialize the StuffsCollection if empty.
if (Quizzes.collection.find().count() === 0) {
  if (Meteor.settings.defaultData) {
    console.log('Creating default data.');
    Meteor.settings.defaultData.forEach(data => addData(data));
  }
}
