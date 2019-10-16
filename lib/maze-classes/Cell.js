
class Cell {
  constructor(x, y) {
    this.x = x,
    this.y = y,
    this.exits = {};
    this.visited = false;
    this.isLeaf = true;
    this.distanceFromStart = -1;
    this.overpass = false;
    this.overpassDistanceFromStart = -1;
    this.onSolutionPath = false;
  }

  makeExit(dir, cell) {
    this.exits[dir] = { 
      x: cell.x,
      y: cell.y,
    };
    if(Object.keys(this.exits).length > 1) {
      this.isLeaf = false;
    }
  }
}

module.exports = {
  Cell
};