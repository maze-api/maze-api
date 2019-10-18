const { HexesMaze } = require('../HexesMaze');
const { SquaresMaze } = require('../SquaresMaze');

describe('maze printing', () => {
  let options1 = {
    width: 10,
    height: 10,
    startX: 1,
    startY: 1,
    algorithm: 'Recursive Backtracker'
  };

  it('SquaresMaze printcell with solution is not equal to printcell distances', () => {
    let maze1 = new SquaresMaze(options1);

    expect(maze1.printCells(true, false)).not.toEqual(maze1.printCells(false, true));
  });

  it('HexesMaze printcell with solution is not equal to printcell distances', () => {
    let maze1 = new HexesMaze(options1);

    expect(maze1.printCells(true, false)).not.toEqual(maze1.printCells(false, true));
  });
});
