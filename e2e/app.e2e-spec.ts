import { AuthExamplePage } from './app.po';

describe('auth-example App', function() {
  let page: AuthExamplePage;

  beforeEach(() => {
    page = new AuthExamplePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
