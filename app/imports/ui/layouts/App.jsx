import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Landing from '../pages/Landing';
import Profile from '../pages/Profile';
import ProfileAdmin from '../pages/ProfileAdmin';
import EditQuiz from '../pages/EditQuiz';
import NotFound from '../pages/NotFound';
import SignUp from '../pages/SignUp';
import SignOut from '../pages/SignOut';
import NavBar from '../components/NavBar';
import SignIn from '../pages/SignIn';
import NotAuthorized from '../pages/NotAuthorized';
import TakeQuiz from '../pages/TakeQuiz';
import MakeQuiz from '../pages/MakeQuiz';
import QuizPage from '../pages/QuizPage';
import MakeQuestions from '../pages/MakeQuestions';
import EditContacts from '../pages/EditContacts';
import ProfileAdm from '../pages/ProfileAdm';
import QuizHistory from '../pages/QuizHistory';
import TakingQuiz from '../pages/TakingQuiz';
import ListQuiz from '../pages/ListQuiz';
import ThisQuiz from '../pages/ThisQuiz';
import Filter from '../pages/Filter';
import ListQuestion from '../pages/ListQuestion';
import EditQuestion from '../pages/EditQuestion';
import AddContacts from '../pages/AddContacts';

/** Top-level layout component for this application. Called in imports/startup/client/startup.jsx. */
const App = () => (
  <Router>
    <div className="d-flex flex-column min-vh-100">
      <NavBar />
      <Routes>
        <Route exact path="/" element={<Landing />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/home" element={<Landing />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signout" element={<SignOut />} />
        <Route path="/take" element={<ProtectedRoute><TakeQuiz /></ProtectedRoute>} />
        <Route path="/filter" element={<ProtectedRoute><Filter /></ProtectedRoute>} />
        <Route path="/history" element={<ProtectedRoute><QuizHistory /></ProtectedRoute>} />
        <Route path="/listQuiz" element={<ProtectedRoute><ListQuiz /></ProtectedRoute>} />
        <Route path="/listQuestion" element={<ProtectedRoute><ListQuestion /></ProtectedRoute>} />
        <Route path="/quizpage/:_id" element={<ProtectedRoute><QuizPage /></ProtectedRoute>} />
        <Route path="/thisQuiz/:_id" element={<ProtectedRoute><ThisQuiz /></ProtectedRoute>} />
        <Route path="/taking/:_id/:take_id/:num" element={<ProtectedRoute><TakingQuiz /></ProtectedRoute>} />
        <Route path="/profile/:user" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="/contacts/:_id" element={<ProtectedRoute><EditContacts /></ProtectedRoute>} />
        <Route path="/addprofile" element={<ProtectedRoute><AddContacts /></ProtectedRoute>} />
        <Route path="/make" element={<ProtectedRoute><MakeQuiz /></ProtectedRoute>} />
        <Route path="/makeQuestions/:_id/:num" element={<ProtectedRoute><MakeQuestions /></ProtectedRoute>} />
        <Route path="/list" element={<AdminProtectedRoute><ProfileAdm /></AdminProtectedRoute>} />
        <Route path="/edit/:_id" element={<ProtectedRoute><EditQuiz /></ProtectedRoute>} />
        <Route path="/editQuestion/:_id" element={<ProtectedRoute><EditQuestion /></ProtectedRoute>} />
        <Route path="/admin" element={<AdminProtectedRoute><ProfileAdmin /></AdminProtectedRoute>} />
        <Route path="/notauthorized" element={<NotAuthorized />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  </Router>
);

/*
 * ProtectedRoute (see React Router v6 sample)
 * Checks for Meteor login before routing to the requested page, otherwise goes to signin page.
 * @param {any} { component: Component, ...rest }
 */
const ProtectedRoute = ({ children }) => {
  const isLogged = Meteor.userId() !== null;
  return isLogged ? children : <Navigate to="/signin" />;
};

/**
 * AdminProtectedRoute (see React Router v6 sample)
 * Checks for Meteor login and admin role before routing to the requested page, otherwise goes to signin page.
 * @param {any} { component: Component, ...rest }
 */
const AdminProtectedRoute = ({ children }) => {
  const isLogged = Meteor.userId() !== null;
  if (!isLogged) {
    return <Navigate to="/signin" />;
  }
  const isAdmin = Roles.userIsInRole(Meteor.userId(), 'admin');
  return (isLogged && isAdmin) ? children : <Navigate to="/notauthorized" />;
};

// Require a component and location to be passed to each ProtectedRoute.
ProtectedRoute.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
};

ProtectedRoute.defaultProps = {
  children: <Landing />,
};

// Require a component and location to be passed to each AdminProtectedRoute.
AdminProtectedRoute.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
};

AdminProtectedRoute.defaultProps = {
  children: <Landing />,
};

export default App;
