
const topChars = {
  default: '/ ',
  last: '/ \\',
  top: '_/-\\',
  topLast: '_/-\\_',
};
const botChars = {
  default: '\\_',
  last: '\\_/',
  bottom: '\\_/ ',
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
    const topStringTemp = (this.x === mazeWidth) ? topChars.last : topChars.default;
    let topRowChars = (this.x >= mazeWidth - 1 && mazeWidth % 2) ? topChars.topLast : topChars.top;
    if(this.x <= 2) topRowChars = ' ' + topRowChars;
    const topString = (this.y >= 2 * mazeHeight) ? topRowChars : topStringTemp;

    const botStringTemp = (this.x === mazeWidth) ? botChars.last : botChars.default;
    const botString = (this.y === 1) ? botChars.bottom : botStringTemp;

    return {
      topString,
      botString,
    };
  }

}

module.exports = {
  HexCell
};