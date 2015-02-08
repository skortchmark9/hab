var canvas = document.getElementsByTagName("canvas")[0];
var ctx = canvas.getContext("2d");

var i_x = document.getElementById("i_x");
var i_y = document.getElementById("i_y");

var INTERVAL = 30;
var user;
var _args = {};

var HEIGHT = canvas.height;
var WIDTH = canvas.width;

var background_x;
var background_y;

var background_image;

function user(x, y){
    this.x = 500;
    this.y = 500;
    this.sprite;
    this.draw = function(){
        ctx.putImageData(this.sprite, this.x, this.y); 
        //console.log("drawing sprite");
    }
}


// SETTINGS

var show_information = true;

var x_min = 400;      // the minimum x-value before the background scrolls
var x_max = 800;      // the maximum x-value before the background scrolls





// MAIN

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
    resize_canvas();
    
    background_img = new Image();
    background_img.src = "img/bg_1.jpg"
    background_x = 100;
    background_y = 100;
    
    
    user = new user(0, 0);
    ctx.fillStyle = "red";
    ctx.fillRect(10, 10, 50, 50);
    user.sprite = ctx.getImageData(10,10,50,50);
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    
    var data = user.sprite.data;
    
    
    
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
            move(3);
            break;
        case 37:        // RIGHT arrow key
            move(-3);
            break;
        case 38:        // UP arrow key
            user.y -= 3;
            break;
        case 40:        // LEFT arrow key
            user.y += 3;
            break;
    }
}

function start(){
    loop = setInterval(function(){
            draw();
        }, INTERVAL
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
    update_information();
}

function draw_background(){
    ctx.drawImage(background_img, background_x, background_y, 2000, 300);
}

//////////// UTILITY FUNCTIONS

function get_color_string(r, g, b, a){
    return "rgba(" + r + "," + g + "," + b + "," + a + ")";
}

function resize_canvas(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

function update_information(){
    i_x.innerHTML = "x: " + user.x;
    i_y.innerHTML = "y: " + user.y;
}

//////////// USER MOVEMENT

function move(value){
    if (value > 0){
        // Moving in the RIGHT direction
        if (user.x >= x_max){
            background_x -= value;
        } else {
            user.x += value;
        }
        
        
    } else {
        // Moving in the lEFT direction
        if (user.x <= x_min){
            background_x += value;
        } else {
            user.x -= value;
        }
        
    }
}
