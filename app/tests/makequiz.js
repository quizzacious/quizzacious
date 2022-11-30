import { Selector } from 'testcafe';

class MakeQuiz {
  constructor() {
    this.pageId = '#makequiz';
    this.pageSelector = Selector(this.pageId);
  }

  /** Checks that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }

  async makequizform(testController) {
    const title = 'A';
    const subject = 'B';
    const description = 'C';
    await this.isDisplayed(testController);
    await testController.typeText('#make-quiz-title', title);
    await testController.typeText('#make-quiz-subject', subject);
    await testController.typeText('#make-quiz-description', description);
    await testController.click('#make-quiz-submit input.btn.btn-primary');
    await testController.click('button.swal-button--confirm');
    await testController.click('#make-quez');
  }
}

export const makequiz = new MakeQuiz();
