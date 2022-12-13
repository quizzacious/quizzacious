import { landingPage } from './landing.page';
import { signinPage } from './signin.page';
import { signoutPage } from './signout.page';
import { navBar } from './navbar.component';
import { makequiz } from './makequiz';
import { takequiz } from './takequiz';
import { profile } from './profile';
import { quizpage } from './quizpage';
import { takingquiz } from './takingquiz';
import { makequestions } from './makequestions';
import { editprofile } from './editcontact';

/* global fixture:false, test:false */

/** Credentials for one of the sample users defined in settings.json. */
const credentials = { username: 'john@foo.com', password: 'changeme' };

fixture('meteor-react-bootstrap-template localhost test with default db')
  .page('http://localhost:3000');

test('Test that landing page shows up', async (testController) => {
  await landingPage.isDisplayed(testController);
});

test('Test that signin and signout work', async (testController) => {
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.isLoggedIn(testController, credentials.username);
  await navBar.logout(testController);
  await signoutPage.isDisplayed(testController);
});

test('Test the makequiz', async (testController) => {
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.isLoggedIn(testController, credentials.username);
  await navBar.gotoMakeQuiz(testController);
  await makequiz.isDisplayed(testController);
  await makequiz.makequizform(testController);
  await navBar.logout(testController);
  await signoutPage.isDisplayed(testController);
});

test('Test the makequestions', async (testController) => {
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.isLoggedIn(testController, credentials.username);
  await navBar.gotoMakeQuiz(testController);
  await makequiz.isDisplayed(testController);
  await makequiz.makequizform(testController);
  await makequestions.makequestionsform(testController);
  await navBar.logout(testController);
  await signoutPage.isDisplayed(testController);
});

test.only('Test the takequiz', async (testController) => {
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.isLoggedIn(testController, credentials.username);
  await navBar.gotoTakeQuiz(testController);
  await takequiz.isDisplayed(testController);
  await takequiz.selectquiz(testController);
  await quizpage.isDisplayed(testController);
  await quizpage.startquiz(testController);
  await takingquiz.isDisplayed(testController);
  await navBar.logout(testController);
  await signoutPage.isDisplayed(testController);
});

test('Test the Profile', async (testController) => {
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.isLoggedIn(testController, credentials.username);
  await navBar.gotoProfile(testController);
  await profile.isDisplayed(testController);
  await profile.profileedit(testController);
  await editprofile.editprofileform(testController);
  await navBar.gotoProfile(testController);
  await profile.isDisplayed(testController);
  await profile.clickprofileuser(testController);
  await profile.isDisplayed(testController);
  await navBar.gotoProfile(testController);
  await profile.clickprofilehistory(testController);
  await profile.isDisplayed(testController);
  await navBar.logout(testController);
  await signoutPage.isDisplayed(testController);
});
