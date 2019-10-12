
const mongoId = /^[a-f\d]{24}$/i;

const matchMongoId = {
  _id: expect.stringMatching(mongoId),
};

const matchIdAndOwner = {
  _id: expect.stringMatching(mongoId),
  owner: expect.stringMatching(mongoId),
};

module.exports = {
  mongoId,
  matchMongoId,
  matchIdAndOwner
};