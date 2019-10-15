
class CartesianCell {
  constructor(x, y) {
    this.x = x,
    this.y = y,
    this.exits = {};
    this.visited = false;
    this.isLeaf = true;
    this.distanceFromStart = -1;
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
  CartesianCell
};