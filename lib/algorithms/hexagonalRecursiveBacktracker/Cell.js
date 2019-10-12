
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

class HexCell {
  constructor(x, y) {
    this.x = x,
    this.y = y,
    this.exits = {};
    this.visited = false;
  }

  makeExit(dir, cell) {
    this.exits[dir] = { 
      x: cell.x,
      y: cell.y,
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