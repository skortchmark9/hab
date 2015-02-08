var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");

var canvasSize = c.width;
var numPixels = 8;
var gridSize = canvasSize/numPixels;

var colors = ["#33CC33","#0099FF","#CC99FF","#FF0010"];
var IND = 0;

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
  var mouseX = Math.ceil(mousePos.x/gridSize)
  var mouseY = Math.ceil(mousePos.y/gridSize)
  var message = 'Mouse position: ' + mouseX + ',' + mouseY;
  console.log(message);
}, false);
//Matt's mouseClick Method
document.getElementById('myCanvas').onclick = function(evt) {
  var mousePos = getMousePos(c, evt);
  var mouseX = Math.ceil(mousePos.x/gridSize)
  var mouseY = Math.ceil(mousePos.y/gridSize)
  IND = (IND+1)%colors.length;
  drawpixel(mouseX,mouseY,colors[IND]);
  console.log('click!')
}



//ctx.clearRect(0,0,canvasSize,canvasSize);