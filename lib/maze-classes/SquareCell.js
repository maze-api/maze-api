const { Cell } = require('./Cell');
const chalk = require('chalk');

const topChars = {
  '': '│   ',
  'ExitW': '    ',
  'ExitWOverpass': '----',
  'Solution': `│ ${chalk.yellow('●')} `,
  'ExitWSolution': `  ${chalk.yellow('●')} `,
  'ExitWOverpassSolution': `${chalk.yellow('----')}`,
};
const botChars = {
  '': '│▁▁▁',
  'ExitS': '│   ',
  'ExitW': ' ▁▁▁',
  'ExitSExitW': '    ',
  'ExitSExitWOverpass': '====',
  'Solution': '│▁▁▁',
  'ExitSSolution': '│   ',
  'ExitWSolution': ' ▁▁▁',
  'ExitSExitWSolution': '    ',
  'ExitSExitWOverpassSolution': `${chalk.yellow('====')}`,
};

class SquareCell extends Cell {
  constructor(x, y) {
    super(x, y);
  }

  toString(showSolution) {
    const optionsStringTop = [
      (this.exits['w']) ? 'ExitW' : '',
      (this.overpass) ? 'Overpass' : '',
      (this.onSolutionPath && showSolution) ? 'Solution' : '',
    ].join('');
    const topString = topChars[optionsStringTop];
    
    const optionsStringBottom = [
      (this.exits['s']) ? 'ExitS' : '',
      (this.exits['w']) ? 'ExitW' : '',
      (this.overpass) ? 'Overpass' : '',
    ].join('');
    const botString = botChars[optionsStringBottom];

    return {
      topString,
      botString,
    };
  }
}

module.exports = {
  SquareCell
};