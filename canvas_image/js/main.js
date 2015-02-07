var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");

var canvasSize = c.width;
var numPixels = 8;
var gridSize = canvasSize/numPixels;




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

// ctx.moveTo(0,0);
// ctx.lineTo(400,400);

ctx.strokeStyle = "#ddd";
ctx.stroke();

//ctx.clearRect(0,0,canvasSize,canvasSize);
