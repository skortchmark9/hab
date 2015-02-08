var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");

var canvasSize = c.width;
var numPixels = 8;
var gridSize = canvasSize/numPixels;
console.log(gridSize);


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


function drawpixel(pixFillx, pixFilly, color){
  ctx.fillStyle = color;
  ctx.fillRect((pixFillx-1)*gridSize,(pixFilly-1)*gridSize,gridSize,gridSize);
}

drawpixel(3,4,"#CC99FF");
drawpixel(3,7,"#0099FF");

ctx.strokeStyle = "#ddd";
ctx.stroke();

//Matt's getmouse coordinates function
function getMousePos(c, evt) {
  var rect = c.getBoundingClientRect();
  return {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top
  };
}

c.addEventListener("mousemove", function(evt) {
  var mousePos = getMousePos(c, evt);
  var message = 'Mouse position: ' + Math.ceil(mousePos.x/gridSize) + ',' + Math.ceil(mousePos.y/gridSize);
  console.log(message);
}, false);



//ctx.clearRect(0,0,canvasSize,canvasSize);