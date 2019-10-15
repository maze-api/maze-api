const { signupUser } = require('../data-helpers');



describe('db', () => {
  it('if database is not connected, it will throw a 500 error', () => {
    return signupUser()
      .expect(500)
      .then(err => {
        expect(err).toBe('database not available');
      });
  });
});