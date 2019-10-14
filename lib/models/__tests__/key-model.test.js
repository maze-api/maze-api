const Key = require('../key');

describe('Key Model', () => {
  it('valid key model', () => {

    const key = new Key();
    expect(key.toJSON()).toMatchInlineSnapshot(
      {
        _id: expect.any(Object),
        created: expect.any(Date)
      },
      `
      Object {
        "_id": Any<Object>,
        "active": true,
        "created": Any<Date>,
      }
    `);
  });
});
