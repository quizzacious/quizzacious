import { Meteor } from 'meteor/meteor';
import { Quizzes } from '../../api/quiz/Quizzes.js';
import { Contacts } from '../../api/contact/Contacts';
import { Questions } from '../../api/questions/Questions';

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

// Initialize the database with a default data document.
const addDatas = (data) => {
  console.log(`  Adding: ${data.title} (${data.owner})`);
  Questions.collection.insert(data);
};

// Initialize the QuizzesCollection if empty.
if (Questions.collection.find().count() === 0) {
  if (Meteor.settings.defaultQuestions) {
    console.log('Creating default questions.');
    Meteor.settings.defaultQuestions.forEach(data => addDatas(data));
  }
}

const addContact = (contact) => {
  console.log(`  Adding: ${contact.lastName} (${contact.owner})`);
  Contacts.collection.insert(contact);
};

if (Contacts.collection.find().count() === 0) {
  if (Meteor.settings.defaultContacts) {
    console.log('Creating default contacts.');
    Meteor.settings.defaultContacts.forEach(contact => addContact(contact));
  }
}
