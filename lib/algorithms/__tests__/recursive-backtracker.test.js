const { Maze } = require('../recursiveBacktracker/Maze');
const { Cell } = require('../recursiveBacktracker/Cell');

describe('Recursive Backtracker', () => {

  const h = 10;
  const w = 10;
  const maze = new Maze(h, w);

  it('makes the proper sized maze with empty cell lists', () => {
    expect(maze.h).toBe(h);
    expect(maze.w).toBe(w);
    expect(maze.cells).toEqual([]);
    expect(maze.active).toEqual([]);
    expect(maze.visited).toEqual([]);
  });

  it('makes a width x height sized array of cells', () => {

    maze.makeCells();

    expect(maze.cells.length).toBe(h);
    expect(maze.cells.flat().length).toBe(h * w);

  });

  it('findCellsByCoords finds a cell object in array', () => {


    const cell = new Cell(1, 1);
    const arr = [cell];
    const rCell = maze.findCellByCoords(arr, 1, 1);
    expect(rCell.x).toBe(1);
    expect(rCell.y).toBe(1);

  });

});