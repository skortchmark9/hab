var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var canvas_width = canvas.width;
var canvas_height = canvas.height;
//var numPixels = 20;
var grid_height = 5;
var grid_width = 10;
var block_size;

var currentColor = "#ffffff";
var mouseDown = false;

var pixelArray; // out 2d pixel array

init();
function init(){
    if (canvas_height > canvas_width){
        block_size = canvas_height / grid_height;
        canvas.width = block_size * grid_width;
        canvas_width = canvas.width;
    } else {
        block_size = canvas_width/grid_width;   
        canvas.height = block_size * grid_height;
        canvas_height = canvas.height;
    }
    
    pixelArray = new Array(grid_width);
    for (var i = 0; i < grid_width; i++) {
        pixelArray[i] = new Array(grid_height);
        for (var j = 0; j < grid_height; j++){
            pixelArray[i][j] = "";
        }
    }
    
    drawgrid();
}



function drawgrid(){
    for (var x = 0.0; x < canvas.width; x += block_size) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
    }
    for (var y = 0.0; y < canvas.height; y += block_size) {
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
    }
    ctx.strokeStyle = "#ddd";
    ctx.stroke();
}

                                                                                                                //////////// REDRAW
function redraw(){
    for (i = 0; i < grid_width; i++){
        for (j = 0; j < grid_height; j++){

        }
    }
}


                                                                                                                //////////// DRAW and ERASE
// @param: x-coordinate
// @param: y-coordinate
function erasePixel(x, y){
    pixelArray[x][y] = "";
    ctx.moveTo(x * block_size, x * block_size);
    ctx.lineTo(x * block_size, y * block_size);
    ctx.strokeStyle = "#ddd";
    ctx.stroke();
}

function drawPixel(x, y, color){
    color = color || currentColor;

//    console.log("x: " + x);
//    console.log("y: " + y);
    
//    console.log(color);
    
    pixelArray[x][y] = color;

    ctx.fillStyle = color;
    ctx.clearRect(x * block_size, y * block_size, block_size, block_size);
    ctx.fillRect(x * block_size, y * block_size, block_size, block_size);
}
//////////// EVENTS
function getMousePos(evt) {
    var rect = canvas.getBoundingClientRect();
    
    var mouseX = evt.clientX - rect.left;
    var mouseY = evt.clientY - rect.top;
    
//    console.log("mouseX: " + mouseX);
//    console.log("mouseY: " + mouseY);
    
    return {
        x: Math.floor(mouseX/block_size),
        y: Math.floor(mouseY/block_size)
    };
}

// DRAW BY MOVING MOUSE
// If mouse is hold down, draw with it
canvas.addEventListener("mousemove", function(evt) {
    var mouse_position = getMousePos(evt);
    if (mouse_position.x >= grid_width || mouse_position.y >= grid_height){
        return;
    }
    
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
    var mouse_position = getMousePos(evt);
    if (mouse_position.x >= grid_width || mouse_position.y >= grid_height){
        return;
    }

    if (evt.shiftKey) {
        erasePixel(mouse_position.x, mouse_position.y);
    } else {
        drawPixel(mouse_position.x, mouse_position.y, currentColor);
    }
    redraw();
}

canvas.onclick = function(evt) {
    var mouse_position = getMousePos(evt);
    if (mouse_position.x >= grid_width || mouse_position.y >= grid_height){
        return;
    }
    
    if (!evt.shiftKey) {
        drawPixel(mouse_position.x, mouse_position.y, currentColor);    
    } else {
        erasePixel(mouse_position.x, mouse_position.y);
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
    for (i = 0; i < grid_width; i++){
        for (j = 0; j < grid_height; j++){
            drawPixel(i, j, color);
        }
    }
    drawgrid();
}

function erase_all() {
    for (i = 0; i < grid_width; i++){
        for (j = 0; j < grid_height; j++){
            erasePixel(i,j);
        }
    }
    drawgrid();
}


                                                                                                                //////////// GET IMAGE DATA

document.getElementById('b3').onclick = function() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawGridTiny();
    saveImageData();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawgrid();
}

function saveImageData() {
    var imgData=ctx.getImageData(0, 0, canvas_width, canvas_height);
}

function drawGridTiny(){
    for (i = 0; i < grid_width; i++){
        for (j = 0; j < grid_height; j++){
//            console.log(i);
//            console.log(j);
//            console.log(pixelArray[i][j]);
//            drawPixelTiny(i, j, pixelArray[i][j]);
            var color = pixelArray[i][j];
            if (color != ""){
                ctx.fillStyle = color;
                ctx.fillRect(i, j, 1, 1);
            } else {
                ctx.fillStyle = "rgba(255, 255, 255, 0)";
                ctx.fillRect(i, j, 1, 1);
            }
        }
    }
}

//function drawPixelTiny(pixFillx, pixFilly, color){
//  if (color != ""){
//      //color constructor and create with an opacity of zero
//      ctx.fillStyle = color;
//      ctx.fillRect((pixFillx-1),(pixFilly-1),1,1);
//  }
//}