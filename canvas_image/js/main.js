var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");

var canvasSize = c.width;
var numPixels = 8;
var gridSize = canvasSize/numPixels;
var currentColor;


function main(){
    // Clear the canvas and resize it
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    resize_canvas();

    // Draw a red rectangle to the screen
    ctx.fillStyle = "red";
    ctx.fillRect(10, 10, 50, 50);

    // Grab image data from the canvas starting at pixel 10, 10
    imgData=ctx.getImageData(10,10,50,50);

    // Clear the screen again so we can draw the inverted image
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Grab the actual pixel values from the graphical object
    // image data saved in the form of [p1_red, p1_green, p1_blue, p1_alpha, p2_red....]
    data = imgData.data;

    // Iterate through all the pixels and invert them
    for (var i = 0; i < data.length; i += 4) {
        data[i]     = 225 - data[i];     // red
        data[i + 1] = 225 - data[i + 1]; // green
        data[i + 2] = 225 - data[i + 2]; // blue
    }

    // Draw the image back onto the canvas
    ctx.putImageData(imgData, 0, 0);
}

ctx.fillStyle = "#FF0010";
ctx.fillRect(0,0,c.width,c.height);


for (var x = 0.0; x < c.width; x += gridSize) {
  ctx.moveTo(x, 0);
  ctx.lineTo(x, c.height);
}

for (var y = 0.0; y < c.height; y += gridSize) {
  ctx.moveTo(0, y);
  ctx.lineTo(c.width, y);
}


function drawPixel(pixFillx, pixFilly, color){
  color = color || currentColor;

  ctx.fillStyle = color;
  ctx.fillRect((pixFillx-1)*gridSize,(pixFilly-1)*gridSize,gridSize,gridSize);
}

drawPixel(3,4,"#CC99FF");
drawPixel(3,7,"#0099FF");

ctx.strokeStyle = "#ddd";
ctx.stroke();


//ctx.clearRect(0,0,canvasSize,canvasSize);
