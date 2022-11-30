import { Selector } from 'testcafe';

class EditProfile {
  constructor() {
    this.pageId = '#edit-contact';
    this.pageSelector = Selector(this.pageId);
  }

  /** Checks that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }

  async editprofileform(testController) {
    const firstName = 'Ye';
    const lastName = 'West';
    const address = 'Florida';
    const image = 'https://i.guim.co.uk/img/media/5a6884a68d01ec287e8df8dcab2cf6a47d97eaf2/0_9_2000_1200/master/2000.jpg?width=620&quality=45&dpr=2&s=none';
    const description = 'I had dinner with Tromp';
    await this.isDisplayed(testController);
    await testController.typeText('#edit-contact-first', firstName);
    await testController.typeText('#edit-contact-last', lastName);
    await testController.typeText('#edit-contact-address', address);
    await testController.typeText('#edit-contact-image', image);
    await testController.typeText('#edit-contact-description', description);
    await testController.click('#edit-contact-submit input.btn.btn-primary');
    await testController.click('button.swal-button--confirm');
  }
}

export const editprofile = new EditProfile();
