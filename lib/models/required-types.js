const makeRequired = Type => ({
  type: Type,
  required: true
});

module.exports = {
  RequiredString: makeRequired(String),
  RequiredDate: makeRequired(Date),
  RequiredNumber: makeRequired(Number),
  RequiredBoolean: makeRequired(Boolean),
};