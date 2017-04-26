import { POCFrontEndPage } from './app.po';

describe('poc-front-end App', () => {
  let page: POCFrontEndPage;

  beforeEach(() => {
    page = new POCFrontEndPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
