const connect = require('../../lib/connect');

describe('connect', () => {
  const options = {
    log: true
  };

  const testURI = 'testURI';

  it('logs on open', () => {

    return Promise.resolve(connect(testURI, options))
      .then(result => {
        console.log(result);
      });
  });
    
});