var TOTAL_PHOTOS = 31;
var TEST_STRING = 'Magic';
var colourBuffers = [[255, 255, 255, 255],  [85, 85, 85, 255], [170, 170, 170, 255], [0, 0, 0, 255]];

function stringToHex(string){
  var hex = [];
    for (var i = 0; i < string.length; i++) {
        var byteStr = string.charCodeAt(i).toString(16);
        if (byteStr.length < 2) {
            byteStr = "0" + byteStr;
        }
        hex.push(parseInt(byteStr, 16));
    }

    return hex;
}

var GBCDump = function(files){
  this.fr = new FileReader();

  return this;
}

var callback,
    didCompleteCallback;

GBCDump.prototype.open = function open(files, photoCallback, completeCallback){
  callback = photoCallback;
  didCompleteCallback = completeCallback;

  this.fr.onloadend = this.parsePhotos;
  this.fr.readAsBinaryString(files[0]);
}

GBCDump.prototype.parsePhotos = function parsePhotos(){
  for (var i = 0; i<TOTAL_PHOTOS; i++){
    var start = 0x2000 + (i * 0x1000),
        photoResult = [];

    photo = this.result.slice(start, start + 4048),
    whence = 0;

    for (var tile=0; tile<224; tile++) { //tile or tile_col / tile_row?
      for (var j=0; j<8; j++) { //j is for each row of pixels

        var pixelBuffer = photo.slice(whence, whence + 2);
        whence += 2;

        z = 128;

        var pixelBufferCode = stringToHex(pixelBuffer);

        for (var k=0; k<8; k++) { //k is for each pixel in row
          var x = ((tile % 16) * 8) + k;
          var y = (((tile - (tile % 16)) % 15) * 8) + j;

          // Get colour from colour array
          colour = colourBuffers[(((pixelBufferCode[0] & z) == z)? 1 : 0) * 2 + ((((pixelBufferCode[1]) & z) == z)? 1 : 0)];

          photoResult.push({x: x, y: y, colour: colour});
          z >>= 1;
        }
      }
    }

    callback({pixels: photoResult});
  }

  didCompleteCallback();
}


module.exports= new GBCDump();