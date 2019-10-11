const makeRequired = Type => ({
  type: Type,
  required: true
});

const topology = {
  'Cartesian': {
    dimensions: {
      height: makeRequired(Number),
      length: makeRequired(Number)
    },

  },
  'RightTriangle': {
    dimensions: {
      base: makeRequired(Number),
      height: makeRequired(Number)
    },
  }
};

module.exports = {
  RequiredString: makeRequired(String),
  RequiredDate: makeRequired(Date),
  RequiredNumber: makeRequired(Number),
  RequiredBoolean: makeRequired(Boolean),
  topology
};