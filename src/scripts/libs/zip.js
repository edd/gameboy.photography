var JSZip = require('jszip');

function Zip(images){
  this.zip = new JSZip();
  this.count = 1;

  images.forEach(this.zipImage.bind(this));

  var content = this.zip.generate();

  return this.zip.generate({type:"blob"});
}

Zip.prototype.zipImage = function(image){
  var savable = new Image();
  savable.src = image;
  this.zip.file("image"+this.count+".png", savable.src.substr(savable.src.indexOf(',') + 1), {base64: true});

  this.count++;
}


module.exports = Zip;