import { CmuCalculatePage } from './app.po';

describe('cmu-calculate App', () => {
  let page: CmuCalculatePage;

  beforeEach(() => {
    page = new CmuCalculatePage();
  });

  it('should display welcome message', done => {
    page.navigateTo();
    page.getParagraphText()
      .then(msg => expect(msg).toEqual('Welcome to app!!'))
      .then(done, done.fail);
  });
});
