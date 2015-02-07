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
    
    
    ctx.fillStyle = "red";
    ctx.fillRect(10, 10, 50, 50);
    
    imgData=ctx.getImageData(10,10,50,50);  // image data saved in the form of [p1_red, p1_green, p1_blue, p1_alpha, p2_red....]
    ctx.putImageData(imgData,10,70);
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    data = imgData.data;
    
    for (var i = 0; i < data.length; i += 4) {
        data[i]     = 225 - data[i];     // red
        data[i + 1] = 225 - data[i + 1]; // green
        data[i + 2] = 225 - data[i + 2]; // blue
    }
        
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