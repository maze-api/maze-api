const { Cell } = require('./Cell');
const chalk = require('chalk');

const topChars = {
  '': '│   ',
  'ExitW': '    ',
  'ExitWOverpass': ' └─┘',
  'Solution': `│ ${chalk.yellow('●')} `,
  'ExitWSolution': `  ${chalk.yellow('●')} `,
  'ExitWOverpassSolution': `${chalk.yellow(' └─┘')}`,
  'MazeEnd': `│ ${chalk.green('⚑')} `,
  'ExitWMazeEnd': `  ${chalk.green('⚑')} `,
  'MazeStart': `│ ${chalk.red('★')} `,
  'ExitWMazeStart': `  ${chalk.red('★')} `,
};
const topCharsPlain = {
  '': '│   ',
  'ExitW': '    ',
  'ExitWOverpass': ' └─┘',
};
const botChars = {
  '': '│▁▁▁',
  'ExitS': '│   ',
  'ExitW': ' ▁▁▁',
  'ExitSExitW': '    ',
  'ExitSExitWOverpass': ' ┌─┐',
  'Solution': '│▁▁▁',
  'ExitSSolution': '│   ',
  'ExitWSolution': ' ▁▁▁',
  'ExitSExitWSolution': '    ',
  'ExitSExitWOverpassSolution': `${chalk.yellow(' ┌─┐')}`,
};

class SquareCell extends Cell {
  constructor(x, y) {
    super(x, y);
  }

  toString(start, end, showSolution = true, showDistances = false) {
    const isEnd = this.x === end.x && this.y === end.y;
    const isStart = this.x === start.x && this.y === start.y;

    const optionsStringTop = [
      (this.exits['w']) ? 'ExitW' : '',
      (this.overpass) ? 'Overpass' : '',
      (this.onSolutionPath && showSolution && !isEnd && !isStart && ! showDistances) ? 'Solution' : '',
      (isEnd && !showDistances) ? 'MazeEnd' : '',
      (isStart && !showDistances) ? 'MazeStart' : '',
    ].join('');
    
    let topString = topChars[optionsStringTop];

    if(showDistances) {
      topString = topCharsPlain[optionsStringTop];
      const distanceTensDigit = Math.floor(Math.abs(this.distanceFromStart) / 10) % 10;
      const distanceOnesDigit = Math.abs(this.distanceFromStart) % 10;
      topString = topString.slice(0, 1) + distanceTensDigit + distanceOnesDigit + topString.slice(3, 4);
      if(this.onSolutionPath) topString = chalk.yellow(topString);
    }
    
    const optionsStringBottom = [
      (this.exits['s']) ? 'ExitS' : '',
      (this.exits['w']) ? 'ExitW' : '',
      (this.overpass) ? 'Overpass' : '',
      (this.onSolutionPath && showSolution) ? 'Solution' : '',
    ].join('');
    const botString = botChars[optionsStringBottom];
    
    return { topString, botString };
  }
}

module.exports = {
  SquareCell
};