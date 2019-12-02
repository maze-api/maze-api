const { Cell } = require('./Cell');
const chalk = require('chalk');

const topChars = {
  '': '/   ',
  'ExitNW': '    ',
  'Last': '/   \\',
  'LastExitNW': '    \\',
  'Solution': '/ x ',
  'ExitNWSolution': '  x ',
  'LastSolution': '/ x \\',
  'LastExitNWSolution': '  x \\',
  'MazeEnd': '/ $ ',
  'ExitNWMazeEnd': '  $ ',
  'LastMazeEnd': '/ $ \\',
  'LastExitNWMazeEnd': '  $ \\',
  'MazeStart': '/ ^ ',
  'ExitNWMazeStart': '  ^ ',
  'LastMazeStart': '/ ^ \\',
  'LastExitNWMazeStart': '  ^ \\',
};
const topCharsPlain = {
  '': '/## ',
  'ExitNW': ' ## ',
  'Last': '/## \\',
  'LastExitNW': ' ## \\',
};
const botChars = {
  '': '\\___',
  'ExitS': '\\   ',
  'ExitSW': ' ___',
  'ExitSExitSW': '    ',
  'Last': '\\___/',
  'LastExitS': '\\   /',
  'LastExitSW': ' ___/',
  'LastExitSExitSW': '    /',
  'Bottom': '\\___/   ',
  'LastBottom': '\\___/   ',
};

class HexCell extends Cell {
  constructor(x, y) {
    super(x, y);
  }

  toString(mazeWidth, start, end, showSolution, showDistances) {
    const isEnd = this.x === end.x && this.y === end.y;
    const isStart = this.x === start.x && this.y === start.y;

    const optionsStringTop = [
      (this.x > mazeWidth - 1) ? 'Last' : '',
      (this.exits['nw']) ? 'ExitNW' : '',
      (this.onSolutionPath && showSolution && !isEnd && !isStart && ! showDistances) ? 'Solution' : '',
      (isEnd && !showDistances) ? 'MazeEnd' : '',
      (isStart && !showDistances) ? 'MazeStart' : '',
    ].join('');

    let topString = topChars[optionsStringTop];

    if(showDistances) {
      topString = topCharsPlain[optionsStringTop];
      const distanceStartIndex = topString.indexOf('#');
      const distanceTensDigit = Math.floor(Math.abs(this.distanceFromStart) / 10) % 10;
      const distanceOnesDigit = Math.abs(this.distanceFromStart) % 10;
      topString = topString.slice(0, distanceStartIndex) + distanceTensDigit + distanceOnesDigit + topString.slice(distanceStartIndex + 2);
      if(this.onSolutionPath) topString = chalk.yellow(topString);
    }
    
    const optionsStringBottom = [
      (this.x === mazeWidth) ? 'Last' : '',
      (this.y === 1) ? 'Bottom' : '',
      (this.exits['s']) ? 'ExitS' : '',
      (this.exits['sw']) ? 'ExitSW' : '',
    ].join('');
    const botString = botChars[optionsStringBottom];

    return { topString, botString };
  }
}

module.exports = {
  HexCell
};