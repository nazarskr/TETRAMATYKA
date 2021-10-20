import { LoginPage } from './login.po';
import {browser} from 'protractor';

describe('Login page', () => {
  let page: LoginPage;

  beforeEach(async () => {
    page = new LoginPage();
    await page.navigateTo();
  });

  it('should display UA login title', async () => {
    expect(await page.getTitleText()).toBe('Увійти');
  });

  it('should display EN login title', async () => {
    page.getInactiveLanguageSelector().click();
    expect(await page.getTitleText()).toBe('Login');
  });

  it('form should be valid', async () => {
    page.getEmailInput().sendKeys(page.credentials.email);
    page.getPasswordInput().sendKeys(page.credentials.password);
    const formClass = page.getForm().getAttribute('class');
    expect(await formClass).toContain('ng-valid');
  });

  it('form should be invalid', async () => {
    page.getEmailInput().sendKeys('');
    page.getPasswordInput().sendKeys('');
    const formClass = page.getForm().getAttribute('class');
    expect(await formClass).toContain('ng-invalid');
  });

  it('should display required email message', async () => {
    page.getEmailInput().sendKeys('');
    page.getPasswordInput().sendKeys(page.credentials.password);
    page.getSubmitButton().click();
    const emailError = await page.getFormError('.email-required');
    expect(emailError.getText()).toContain('Це поле обов\'язкове');
  });

  it('should display incorrect email message', async () => {
    page.getEmailInput().sendKeys('someinvalidmail');
    page.getPasswordInput().sendKeys(page.credentials.password);
    page.getSubmitButton().click();
    const emailError = await page.getFormError('.email-incorrect');
    expect(emailError.getText()).toContain('Введіть коректний email');
  });

  it('should display required password message', async () => {
    page.getEmailInput().sendKeys(page.credentials.email);
    page.getPasswordInput().sendKeys('');
    page.getSubmitButton().click();
    const passwordError = await page.getFormError('.password-required');
    expect(passwordError.getText()).toContain('Це поле обов\'язкове');
  });

  it('should display incorrect password message', async () => {
    page.getEmailInput().sendKeys(page.credentials.email);
    page.getPasswordInput().sendKeys('someincorrectpass');
    page.getSubmitButton().click();
    const passwordError = await page.getFormError('.password-incorrect');
    expect(passwordError.getText()).toContain('Пароль має містити мінімум 8 символів, великі і малі літери та цифри');
  });

  // it('should navigate to register page', async () => {
  //   page.getRegisterButton().click();
  //   expect(await page.getTitleText()).toBe('Зареєструватись');
  // });

  // it('should navigate to forgot password page', async () => {
  //   page.getForgotPasswordButton().click();
  //   expect(await page.getTitleText()).toBe('Відновити пароль');
  // });

});
