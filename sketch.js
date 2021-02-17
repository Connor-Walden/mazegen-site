let cells = [];
let dfs = null;
let ab = null;
let slider;
let slider2;

let state = "ab";
let speed = 1
let button;

let complete = false;
let buttonCreated = false;

function setup() {
  // put setup code here
  createCanvas(400, 400);

  slider = createSlider(0, 1, 0, 1);
  slider.position(window.outerWidth / 2 - 135, 410);
  slider.style('width', '80px');

  slider2 = createSlider(1, 10, 1, 1);
  slider2.position(window.outerWidth / 2, 410);
  slider2.style('width', '80px');

  button = document.createElement('a');
  button.download = 'maze';
  button.textContent = 'Download maze here!';
  button.style = "width: 150px; height: 60px; background-color: blue; color: white;margin: 0 0 0 250px; padding: 15px;"

  button.addEventListener('click', () => {
    button.href = canvas.toDataURL('image/png');
    URL.revokeObjectURL(button.href);
  });

  reset();
}

function draw() {
  // put drawing code here
  background(200);
  slider.position(window.outerWidth / 2 - 135, 410);
  slider2.position(window.outerWidth / 2, 410);

  for (let i = 0; i < 40; i++) {
    for (let j = 0; j < 40; j++) {
      cells[i][j].draw();
    }
  }

  for(let k = 0; k < speed; k++) {
    switch(state) {
      case "dfs":
        if (!dfs.complete)
          dfs.run();
        else
          complete = true;
        break;
      case "ab": 
        if (!ab.complete)
          ab.run();
        else
          complete = true;
        break;
    }
  }

  if(state == "dfs" && slider.value() == 1) {
    state = 'ab';
    reset();
  }
  else if(state == 'ab' && slider.value() == 0) {
    state = 'dfs';
    reset();
  }

  speed = slider2.value();

  if(complete && !buttonCreated) {
    document.body.append(button);
    buttonCreated = true;
  }
}

function reset() {
  for (let i = 0; i < 40; i++) {
    cells[i] = [];
    for (let j = 0; j < 40; j++) {
      cells[i][j] = new Cell(i, j, 10);
    }
  }

  if(state === "dfs") dfs = new depthFirstSearch(cells);
  if(state === 'ab' ) ab = new aldousBroder(cells);
  complete = buttonCreated = false;
  button.remove();
}