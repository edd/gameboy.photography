var filter = function (pixels, args) {
  var d = pixels.data;
  for (var i = 0; i < d.length; i += 4) {
    var r = d[i];
    var g = d[i + 1];
    var b = d[i + 2];
    d[i]     = (r * 0.393)+(g * 0.769)+(b * 0.189); // red
    d[i + 1] = (r * 0.349)+(g * 0.686)+(b * 0.168); // green
    d[i + 2] = (r * 0.272)+(g * 0.534)+(b * 0.131); // blue
  }
  return pixels;
}

function PhotoStore(){
  this._photos = [];

  this.restore();

  this.length = this._photos.length;

  return this;
};

PhotoStore.prototype.add = function(pixels){
  var photo = {
    id: this._photos.length,
    pixels: pixels,
    _imageData: [],
  };

  this.decoratePhoto(photo);

  this._photos.push(photo);
  this.length = this._photos.length;

  return photo.id;
};

PhotoStore.prototype.get = function(id) {
  if (typeof id !== 'undefined'){
    return this._photos[id];
  } else {
    return this._photos;
  }
};

PhotoStore.prototype.save = function(id) {
  var photos = this._photos.map(function(photo){

    var strippedPhoto = {
      id: photo.id,
      _imageData: photo._imageData
    };

    return strippedPhoto;
  });

  window.localStorage.photos = JSON.stringify(photos);
};

PhotoStore.prototype.restore = function(id) {
  if (typeof window.localStorage.photos !== 'undefined') {
    photos = JSON.parse(window.localStorage.photos);

    this._photos = photos.map(function(photo){
      return this.decoratePhoto(photo);
    }.bind(this));

    return true;
  }

  return false;
};

PhotoStore.prototype.undo = function() {
  this._photos.map(function(photo){
    photo.undo();
  });

  this.save();
};

PhotoStore.prototype.resize = function(scale) {
  this._photos.map(function(photo){
    photo.resize(scale);
  });

  this.save();
};

PhotoStore.prototype.setFilter = function(/*filter*/) {
  this._photos.map(function(photo){
    photo.filter(filter);
  });

  this.save();
};

PhotoStore.prototype.decoratePhoto = function(photo){

  photo.setImageData = function(imageData){
    this._imageData.push(imageData);
  };

  photo.getImageData = function(index){
    if (typeof index === 'undefined') {
      index = this._imageData.length - 1;
    }

    if (index > -1 && typeof this._imageData[index] !== 'undefined') {
      return this._imageData[index];
    } else {
      return false;
    }
  };

  photo.getAllImageData = function(){
    return this._imageData;
  };

  photo.undo = function(){
    if (this._imageData.length > 1) {
      this._imageData.pop();

      if (typeof this.onUndo !== 'undefined') {
        this.onUndo();
      }

      return true;
    }
    return false;
  };

  photo.filter = function(filter){
    if (typeof this.onFilterChange !== 'undefined'){
      this.onFilterChange(filter);
    }
  };

  photo.resize = function(scale){
    if (typeof this.onResize !== 'undefined'){
      this.onResize(scale);
    }
  };

  return photo;
};

module.exports = new PhotoStore();