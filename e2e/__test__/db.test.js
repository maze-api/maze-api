const { dropCollection } = require('../db');
jest.mock('mongoose', () => {
  return {
    connection: {
      dropCollection() {
        return Promise.reject('UAintNoDaddy');
      }
    }
  };
});


describe('db', () => {
  it('if no collection found, it will throw an error', () => {
    return dropCollection().catch(error => {
      expect(error).toEqual('UAintNoDaddy');
    });
  });
});