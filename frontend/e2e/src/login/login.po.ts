import { browser, by, element } from 'protractor';

export class LoginPage {
  private credentials = {
    username: 'someemail@mail.com',
    password: 'somepassword',
  };

  navigateTo() {
    return browser.get('/auth/login');
  }

  getTitleText() {
    return element(by.css('app-login .form-title')).getText();
  }

  getForm() {
    return element(by.css('form'));
  }

  getEmailInput() {
    return element(by.name('email'));
  }

  getPasswordInput() {
    return element(by.name('password'));
  }

  getInputErrorText() {
    return element(by.css('mat-error')).getText();
  }
}
