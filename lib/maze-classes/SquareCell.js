const { Cell } = require('./Cell');
const chalk = require('chalk');

const topChars = {
  '': '│   ',
  'ExitW': '    ',
  'ExitWOverpass': ' └─┘',
  'Solution': `│ ${chalk.yellow('●')} `,
  'ExitWSolution': `  ${chalk.yellow('●')} `,
  'ExitWOverpassSolution': `${chalk.yellow(' └─┘')}`,
};
const topCharsPlain = {
  '': '│   ',
  'ExitW': '    ',
  'ExitWOverpass': ' └─┘',
  'Solution': '│ ● ',
  'ExitWSolution': '  ● ',
  'ExitWOverpassSolution': ' └─┘',
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

  toString(showSolution = true, showDistances = false) {
    const optionsStringTop = [
      (this.exits['w']) ? 'ExitW' : '',
      (this.overpass) ? 'Overpass' : '',
      (this.onSolutionPath && showSolution) ? 'Solution' : '',
    ].join('');
    let topString = topChars[optionsStringTop];

    if(showDistances) {
      topString = topCharsPlain[optionsStringTop];
      topString = topString.slice(0, 1) + (Math.floor((this.distanceFromStart % 100) / 10)) + (this.distanceFromStart % 10) + topString.slice(3, 4);
      if(this.onSolutionPath && showSolution) topString = chalk.yellow(topString);
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