//var colourBuffers = [[255, 255, 255, 255],  [85, 85, 85, 255], [170, 170, 170, 255], [0, 0, 0, 255]];

module.exports = function (pixels, callback) {
  var d = pixels.data;
  for (var i = 0; i < d.length; i += 4) {
    var r = d[i];
    var g = d[i + 1];
    var b = d[i + 2];

    if (r === 255){
      d[i]     = 178; // red
      d[i + 1] = 192; // green
      d[i + 2] = 17; // blue
    } else if (r === 170){
      d[i]     = 122; // red
      d[i + 1] = 140; // green
      d[i + 2] = 11; // blue
    } else if (r === 85){
      d[i]     = 61; // red
      d[i + 1] = 76; // green
      d[i + 2] = 3; // blue
    } else if (r === 0){
      d[i]     = 61; // red
      d[i + 1] = 61; // green
      d[i + 2] = 3; // blue
    }
  }

  callback(pixels);
};
