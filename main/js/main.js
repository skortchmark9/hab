var canvas = document.getElementsByTagName("canvas")[0];
var ctx = canvas.getContext("2d");

// Information to be printed out
var i_x = document.getElementById("i_x");
var i_y = document.getElementById("i_y");
var i_movement = document.getElementById("i_movement")

var user;
var keys = [];

var HEIGHT = canvas.height;
var WIDTH = canvas.width;

var background_image;
var background_x;
var background_y;

function user(x, y){
    this.x = x;
    this.y = y;
    this.velX = 0;
    this.velY = 0;
    this.speed = 3;
    
    this.sprite;
    
    this.sprite_list = new Array();
//    this.sprite_resting;
//    this.sprite_jumping;
    
    this.walking = false;
    this.jumping = false;
    this.landed = true;
    
    this.walking_loop;
    this.walking_frame = 0;
    this.walking_sprite_list = new Array();
    
    this.draw = function(){
        ctx.putImageData(this.sprite, this.x, this.y);
    }
    
    // TODO
    // custom animations that are binded to keystrokes
//    this.animation_set = {};
//    this.add_animation = function(name, animation){
//        this.animation_set[name] = animation;    
//    }
}

// @param frames - an array of imgData
//function animation(frames){
//    this.frames = frames;
//}


// SETTINGS

var show_information = true;

var x_min = 400;                // the minimum x-value before the background scrolls
var x_max = 800;                // the maximum x-value before the background scrolls
var ground_level = 800;         // ground level measured from the top of the page
var friction = 0.8;
var gravity = 0.3;
var walking_interval = 500;     // the delay before the frame for a walking animation changes


                                                                                                                //////////// MAIN

var _args = {};
var hab = hab || (function(){
    return {
        init : function(Args) {
            // Acquire args from HTML if necessary
            _args = Args;
        },
        start : function(){
            main();
            // BEGIN GAMELOOP
            (function() {
                var requestAnimationFrame = window.requestAnimationFrame || 
                                            window.mozRequestAnimationFrame || 
                                            window.webkitRequestAnimationFrame || 
                                            window.msRequestAnimationFrame;
                window.requestAnimationFrame = requestAnimationFrame;
            })();
        }
    };
}());

function main(){
    // Clear the canvas and resize it
    resize_canvas();
    
    // TODO
    // Modularize this later
    background_img = new Image();
    background_img.src = "img/bg_1.jpg"
    background_x = 100;
    background_y = 100;
    
    user = new user(200, ground_level);
    
    // push sprites for the character to use
    // 0 - resting sprite
    // 1 - jumping sprite
    user.sprite_list.push(color_to_imgdata("blue", 50, 50));
    user.sprite_list.push(color_to_imgdata("red", 50, 50));
    
    user.walking_sprite_list.push(color_to_imgdata("green", 50, 50));
    user.walking_sprite_list.push(color_to_imgdata("yellow", 50, 50));
    
    user.sprite = user.sprite_list[0];
//    user.sprite = url_to_imgdata("img/sprite_1.png", 50, 50); // contamination by cross-origin data
    
    init_keyboardevents();
    
    window.addEventListener("load", function(){
        update();
    });
}

                                                                                                                //////////// DRAWING and UPDATE

function update(){
    update_movement();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    resize_canvas();
    
    draw_background();
    user.draw();
    // TODO
    // draw_foreground();
    
    // Update information to draw to the screen for debugging
    update_information();
    requestAnimationFrame(update);
}

function draw_background(){
    ctx.drawImage(background_img, background_x, background_y, 2000, 300);
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
            background_x -= value;
        } else {
            user.x += value;
        }
    }
}

function update_movement(){
    if (keys[38] || keys[32]) {
        // up arrow or space
        if(!user.jumping){
            user.jumping = true;
            user.started_jumping = true;
            user.velY = -user.speed*2;
            user.sprite = user.sprite_list[1];
            console.log("Jumping");
            i_movement.innerHTML = "movement: Jumping"; 
        }
    }
    
    if (keys[39]) {
        //console.log("right");
        // right arrow
        if (!user.walking){
            user.walking = true;
            console.log("Moving Right");
            i_movement.innerHTML = "movement: Moving Right";
        }
        
//        if (!user.jumping){
//            user.walking_loop = setInterval(function(){
//                    next_walking_frame();
//                }, walking_interval
//            )
//        }
        
        if (user.velX < user.speed) {                         
            user.velX++;                  
        }
    }
    if (keys[37]) {   
        //console.log("left");              
        // left arrow
        if (!user.walking){
            user.walking = true;
            console.log("Moving Left");
            i_movement.innerHTML = "movement: Moving Left"; 
        }
                 
        if (user.velX > -user.speed) {
            user.velX--;
        }
    }
    
    // The character is not moving
    if (!keys[39] && !keys[37] && !user.jumping){
        if (user.walking){
            user.walking = false;
            console.log("Resting");
            i_movement.innerHTML = "movement: Resting"; 
            user.sprite = user.sprite_list[1];
        }
    }
    
    user.velX *= friction;
    
    if (user.jumping){
        user.velY += gravity;
    }
    
//    console.log("before moving: " + user.y);
//    console.log("current velocity: " + user.velY);
    move(user.velX);
    
//    if (user.y != ground_level){
//        console.log("Adding velocity");
//    }
    
    user.y += user.velY;
//    console.log(user.y);
    
    // ground_level + gravity 
    if (user.y > ground_level) {
        user.y = ground_level;
        user.jumping = false;
        if (!user.landed){
            user.landed = true;
        }
        
        // Return to resting sprite
//        console.log("Landed");
        user.sprite = user.sprite_list[0];
    }
    
//    if (user.landed){
//        
//    }
    
}

function next_walking_frame(){
    user.walking_frame = user.walking_frame + 1 % user.walking_sprite_list.length;
    user.sprite = user.walking_sprite_list[user.walking_frame];
}

                                                                                                                //////////// IMGDATA

// call these at the start of main
// Setting height or width to -1 creates a sprite with the original height/width
// @return returns an imgdata object given a url
function url_to_imgdata(url, height, width){
    var imgData;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    var img = new Image();
    img.src = url;
    
    img.onload = function(){
        if (height == -1 || width == -1){
            ctx.drawImage(img, 0, 0);
            imgData = ctx.getImageData(0, 0, img.width, img.height);
        } else {
            ctx.drawImage(img, 0, 0, width, height);
            imgData = ctx.getImageData(0, 0, width, height);
        }
    
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        return imgData;
    }
}

// @param: color is a string for a particular color, eg. red
function color_to_imgdata(color, width, height){
    var imgData;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, width, height);
    imgData = ctx.getImageData(0, 0, width, height);
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    return imgData;
}



                                                                                                                //////////// UTILITY FUNCTIONS

function init_keyboardevents(){
//    window.addEventListener('keydown', key_events, false);
    document.body.addEventListener("keydown", function(e) {
        keys[e.keyCode] = true;
    });
    document.body.addEventListener("keyup", function(e) {
        keys[e.keyCode] = false;
    });
}

function resize_canvas(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

function update_information(){
    i_x.innerHTML = "x: " + user.x;
    i_y.innerHTML = "y: " + user.y;
}

function get_color_string(r, g, b, a){
    return "rgba(" + r + "," + g + "," + b + "," + a + ")";
}