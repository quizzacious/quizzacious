import { Selector } from 'testcafe';

class TakingQuiz {
  constructor() {
    this.pageId = '#takingquiz';
    this.pageSelector = Selector(this.pageId);
  }

  /** Checks that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }
}

export const takingquiz = new TakingQuiz();
