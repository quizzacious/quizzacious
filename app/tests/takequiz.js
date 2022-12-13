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

  async selectquiz(testController) {
    await this.isDisplayed(testController);
    await testController.click(Selector('a').withText('Start This Quiz'));
  }
}

export const takequiz = new TakeQuiz();
