import { LoginPage } from './login.po';

describe('Login page', () => {
  let page: LoginPage;

  beforeEach(async () => {
    page = new LoginPage();
    await page.navigateTo();
  });

  it('should display login title', async () => {
    expect(await page.getTitleText()).toBe('Login');
  });

});
