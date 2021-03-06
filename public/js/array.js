function unflatten(array, width, height, environment, scale) {
    console.log(array);
    console.log(width);
    console.log(height);
    var newArray = new Array(width);
    console.log('width', width);
    for(var col = 0; col < width; col++) {
        newArray[col] = new Array(height);
        for(var row = 0; row < width; row++) {
            drawPixel(col, row, array[(col * height) + row], environment, scale);
        }
    }
    return newArray;
}


function flatten(array) {
    var height = array[0].length;
    var width = array.length;
    newArray = [].concat.apply([], array);
    return {width : width, height : height, colors : newArray}
}

function drawPixel(x, y, color, environment, scale){

    color = color || currentColor;
    pixelArray[x][y] = color;
    if (environment) {
        if (color == "#ffffff"){
            color = "rgba(0,0,0,0)";
        }

        var new_size = scale;
        e_ctx.fillStyle = color;
        e_ctx.clearRect(x * new_size, y * new_size, new_size, new_size);
        e_ctx.fillRect(x * new_size, y * new_size, new_size, new_size);
    } else {
        c_ctx.fillStyle = color;
        c_ctx.clearRect(x * block_size, y * block_size, block_size,    block_size);
        c_ctx.fillRect(x * block_size, y * block_size, block_size, block_size);


    }
}
