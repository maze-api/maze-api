
const topChars = {
  '': '/ ',
  'ExitNW': '  ',
  'FirstTop': ' _/-\\',
  'Top': '_/-\\',
  'LastEven': '/ \\',
  'LastOdd': '/ \\',
  'LastEvenExitNW': '  \\',
  'LastOddExitNW': '  \\',
  'TopLastEven': '_/-\\',
  'TopLastOdd': '_/-\\_',
};
const botChars = {
  '': '\\_',
  'ExitS': '\\ ',
  'ExitSW': ' _',
  'ExitSExitSW': '  ',
  'Last': '\\_/',
  'LastExitS': '\\ /',
  'LastExitSW': ' _/',
  'LastExitSExitSW': '  /',
  'Bottom': '\\_/ ',
  'LastBottom': '\\_/ ',
};

const directions = {
  n: { x: 0, y: +2 },
  s: { x: 0, y: -2 },
  ne: { x: +1, y: +1 }, 
  se: { x: +1, y: -1 },
  nw: { x: -1, y: +1 }, 
  sw: { x: -1, y: -1 },
};
// const oppositeDirections = {
//   n: 's',
//   s: 'n',
//   ne: 'sw',
//   se: 'nw',
//   nw: 'se',
//   sw: 'ne',
// };

class HexCell {
  constructor(x, y) {
    this.x = x,
    this.y = y,
    this.exits = {};
  }

  makeExit(dir) {
    if(!directions[dir]) throw `Exception: '${dir}' is not a valid direction in the hexagonal maze`;

    this.exits[dir] = { 
      x: this.x + directions[dir].x,
      y: this.y + directions[dir].y,
    };
  }

  render() {
    return {
      coords: {
        x: this.x,
        y: this.y
      },
      exits: this.exits
    };
  }

  toString(mazeWidth, mazeHeight) {
    const topKey = [
      (this.y >= 2 * mazeHeight && this.x <= 2) ? 'FirstTop' : '',
      (this.y >= 2 * mazeHeight && this.x > 2) ? 'Top' : '',
      (this.x > mazeWidth - 1 && mazeWidth % 2 === 0) ? 'LastEven' : '',
      (this.x > mazeWidth - 1 && mazeWidth % 2 === 1) ? 'LastOdd' : '',
    ].join('');
    const topString = topChars[topKey];

    const botKey = [
      (this.x === mazeWidth) ? 'Last' : '',
      (this.y === 1) ? 'Bottom' : '',
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