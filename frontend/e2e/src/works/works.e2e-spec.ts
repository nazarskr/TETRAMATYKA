import { WorksPage } from './works.po';

describe('works page', () => {
  let page: WorksPage;

  beforeEach(async () => {
    page = new WorksPage();
    await page.navigateTo();
  });

  it('should display Works title', async () => {
    expect(await page.getTitleText()).toBe('Твори');
  });
})
