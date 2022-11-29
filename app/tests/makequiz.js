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

}

export const makequiz = new MakeQuiz();
