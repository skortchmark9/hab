function unflatten(array, width, height) {
    console.log(array);
    console.log(width);
    console.log(height);
    var newArray = new Array(width);
    console.log('width', width);
    for(var col = 0; col < width; col++) {
        newArray[col] = new Array(height);
        for(var row = 0; row < width; row++) {
            drawPixel(col, row, array[(col * height) + row]);
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

function drawPixel(x, y, color){
    color = color || currentColor;

    pixelArray[x][y] = color;

    c_ctx.fillStyle = color;
    c_ctx.clearRect(x * block_size, y * block_size, block_size, block_size);
    c_ctx.fillRect(x * block_size, y * block_size, block_size, block_size);
}
