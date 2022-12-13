import { Selector } from 'testcafe';

class MakeQuestions {
  constructor() {
    this.pageId = '#makequestions';
    this.pageSelector = Selector(this.pageId);
  }

  /** Checks that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }

  async makequestionsform(testController) {
    await testController.click('#make-quest');
    await testController.click('#make-quest1');
    const question = 'A';
    const answer1 = 'B';
    const answer2 = 'C';
    const answer3 = 'C';
    const answer4 = 'C';
    const answerF = 'C';
    await this.isDisplayed(testController);
    await testController.typeText('#make-questions', question);
    await testController.typeText('#make-questions1', answer1);
    await testController.typeText('#make-questions2', answer2);
    await testController.typeText('#make-questions3', answer3);
    await testController.typeText('#make-questions4', answer4);
    await testController.typeText('#make-questions5', answerF);
  }
}

export const makequestions = new MakeQuestions();
