class Cell {
  constructor(x, y) {
    this.x = x,
    this.y = y,
    this.exits = {};
  }

  makeExit(dir, x, y) {
    this.exits[dir] = { x: x, y: y };
  }

  render() {
    return {
      coords: {
        x: this.x,
        y: this.y
      },
      exits: this.exits
    };
  }

}

module.exports = {
  Cell
};