const Key = require('../key-model');
const { ObjectId } = require('mongoose').Types;

describe('Key Model', () => {

  it('valid key model', () => {

    const data = {
      _id: new ObjectId,
      active: true,
      created: new Date('10/12/14')
    };

    const key = new Key(data);
    console.log(key);
    expect(key.id).toBeDefined();
    expect(key.active).toBe(true);
    expect(key.created).toEqual(new Date('10/12/14'));
  });


});
