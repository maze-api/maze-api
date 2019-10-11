const { Cell } = require('./Cell');

class Maze {
  constructor(h, l) {
    this.h = h;
    this.l = l;
    this.cells = [];

    this.active = [];
    this.visited = [];
  }

  makeCells() {

    for(let i = this.h; i > 0; i--) {
      this.cells.push([]);
      for(let t = 1; t <= this.l; t++) {
        let index = this.h - i;
        let cell = new Cell(t, i);
        this.cells[index].push(cell);
      }
    }
  }

  makeMaze() {

    let startX = Math.floor(Math.random() * this.l);
    let startY = Math.floor(Math.random() * this.y);

    let currentCell = this.findCellByCoords(this.cells.flat(), startX, startY);
    this.active.push(currentCell);
    this.visited.push(currentCell);

    this.recurseMaze();
  }

  recurseMaze() {

    while(this.active.length > 0) {
      let currentCell = this.active[this.active.length - 1];

      let newCoords = this.randomDirection(currentCell.x, currentCell.y);

      if(!newCoords) {
        this.active.pop();
      } else {

        currentCell = this.findCellByCoords(this.cells.flat(), newCoords.x, newCoords.y);
        this.active.push(currentCell);
        this.visited.push(currentCell);
      }
      this.recurseMaze();
    }

  }

  findCellByCoords(arr, x, y) {
    return arr.find(cell => {
      return cell.x === x && cell.y === y;
    });

  }


  randomDirection(x, y) {
    let dir = [];
    // x+1
    if(x + 1 <= this.l && !this.findCellByCoords(this.visited, x + 1, y)) {
      dir.push({ x: x + 1, y: y });
    }
    // x-1
    if(x - 1 > 1 && !this.findCellByCoords(this.visited, x - 1, y)) {
      dir.push({ x: x - 1, y: y });
    }

    // y+1
    if(y + 1 <= this.h && !this.findCellByCoords(this.visited, x, y + 1)) {
      dir.push({ x: x, y: y + 1 });
    }

    // y-1
    if(y - 1 > 1 && !this.findCellByCoords(this.visited, x, y - 1)) {
      dir.push({ x: x, y: y - 1 });
    }

    if(!dir[0]) {
      return false;
    }

    let random = Math.floor(Math.random() * dir.length);

    let newX = dir[random].x;
    let newY = dir[random].y;

    let fromCell = this.findCellByCoords(this.cells.flat(), x, y);
    let toCell = this.findCellByCoords(this.cells.flat(), newX, newY);


    if(newY > y) {
      fromCell.makeExit('N', newX, newY);
      toCell.makeExit('S', x, y);
    }
    if(newY < y) {
      fromCell.makeExit('S', newX, newY);
      toCell.makeExit('N', x, y);
    }
    if(newX > x) {
      fromCell.makeExit('W', newX, newY);
      toCell.makeExit('E', x, y);
    }
    if(newX < x) {
      fromCell.makeExit('E', newX, newY);
      toCell.makeExit('W', x, y);
    }


    return dir[random];
  }

  printCells() {
    let output = [];

    for(let i = 0; i < this.cells.length; i++) {
      let row = this.cells[i];
      output.push([]);
      for(let t = 0; t < row.length; t++) {
        output[i].push(row[t].render());
      }
    }


    return JSON.stringify(output);

  }

}

module.exports = {
  Maze
};