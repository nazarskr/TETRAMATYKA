import { LoginPage } from './login.po';
import {browser, protractor} from 'protractor';

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
    try {
      await page.getEmailInput().sendKeys('');
      await page.getPasswordInput().sendKeys(page.credentials.password);
      await page.getSubmitButton().click();
      const emailError = await page.getFormError('.email-required')
      expect(emailError.getText()).toContain('Це поле обов\'язкове');
    } catch(e) {console.log(e)}
  });

  it('should display incorrect email message', async () => {
    try {
      await page.getEmailInput().sendKeys('someinvalidmail');
      await page.getPasswordInput().sendKeys(page.credentials.password);
      await page.getSubmitButton().click();
      const emailError = await page.getFormError('.email-incorrect');
      expect(emailError.getText()).toContain('Введіть коректний email');
    } catch(e) {console.log(e)}
  });

  it('should display required password message', async () => {
    try {
      await page.getEmailInput().sendKeys(page.credentials.email);
      await page.getPasswordInput().sendKeys('');
      await page.getSubmitButton().click();
      const passwordError = await page.getFormError('.password-required');
      expect(passwordError.getText().getText()).toContain('Це поле обов\'язкове');
    } catch(e) {console.log(e)}
  });

  it('should display incorrect password message', async () => {
    try {
      await page.getEmailInput().sendKeys(page.credentials.email);
      await page.getPasswordInput().sendKeys('someincorrectpass');
      await page.getSubmitButton().click();
      const passwordError = await page.getFormError('.password-incorrect');
      expect(passwordError.getText())
        .toContain('Пароль має містити мінімум 8 символів, великі і малі літери та цифри');
    } catch(e) {console.log(e)}
  });

  it('should navigate to register page', async () => {
    await page.getRegisterButton().click();
    expect(await page.getTitleText()).toBe('Зареєструватись');
  });

  it('should navigate to forgot password page', async () => {
    await page.getForgotPasswordButton().click();
    expect(await page.getTitleText()).toBe('Відновити пароль');
  });

});
