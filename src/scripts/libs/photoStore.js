
function PhotoStore(){
  this._photos = [];

  this.restore();

  this.length = this._photos.length;

  return this;
};

PhotoStore.prototype.getGuid = (function() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
  }
  return function() {
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4();
  };
})();

PhotoStore.prototype.add = function(pixels){
  var photo = {
    id: this.getGuid(),
    pixels: pixels,
    _imageData: [],
    selected: false
  };

  this.decoratePhoto(photo);

  this._photos.push(photo);
  this.length = this._photos.length;

  return photo.id;
};

PhotoStore.prototype.getSelectedOrEverything = function(){
  var filtered = this._photos.filter(function(photo){
    return (photo.selected === true);
  });

  if (filtered.length > 0){
    return filtered;
  } else {
    return this._photos;
  }
};

PhotoStore.prototype.get = function(id) {
  if (typeof id !== 'undefined'){
    var selected = this._photos.filter(function(photo){
      return (photo.id === id);
    });

    if (selected.length === 1) {
      return selected[0];
    } else {
      return false;
    }
  } else {
    return this._photos;
  }
};

PhotoStore.prototype.remove = function(id, i){
  this._photos.splice(i, 1);
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
  this.getSelectedOrEverything().map(function(photo){
    photo.undo();
  });

  this.save();
};

PhotoStore.prototype.resize = function(scale) {
  this.getSelectedOrEverything().map(function(photo){
    photo.resize(scale);
  });

  this.save();
};

PhotoStore.prototype.setFilter = function(filter) {
  this.getSelectedOrEverything().map(function(photo){
    if (typeof filter === 'function') {
      photo.filter(filter);
    } else {
      photo.undo();
    }
  });

  this.save();
};

PhotoStore.prototype.delete = function() {
  var temp = this._photos.slice(0);

  this._photos = this._photos.filter(function(photo){
    return (photo.selected !== true);
  });

  if (typeof this.onDelete !== 'undefined'){
    this.onDelete();
  }

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

  photo.isSelected = function(selected){
    this.selected = selected;
  };

  return photo;
};

module.exports = new PhotoStore();