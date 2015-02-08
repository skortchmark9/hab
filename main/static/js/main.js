// branch_test!!

var canvas = document.getElementsByTagName("canvas")[0];
var ctx = canvas.getContext("2d");

var FRAME_RATE = 30;
var user;
var _args = {};

function user(x, y){
    this.x = 100;
    this.y = 100;
    this.sprite;
    this.draw = function(){
        ctx.putImageData(this.sprite, this.x, this.y); 
        //console.log("drawing sprite");
    }
}


var hab = hab || (function(){
    
    
    return {
        init : function(Args) {
            _args = Args;
        },
        start : function(){
            main();
        }
    };
}());



function main(){
    // Clear the canvas and resize it
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    resize_canvas();
    
    user = new user(0, 0);
    ctx.fillStyle = "red";
    ctx.fillRect(10, 10, 50, 50);
    user.sprite = ctx.getImageData(10,10,50,50);
    
    var data = user.sprite.data;
    
    console.log(data[0]);
    console.log(data[1]);
    console.log(data[2]);
    console.log(data[3]);
    
    
    init_keyboardevents();
    start();
}

function init_keyboardevents(){
    window.addEventListener('keydown', key_events, false);
}

function key_events(event){
    var key_code = event.keyCode;
    
    switch (key_code){
        // PAUSE FUNCTIONALITY TODO
        case 71:        // "g" - go
            start();
            break;
        case 83:        // "s" - stop
            stop();
            break;
            
            
        case 39:        // RIGHT arrow key
            user.x += 1;
            console.log(user.x);
            break;
        case 37:        // RIGHT arrow key
            user.x -= 1;
            console.log(user.x);
            break;
        case 38:        // UP arrow key
            user.y -= 1;
            console.log(user.x);
            break;
        case 40:        // LEFT arrow key
            user.y += 1;
            console.log(user.x);
            break;
    }
}

function start(){
    loop = setInterval(function(){
            draw();
        }, FRAME_RATE
    )
}

function stop(){
    clearInterval(loop);
}

//////////// DRAWING

function draw(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    resize_canvas();
    draw_background();
    user.draw();
}

function draw_background(){
}

//////////// UTILITY FUNCTIONS

function get_color_string(r, g, b, a){
    return "rgba(" + r + "," + g + "," + b + "," + a + ")";
}

function resize_canvas(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}