const { CartesianCell } = require('./CartesianCell');

const topChars = {
  '': '|  ',
  'ExitW': '   ',
};
const botChars = {
  '': '|__',
  'ExitS': '|  ',
  'ExitW': ' __',
  'ExitSExitW': '   ',
};

class SquareCartesianCell extends CartesianCell {
  constructor(x, y) {
    super(x, y);
  }

  toString() {
    const optionsStringTop = [
      (this.exits['w']) ? 'ExitW' : '',
    ].join('');
    const topString = topChars[optionsStringTop];

    const optionsStringBottom = [
      (this.exits['s']) ? 'ExitS' : '',
      (this.exits['w']) ? 'ExitW' : '',
    ].join('');
    const botString = botChars[optionsStringBottom];

    return {
      topString,
      botString,
    };
  }
}

module.exports = {
  SquareCartesianCell
};