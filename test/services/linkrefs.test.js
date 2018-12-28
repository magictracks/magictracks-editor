const app = require('../../src/app');

describe('\'linkrefs\' service', () => {
  it('registered the service', () => {
    const service = app.service('linkrefs');
    expect(service).toBeTruthy();
  });
});
