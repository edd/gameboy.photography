var Gif = require('gif.js').GIF;

var defaultOptions = {
  workers: 2,
  quality: 10,
  speed: 200
};

function Animation(speed, workers, quality){
  this.animation = new Gif({
    workers: workers || defaultOptions.workers,
    quality: quality || defaultOptions.quality,
    speed: speed || defaultOptions.speed
  });
};

Animation.prototype.addFrame = function(imageData){
    var image = new Image();
    image.src = imageData;

    this.animation.addFrame(image);
};

Animation.prototype.render = function(callback){
  this.animation.on('finished', callback);

  this.animation.render();
};


module.exports = Animation;