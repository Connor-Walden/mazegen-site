function Cell(x, y, w) {
  this.x = x
  this.y = y;
  this.w = w;
  this.paths = [false, false, false, false];
  this.visited = false;

  this.draw = function () {
    if (!this.visited) {
      fill(0);
      noStroke();
      rect(this.x * this.w, this.y * this.w, this.w, this.w);
    }
    else {
      noFill();
      stroke(0, 0, 0, 255);

      for (let i = 0; i < 4; i++) {
        if (!this.paths[i]) {
          switch (i) {
            case 0: // top
              line(this.x * this.w, this.y * this.w, this.x * this.w + this.w, this.y * this.w)
              break;
            case 1: // right
              line(this.x * this.w + this.w, this.y * this.w, this.x * this.w + this.w, this.y * this.w + this.w)
              break;
            case 2: // bottom
              line(this.x * this.w, this.y * this.w + this.w, this.x * this.w + this.w, this.y * this.w + this.w)
              break;
            case 3: // left
              line(this.x * this.w, this.y * this.w, this.x * this.w, this.y * this.w + this.w)
              break;
          }
        }
      }
    }
  }

  this.carve = function (side) {
    switch (side) {
      case "t":
        this.paths[0] = true;
        break;
      case "r":
        this.paths[1] = true;
        break;
      case "b":
        this.paths[2] = true;
        break;
      case "l":
        this.paths[3] = true;
        break;
    }
  }
}