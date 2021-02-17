function depthFirstSearch(grid) {
  this.grid = grid;
  this.stack = []
  this.current = grid[0][0];
  this.stack.push(this.current);
  this.complete = false;

  this.run = function () {
    if(this.stack.length > 0) {
      this.current = this.stack.pop();

      if (hasUnvisitedNeighbor(this.grid, this.current)) {
        this.stack.push(this.current);

        let neighbor = getRandomUnvisitedNeighbor(this.grid, this.current.x, this.current.y);

        while(neighbor == undefined)
          neighbor = getRandomUnvisitedNeighbor(this.grid, this.current.x, this.current.y);

        if(neighbor.x != this.current.x) {
          if(neighbor.x - this.current.x == -1) {
            this.current.carve('l');
            neighbor.carve('r');
          }
          else if(neighbor.x - this.current.x == 1) {
            this.current.carve('r');
            neighbor.carve('l');
          }
        }
        else if(neighbor.y != this.current.y) {
          if(neighbor.y - this.current.y == -1) {
            this.current.carve('t');
            neighbor.carve('b');
          }
          else if(neighbor.y - this.current.y == 1) {
            this.current.carve('b');
            neighbor.carve('t');
          }
        }

        neighbor.visited = true;
        this.stack.push(neighbor);
      }
    }
    else 
      this.complete = true;

    fill(0, 255, 0);
    noStroke();
    rect(this.current.x * this.current.w, this.current.y * this.current.w, this.current.w, this.current.w);
  }
}

function hasUnvisitedNeighbor(grid, cell) {
  return getNeighbor(grid, cell.x, cell.y, 't') && !getNeighbor(grid, cell.x, cell.y, 't').visited ||
    getNeighbor(grid, cell.x, cell.y, 'r') && !getNeighbor(grid, cell.x, cell.y, 'r').visited ||
    getNeighbor(grid, cell.x, cell.y, 'b') && !getNeighbor(grid, cell.x, cell.y, 'b').visited ||
    getNeighbor(grid, cell.x, cell.y, 'l') && !getNeighbor(grid, cell.x, cell.y, 'l').visited;
}

function getNeighbor(grid, x, y, dir) {
  switch (dir) {
    case 't':
      if (y - 1 >= 0)
        return grid[x][y - 1];
      break;
    case 'r':
      if (x + 1 < 40)
        return grid[x + 1][y];
      break;
    case 'b':
      if (y + 1 < 40)
        return grid[x][y + 1];
      break;
    case 'l':
      if (x - 1 >= 0)
        return grid[x - 1][y];
      break;
  }
}

function getRandomUnvisitedNeighbor(grid, x, y) {
  switch (Math.floor(Math.random() * 4)) {
    case 0:
      // top
      if (y - 1 >= 0)
        if (!grid[x][y - 1].visited) {
          return grid[x][y - 1];
        }
      break;
    case 1:
      // right
      if (x + 1 < 40)
        if (!grid[x + 1][y].visited) {
          return grid[x + 1][y];
        }
      break;
    case 2:
      // bottom
      if (y + 1 < 40)
        if (!grid[x][y + 1].visited) {
          return grid[x][y + 1];
        }
      break;
    case 3:
      // left
      if (x - 1 >= 0)
        if (!grid[x - 1][y].visited) {
          return grid[x - 1][y];
        }
      break;
  }
}
