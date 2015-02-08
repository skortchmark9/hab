var c_canvas = document.getElementById("creation_canvas");
var c_ctx = c_canvas.getContext("2d");
var creation = document.getElementById("creation");

var canvas_width = c_canvas.width;
var canvas_height = c_canvas.height;
//var numPixels = 20;
var grid_height = 20;
var grid_width = 30;
var block_size;

var currentColor = "#ffffff";
var mouseDown = false;

var pixelArray; // out 2d pixel array

init();
function init(){

    if (canvas_height > canvas_width){
        block_size = canvas_height / grid_height;
        c_canvas.width = block_size * grid_width;
        canvas_width = c_canvas.width;
    } else {
        block_size = canvas_width/grid_width;
        c_canvas.height = block_size * grid_height;
        canvas_height = c_canvas.height;
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
    for (var x = 0.0; x < c_canvas.width; x += block_size) {
        c_ctx.moveTo(x, 0);
        c_ctx.lineTo(x, c_canvas.height);
    }
    for (var y = 0.0; y < c_canvas.height; y += block_size) {
        c_ctx.moveTo(0, y);
        c_ctx.lineTo(c_canvas.width, y);
    }
    c_ctx.strokeStyle = "#ddd";
    c_ctx.stroke();
}

//TODO: Diagonals
// @param: x-coordinate
// @param: y-coordinate
function erasePixel(x, y){
    drawPixel(x, y, "rgba(0,0,0,0)");
    pixelArray[x][y] = "";
    c_ctx.moveTo(x * block_size, x * block_size);
    c_ctx.lineTo(x * block_size, y * block_size);
    c_ctx.strokeStyle = "#ddd";
    c_ctx.stroke();
}


//////////// EVENTS
function getMousePos(evt) {
    var rect = c_canvas.getBoundingClientRect();

    var mouseX = evt.clientX - rect.left;
    var mouseY = evt.clientY - rect.top;

    return {
        x: Math.floor(mouseX/block_size),
        y: Math.floor(mouseY/block_size)
    };
}

// DRAW BY MOVING MOUSE
// If mouse is hold down, draw with it
c_canvas.addEventListener("mousemove", function(evt) {
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
}, false);

// DRAW BY SIMPLY CLICKING
// If click occurs without mouse movement
c_canvas.onclick = function(evt) {
    var mouse_position = getMousePos(evt);
    if (mouse_position.x >= grid_width || mouse_position.y >= grid_height){
        return;
    }

    if (evt.shiftKey) {
        erasePixel(mouse_position.x, mouse_position.y);
    } else {
        drawPixel(mouse_position.x, mouse_position.y, currentColor);
    }
    drawgrid();
}

c_canvas.addEventListener("mousedown", function() {
    mouseDown = true;
}, false);

c_canvas.addEventListener("mouseup", function() {
    mouseDown = false;
}, false);

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


//creation.style.display = "none";
var open = false;
function toggle_display(val){
    $('#pose').val(val);

    if (open){
        creation.style.display = "none";
        open = false;
    }
     else {
        creation.style.display = "block";
        open = true;
    }
}

function save() {
    var pose = $('#pose').val();

    imgData_array[pose] =  c_ctx.getImageData(0, 0, c_canvas.width, c_canvas.height);

    var sprite = flatten(pixelArray);
    sprite['pose'] = pose;
    sprite['author'] = author_name;
    sprite['name'] = character_name;

    $.ajax({
        type: 'POST',
        data: {'sprite' : sprite},
        url: '/go',
        success : function(response) {
            erase_all();
            drawGridTiny();
        }, error : function(response) {
            console.log(response);
        }
    });

    // {
    //     c_ctx.clearRect(0,0, c_canvas.width, c_canvas.height);
    //     var imgData = unflatten(sprite.colors, sprite.width, sprite.height, true, 3);
    //     imgData = c_ctx.getImageData(0,0, sprite.width*3, sprite.height*3);
    //     user.sprite_list[0] = imgData;
    // }

    open = false;
    creation.style.display = "none";
}


function drawGridTiny(){
    for (i = 0; i < grid_width; i++){
        for (j = 0; j < grid_height; j++){
            var color = pixelArray[i][j];
            if (color != ""){
                c_ctx.fillStyle = color;
                c_ctx.fillRect(i, j, 1, 1);
            } else {
                c_ctx.fillStyle = "rgba(255, 255, 255, 0)";
                c_ctx.fillRect(i, j, 1, 1);
            }
        }
    }
}
