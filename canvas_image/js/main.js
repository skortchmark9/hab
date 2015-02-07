// branch_test!!

var canvas = document.getElementsByTagName("canvas")[0];
var ctx = canvas.getContext("2d");

var FRAME_RATE = 300;
var user;
var imgData;
var data;

var tti = tti || (function(){
    
    var _args = {};
    
    return {
        init : function(Args) {
            _args = Args;
        },
        start : function(){
            curr_index = _args[0];
            main();
        }
    };
}());

function main(){
    // Clear the canvas and resize it
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    resize_canvas();
    
    // Draw a red rectangle to the screen 
    ctx.fillStyle = "red";
    ctx.fillRect(10, 10, 50, 50);
    
    // Grab image data from the canvas starting at pixel 10, 10
    // This is the object that we draw onto the screen
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
    
    //start();
}

function resize_canvas(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

function start(){
    loop = setInterval(function(){
            draw();
        }, FRAME_RATE
    )
}

function draw(){
    
    
}