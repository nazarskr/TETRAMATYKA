import {browser, by, element} from 'protractor';

export class WorksPage {
  async navigateTo(): Promise<unknown> {
    return browser.get('/works');
  }

  getTitleText() {
    return element(by.css('app-works .page-title')).getText();
  }
}
