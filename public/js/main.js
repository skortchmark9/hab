var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");

var canvasSize = c.width;
var numPixels = 20;
var gridSize = canvasSize/numPixels;
var currentColor = "#ffffff";
var mouseDown = false;

// init array
var pixelArray = new Array(numPixels);
for (var i = 0; i < numPixels; i++) {
  pixelArray[i] = new Array(numPixels);
}

function drawgrid(){
  for (var x = 0.0; x < c.width; x += gridSize) {
    ctx.moveTo(x, 0);
    ctx.lineTo(x, c.height);
  }

  for (var y = 0.0; y < c.height; y += gridSize) {
    ctx.moveTo(0, y);
    ctx.lineTo(c.width, y);
  }

  ctx.strokeStyle = "#ddd";
  ctx.stroke();
}


function init(){

  for (i=1; i<=numPixels; i++){
    for (j=1; j<=numPixels; j++){
      erasePixel(i,j);
    }
  }
  drawgrid();
}

function erasePixel(pixFillx, pixFilly){

  pixelArray[pixFillx-1][pixFilly-1] = "";

  ctx.clearRect((pixFillx-1)*gridSize,(pixFilly-1)*gridSize,gridSize,gridSize);
  //ctx.moveTo((pixFillx-1)*gridSize,(pixFilly-1)*gridSize);
  //ctx.lineTo((pixFillx)*gridSize,(pixFilly)*gridSize);
  //ctx.strokeStyle = "#ddd";
  //ctx.stroke();
}

function drawPixel(pixFillx, pixFilly, color){
  color = color || currentColor;

  pixelArray[pixFillx-1][pixFilly-1] = color;

  ctx.fillStyle = color;
  ctx.clearRect((pixFillx-1)*gridSize,(pixFilly-1)*gridSize,gridSize,gridSize);
  ctx.fillRect((pixFillx-1)*gridSize,(pixFilly-1)*gridSize,gridSize,gridSize);
}



// getmouse coordinates function
function getMousePos(c, evt) {
  var rect = c.getBoundingClientRect();
  return {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top
  };
}

c.addEventListener("mousemove", function(evt) {
  var mousePos = getMousePos(c, evt);
  var mouseX = Math.ceil(mousePos.x/gridSize)
  var mouseY = Math.ceil(mousePos.y/gridSize)



  if (mouseDown && !evt.shiftKey) {
    drawPixel(mouseX, mouseY, currentColor);
  }

  if (mouseDown && evt.shiftKey) {
    erasePixel(mouseX, mouseY);
  }

  var message = 'Mouse position: ' + mouseX + ',' + mouseY;
}, false);


// mouseClick Method
document.getElementById('myCanvas').onclick = function(evt) {
  var mousePos = getMousePos(c, evt);
  var mouseX = Math.ceil(mousePos.x/gridSize);
  var mouseY = Math.ceil(mousePos.y/gridSize);

  if (evt.shiftKey) {
    erasePixel(mouseX, mouseY);
  } else {
    drawPixel(mouseX,mouseY,currentColor);
  }
  drawgrid();
}

function fill(color) {
  for (i=1; i<=numPixels; i++){
    for (j=1; j<=numPixels; j++){
      drawPixel(i,j,color);
    }
  }
  drawgrid();
}

function erase() {
  for (i=1; i<=numPixels; i++){
    for (j=1; j<=numPixels; j++){
      erasePixel(i,j);
    }
  }
  drawgrid();
}

c.onclick = function(evt) {

  var mousePos = getMousePos(c, evt);
  var mouseX = Math.ceil(mousePos.x/gridSize);
  var mouseY = Math.ceil(mousePos.y/gridSize);
  if (!evt.shiftKey) {
    drawPixel(mouseX,mouseY,currentColor);
  } else {
    erasePixel(mouseX,mouseY);
  }


  //pixelArray[mouseX-1][mouseY-1] = currentColor;

  drawgrid();
}

c.addEventListener("mousedown", function() {
  mouseDown = true;
}, false);

window.addEventListener("mouseup", function() {
  mouseDown = false;
}, false);


//Matt's imageData stuff
document.getElementById('b3').onclick = function() {
  ctx.clearRect(0,0,c.width, c.height);
  drawGridTiny();
  saveImageData();
  console.log(c.width);
  console.log(c.height);
  ctx.clearRect(0,0,c.width, c.height);
  drawgrid();
}

function saveImageData() {
  var imgData=ctx.getImageData(0,0,numPixels,numPixels);
}

function drawGridTiny(){
  for (i=0; i<numPixels; i++){
    for (j=0; j<numPixels; j++){
      console.log(pixelArray[i][j]);
      drawPixelTiny(i,j,pixelArray[i][j]);
    }
  }
  //drawgrid();
}

function drawPixelTiny(pixFillx, pixFilly, color){
  if (color!=""){//!color){
      //color constructor and create with an opacity of zero
    ctx.fillStyle = color;
    ctx.fillRect((pixFillx-1),(pixFilly-1),1,1);
  }
}

init();
