import { Selector } from 'testcafe';

class TakeQuiz {
  constructor() {
    this.pageId = '#takequiz';
    this.pageSelector = Selector(this.pageId);
  }

  /** Checks that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }

}

export const takequiz = new TakeQuiz();
