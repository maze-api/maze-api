const User = require('../user');

describe('User Model', () => {

  it('Valid user model', () => {
    const data = {
      email: 'user@user.com',
      password: 'abc123',
      roles: []
    };

    const user = new User(data);
    expect(user.email).toBe(data.email);

    expect(user.password).toBeUndefined(user.password);
    expect(user.hash).toBeDefined();
    expect(user.hash).not.toBe(data.password);
  
    expect(user.validateSync()).toBeUndefined();

    expect(user.comparePassword(data.password)).toBe(true);
    expect(user.comparePassword('bad password')).toBe(false);
  });

  it('Requires email and hash', () => {
    const data = {};
    const user = new User(data);
    const { errors } = user.validateSync();
    expect(errors.email.kind).toBe('required');
    expect(errors.hash.kind).toBe('required');
  });

});