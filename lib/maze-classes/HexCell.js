const { Cell } = require('./Cell');
const chalk = require('chalk');

const topChars = {
  '': '/   ',
  'ExitNW': '    ',
  'Last': '/   \\',
  'LastExitNW': '    \\',
  'Solution': `/ ${chalk.yellow('●')} `,
  'ExitNWSolution': `  ${chalk.yellow('●')} `,
  'LastSolution': `/ ${chalk.yellow('●')} \\`,
  'LastExitNWSolution': `  ${chalk.yellow('●')} \\`,
  'SolutionMazeEnd': `/ ${chalk.yellow('⭐')} `,
  'ExitNWSolutionMazeEnd': `  ${chalk.yellow('⭐')} `,
  'LastSolutionMazeEnd': `/ ${chalk.yellow('⭐')} \\`,
  'LastExitNWSolutionMazeEnd': `  ${chalk.yellow('⭐')} \\`,
};
const topCharsPlain = {
  '': '/## ',
  'ExitNW': ' ## ',
  'Last': '/## \\',
  'LastExitNW': ' ## \\',
  'Solution': `/## `,
  'ExitNWSolution': ` ## `,
  'LastSolution': `/## \\`,
  'LastExitNWSolution': ` ## \\`,
  'SolutionMazeEnd': `/## `,
  'ExitNWSolutionMazeEnd': ` ## `,
  'LastSolutionMazeEnd': `/## \\`,
  'LastExitNWSolutionMazeEnd': ` ## \\`,
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

  toString(mazeWidth, end, showSolution, showDistances) {
    const optionsStringTop = [
      (this.x > mazeWidth - 1) ? 'Last' : '',
      (this.exits['nw']) ? 'ExitNW' : '',
      (this.onSolutionPath && showSolution) ? 'Solution' : '',
      (this.x === end.x && this.y === end.y) ? 'MazeEnd' : '',
    ].join('');

    let topString = topChars[optionsStringTop];

    if(showDistances) {
      topString = topCharsPlain[optionsStringTop];
      const distanceStartIndex = topString.indexOf('#');
      const distanceTensDigit = Math.floor(Math.abs(this.distanceFromStart) / 10) % 10;
      const distanceOnesDigit = Math.abs(this.distanceFromStart) % 10;
      topString = topString.slice(0, distanceStartIndex) + distanceTensDigit + distanceOnesDigit + topString.slice(distanceStartIndex + 2);
      if(this.onSolutionPath && showSolution) topString = chalk.yellow(topString);
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