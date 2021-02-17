function aldousBroder(grid) {
  this.grid = grid;
  this.current = grid[Math.floor(Math.random() * 40)][Math.floor(Math.random() * 40)];
  this.current.visited = true;
  this.complete = false;

  this.run = function() {
    if(hasUnvisitedCells(this.grid)) {
      let neighbor = getRandomNeighbor(this.grid, this.current.x, this.current.y);

      while (neighbor == undefined)
        neighbor = getRandomNeighbor(this.grid, this.current.x, this.current.y);

      if(!neighbor.visited) {
        if (neighbor.x != this.current.x) {
          if (neighbor.x - this.current.x == -1) {
            this.current.carve('l');
            neighbor.carve('r');
          }
          else if (neighbor.x - this.current.x == 1) {
            this.current.carve('r');
            neighbor.carve('l');
          }
        }
        else if (neighbor.y != this.current.y) {
          if (neighbor.y - this.current.y == -1) {
            this.current.carve('t');
            neighbor.carve('b');
          }
          else if (neighbor.y - this.current.y == 1) {
            this.current.carve('b');
            neighbor.carve('t');
          }
        }

        neighbor.visited = true;
      }

      this.current = neighbor;
    }
    else 
      this.complete = true;

    fill(0, 255, 0);
    noStroke();
    rect(this.current.x * this.current.w, this.current.y * this.current.w, this.current.w, this.current.w);
  }
}

function hasUnvisitedCells(grid) {
  for(let i = 0; i < 40; i++)
    for(let j = 0; j < 40; j++)
      if(!grid[i][j].visited)
        return true;

  return false;
}

function getRandomNeighbor(grid, x, y) {
  switch (Math.floor(Math.random() * 4)) {
    case 0:
      // top
      if (y - 1 >= 0)
        return grid[x][y - 1];
      break;
    case 1:
      // right
      if (x + 1 < 40)
        return grid[x + 1][y];
      break;
    case 2:
      // bottom
      if (y + 1 < 40)
        return grid[x][y + 1];
      break;
    case 3:
      // left
      if (x - 1 >= 0)
        return grid[x - 1][y];
      break;
  }
}
