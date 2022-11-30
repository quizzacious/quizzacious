import { Selector } from 'testcafe';

class QuizPage {
  constructor() {
    this.pageId = '#quizpage';
    this.pageSelector = Selector(this.pageId);
  }

  /** Checks that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }

  async startquiz(testController) {
    await this.isDisplayed(testController);
    await testController.click('#begin');
  }

}

export const quizpage = new QuizPage();
