const makeRequired = Type => ({
  type: Type,
  required: true
});

const topology = {
  'Rectangle': {
    dimensions: {
      height: { 
        type: Number,
        required: true
      },
      width: {
        type: Number,
        required: true
      }
    },
    cellStructure: {
      coordinates: {
        coordOne: 'x',
        coordTwo: 'y'
      },
      sides: 4
    }
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