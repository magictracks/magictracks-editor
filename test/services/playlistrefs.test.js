const app = require('../../src/app');

describe('\'playlistrefs\' service', () => {
  it('registered the service', () => {
    const service = app.service('playlistrefs');
    expect(service).toBeTruthy();
  });
});
