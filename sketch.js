var buttons = [];
var sliders = [];
var particles = [];
var fields = [];

// Function to fix scrollbars on the canvas
function windowResized() {
  resizeCanvas(1, 1);
  createStatic();
  setTimeout(function() {resizeCanvas(windowWidth, windowHeight);}, 20);
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  //buttons.push(new Button(20, 20, 275, 75, function(){console.log('clicked');}));
}

function mousePressed() {
  for (let i = 0; i < buttons.length; i++) {
    b = buttons[i]
    if (b.isClicked(mouseX, mouseY)) {
      b.do();
    }
  }
}

function draw() {
  background(35)
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].show();
  }
}
