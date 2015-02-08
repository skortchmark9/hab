function unflatten(array, width, height) {
    var newArray = new Array(height);
    for(var row = 0; row < height; row++) {
        newArray[row] = new Array(width);
        for(var col = 0; col < width; col++) {
            drawPixel(col + 1, row + 1, array[(row * height) + col]);
        }
    }
    drawgrid();
}


function flatten(array) {
    var width = array[0].length;
    var height = array.length;
    newArray = [].concat.apply([], array);
    return {width : width, height : height, colors : newArray}
}

