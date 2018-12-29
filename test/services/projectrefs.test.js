const app = require('../../src/app');

describe('\'projectrefs\' service', () => {
  it('registered the service', () => {
    const service = app.service('projectrefs');
    expect(service).toBeTruthy();
  });
});
