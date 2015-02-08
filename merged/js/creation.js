var canvas = document.getElementById("myCanvas");
var ctx = c.getContext("2d");

var canvasSize = c.width;
//var numPixels = 20;
var grid_height = 10;
var grid_width = 20;
var block_size;

var currentColor = "#ffffff";
var mouseDown = false;

var pixelArray; // out 2d pixel array

//    ctx.clearRect((pixFillx-1)*gridSize,(pixFilly-1)*gridSize,gridSize,gridSize);
//    
//    // DIAGONAL LINES
//  //ctx.moveTo((pixFillx-1)*gridSize,(pixFilly-1)*gridSize);
//  //ctx.lineTo((pixFillx)*gridSize,(pixFilly)*gridSize);
//  //ctx.strokeStyle = "#ddd";
//  //ctx.stroke();

init();
function init(){
    if (grid_height > grid_width){
        block_size = canvasSize/grid_height;
    } else {
        block_size = canvasSize/grid_width;
    }
    
    pixelArray = new Array(grid_height);
    for (var i = 0; i < grid_height; i++) {
        pixelArray[i] = new Array(grid_width);
        for (var j = 0; j < grid_width; j++){
            pixelArray[i][j] = "";
        }
    }
    drawgrid();
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

                                                                                                                //////////// REDRAW
function redraw(){
    for (i = 0; i < numPixels; i++){
        for (j = 1; j < numPixels; j++){
            erasePixel(i,j);
        }
    }
}


                                                                                                                //////////// DRAW and ERASE
// @param: x-coordinate
// @param: y-coordinate
function erasePixel(x, y){
    pixelArray[x][y] = "";//  
    ctx.moveTo(x * gridSize, x * gridSize);
    ctx.lineTo(x * gridSize, y * gridSize);
    ctx.strokeStyle = "#ddd";
    ctx.stroke();
}

function drawPixel(x, y, color){
    color = color || currentColor;

    pixelArray[x][y] = color;

    ctx.fillStyle = color;
    ctx.clearRect(x * gridSize, y * gridSize, gridSize, gridSize);
    ctx.fillRect(x * gridSize, y * gridSize, gridSize, gridSize);
}


                                                                                                                //////////// EVENTS
function getMousePos(c, evt) {
    var rect = c.getBoundingClientRect();
    
    var mouseX = evt.clientX - rect.left;
    var mouseY = evt.clientY - rect.top;
    
    return {
        x: Math.ceil(mousePos.x/gridSize),
        y: Math.ceil(mousePos.y/gridSize);
    };
}

// DRAW BY MOVING MOUSE
// If mouse is hold down, draw with it
canvas.addEventListener("mousemove", function(evt) {
    var mouse_position = getMousePos(c, evt);

    if (mouseDown && evt.shiftKey) {
        erasePixel(mouse_position.x, mouse_position.y);
    }
    
    if (mouseDown && !evt.shiftKey) {
        drawPixel(mouse_position.x, mouse_position.y, currentColor);
    }
    redraw();
}, false);

// DRAW BY SIMPLY CLICKING
// If click occurs without mouse movement
document.getElementById('myCanvas').onclick = function(evt) {
    var mouse_position = getMousePos(c, evt);

    if (evt.shiftKey) {
        erasePixel(mouse_position.x, mouse_position.y);
    } else {
        drawPixel(mouse_position.x, mouse_position.y, currentColor);
    }
    redraw();
}

canvas.onclick = function(evt) {
    var mouse_position = getMousePos(c, evt);
    
    if (!evt.shiftKey) {
        drawPixel(mouse_position_x, mouse_position_y, currentColor);    
    } else {
        erasePixel(mouse_position_x, mouse_position_y);
    }
    redraw();
}

canvas.addEventListener("mousedown", function() {
    mouseDown = true;
}, false);

canvas.addEventListener("mouseup", function() {
    mouseDown = false;
}, false);

                                                                                                                //////////// FILL AND ERASE ALL

function fill(color) {
    for (i = 0; i < height; i++){
        for (j = 0; j <= width; j++){
            drawPixel(i, j, color);
        }
    }
    drawgrid();
}

function erase_all() {
    for (i = 0; i < numPixels; i++){
        for (j = 1; j < numPixels; j++){
            erasePixel(i,j);
        }
    }
    drawgrid();
}


                                                                                                                //////////// GET IMAGE DATA

document.getElementById('b3').onclick = function() {
    ctx.clearRect(0,0,c.width, c.height);
    drawGridTiny();
    saveImageData();
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
}

function drawPixelTiny(pixFillx, pixFilly, color){
  if (color!=""){//!color){
      //color constructor and create with an opacity of zero
    ctx.fillStyle = color;
    ctx.fillRect((pixFillx-1),(pixFilly-1),1,1);
  }
}