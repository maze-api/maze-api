const { Cell } = require('./Cell');

const topChars = {
  '': '/  ',
  'ExitNW': '   ',
  'FirstTop': ' __/--\\',
  'Top': '__/--\\',
  'LastEven': '/  \\',
  'LastOdd': '/  \\',
  'LastEvenExitNW': '   \\',
  'LastOddExitNW': '   \\',
  'TopLastEven': '__/--\\',
  'TopLastOdd': '__/--\\__',
};
const botChars = {
  '': '\\__',
  'ExitS': '\\  ',
  'ExitSW': ' __',
  'ExitSExitSW': '   ',
  'Last': '\\__/',
  'LastExitS': '\\  /',
  'LastExitSW': ' __/',
  'LastExitSExitSW': '   /',
  'Bottom': '\\__/  ',
  'LastBottom': '\\__/ ',
};

class HexCell extends Cell {
  constructor(x, y) {
    super(x, y);
  }

  toString(mazeWidth, mazeHeight) {
    const topKey = [
      (this.y >= 2 * mazeHeight && this.x <= 2) ? 'FirstTop' : '',
      (this.y >= 2 * mazeHeight && this.x > 2) ? 'Top' : '',
      (this.x > mazeWidth - 1 && mazeWidth % 2 === 0) ? 'LastEven' : '',
      (this.x > mazeWidth - 1 && mazeWidth % 2 === 1) ? 'LastOdd' : '',
      (this.exits['nw']) ? 'ExitNW' : '',
    ].join('');
    const topString = topChars[topKey];

    const botKey = [
      (this.x === mazeWidth) ? 'Last' : '',
      (this.y === 1) ? 'Bottom' : '',
      (this.exits['s']) ? 'ExitS' : '',
      (this.exits['sw']) ? 'ExitSW' : '',
    ].join('');
    const botString = botChars[botKey];

    return {
      topString,
      botString,
    };
  }
}

module.exports = {
  HexCell
};