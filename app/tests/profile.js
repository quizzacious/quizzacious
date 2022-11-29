import { Selector } from 'testcafe';

class Profile {
  constructor() {
    this.pageId = '#profile-nav';
    this.pageSelector = Selector(this.pageId);
  }

  /** Checks that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }

}

export const profile = new Profile();
