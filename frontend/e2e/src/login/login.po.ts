import { browser, by, element } from 'protractor';

export class LoginPage {
  public credentials = {
    email: 'someemail@mail.com',
    password: 'Somepass1234',
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
    return element(by.css('input[formcontrolname="email"]'));
  }

  getPasswordInput() {
    return element(by.css('input[formcontrolname="password"]'));
  }

  getFormError(className) {
    return element(by.css(className));
  }

  getSubmitButton() {
    return element(by.css('.green-button'));
  }

  getRegisterButton() {
    return element(by.css('[href="/auth/register"]'));
  }

  getForgotPasswordButton() {
    return element(by.css('[href="/auth/forgot-password"]'));
  }

  getActiveLanguageSelector() {
    return element(by.css('.language-selector.active'));
  }

  getInactiveLanguageSelector() {
    return element(by.css('.language-selector:not(.active)'));
  }
}
