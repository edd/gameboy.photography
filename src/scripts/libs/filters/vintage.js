/*
 * jQuery filter.me is Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php) and GPL (http://www.opensource.org/licenses/gpl-license.php) licenses.
 * Copyright © 2012 Matthew Ruddy (http://matthewruddy.com).
 *
 * @author Matthew Ruddy
 * @version 1.0
 */
  var filter,
      o;

function FilterMe() {
  // Store the jQuery element and create canvas element
  this.canvas = document.createElement('canvas');
  this.ctx = this.canvas.getContext('2d');
  this.url = '';
  this.filter = this.filters['Lord Kelvin'];


  return this;
}

FilterMe.prototype.filters = {
  'Lord Kelvin': {
    desaturate: true,
    curves: {'a':[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100,101,102,103,104,105,106,107,108,109,110,111,112,113,114,115,116,117,118,119,120,121,122,123,124,125,126,127,128,129,130,131,132,133,134,135,136,137,138,139,140,141,142,143,144,145,146,147,148,149,150,151,152,153,154,155,156,157,158,159,160,161,162,163,164,165,166,167,168,169,170,171,172,173,174,175,176,177,178,179,180,181,182,183,184,185,186,187,188,189,190,191,192,193,194,195,196,197,198,199,200,201,202,203,204,205,206,207,208,209,210,211,212,213,214,215,216,217,218,219,220,221,222,223,224,225,226,227,228,229,230,231,232,233,234,235,236,237,238,239,240,241,242,243,244,245,246,247,248,249,250,251,252,253,254,255,255], 'r':[43,44,46,47,49,50,52,53,55,56,58,59,61,62,64,65,67,69,70,72,73,75,77,78,80,81,83,85,86,88,90,91,93,95,96,98,100,102,103,105,107,109,111,112,114,116,118,120,121,123,125,127,129,130,132,134,136,137,139,141,142,144,146,147,149,151,152,154,155,157,158,160,162,163,165,166,168,169,171,172,174,175,176,178,179,180,182,183,184,186,187,188,189,190,191,192,193,194,195,196,197,198,199,200,201,201,202,203,204,204,205,206,207,207,208,209,210,210,211,212,212,213,214,214,215,216,217,217,218,219,219,220,221,222,222,223,224,224,225,225,226,227,227,228,228,229,229,229,230,230,231,231,232,232,232,233,233,233,234,234,235,235,235,236,236,236,237,237,237,238,238,239,239,239,240,240,240,241,241,241,242,242,242,243,243,243,243,244,244,244,245,245,245,245,245,246,246,246,246,246,247,247,247,247,247,248,248,248,248,248,248,249,249,249,249,249,249,249,250,250,250,250,250,250,250,250,251,251,251,251,251,251,251,251,251,252,252,252,252,252,252,252,252,252,253,253,253,253,253,253,253,253,254,254,254,254,254], 'g':[36,36,36,36,36,36,36,36,36,36,36,36,36,37,37,37,37,37,37,38,38,38,39,39,40,40,41,41,42,43,43,44,45,46,47,47,48,49,50,51,52,53,54,55,56,57,59,60,61,62,63,64,65,67,68,69,70,71,72,73,75,76,77,78,79,80,81,82,83,84,86,87,88,89,90,91,92,93,95,96,97,98,99,100,101,102,104,105,106,107,108,109,110,111,112,113,114,115,116,117,118,119,120,121,122,123,124,125,126,127,128,129,130,131,132,133,134,135,136,137,138,139,140,141,142,143,144,145,146,147,148,149,150,151,152,153,154,155,155,156,157,158,158,159,160,160,161,161,162,163,163,164,164,165,165,166,166,167,167,168,168,168,169,169,170,171,171,172,172,173,173,174,174,175,175,176,177,177,178,178,179,179,180,180,181,181,182,182,182,183,183,184,184,184,185,185,185,186,186,186,186,187,187,187,187,188,188,188,188,188,189,189,189,189,189,190,190,190,190,190,190,190,191,191,191,191,191,191,191,191,192,192,192,192,192,192,192,192,193,193,193,193,193,193,193,193,194,194,194,194,194,194,194,195,195,195,195], 'b':[69,69,69,69,69,69,69,69,69,69,69,69,69,69,69,69,69,69,69,69,69,69,69,69,69,69,69,69,69,69,69,69,69,69,69,69,69,69,69,69,69,69,69,69,69,69,69,69,69,69,69,69,69,69,69,69,69,69,70,70,70,70,70,70,70,70,70,70,71,71,71,72,72,73,73,73,74,74,75,75,76,76,77,78,78,79,79,80,80,81,81,82,82,82,83,83,84,84,84,85,85,86,86,86,87,87,87,88,88,88,89,89,90,90,90,91,91,91,92,92,93,93,93,94,94,95,95,96,96,96,97,97,98,99,99,100,100,101,101,102,102,102,103,103,103,104,104,104,105,105,105,106,106,106,106,107,107,107,107,108,108,108,108,109,109,109,110,110,110,111,111,111,111,112,112,112,113,113,113,114,114,114,115,115,115,115,116,116,116,116,117,117,117,117,117,118,118,118,118,118,118,119,119,119,119,119,119,119,120,120,120,120,120,120,120,120,120,121,121,121,121,121,121,121,121,121,121,121,122,122,122,122,122,122,122,122,122,122,122,122,123,123,123,123,123,123,123,123,123,123,123,124,124,124,124,124,124]},
    vignette: true
  }
};

  /*
   * Processes and image and applies the effects
   */
FilterMe.prototype.process = function(imageData, callback) {
    // Check for canvas support before continuing
    if ( !this.canvas.getContext ) {
      return;
    }

    // Let's go!
    this.canvas.width = imageData.width;
    this.canvas.height = imageData.height;
    this.ctx.putImageData(imageData,0 ,0);

    // Apply desaturation
    if ( this.filter.desaturate )
      this.deSaturate( this.filter.desaturate );

    // Apply curves effect
    if ( this.filter.curves )
      this.addCurves();

    // Apply vignette effect
    if ( this.filter.vignette )
      this.addVignette();

    callback(this.ctx.getImageData(0, 0, imageData.width, imageData.height));
  }

  /*
   * Does a desaturation
   */
FilterMe.prototype._doSaturation = function(saturation) {

    // Saturation fallback
    saturation = saturation || 1;

    // Get image data
    var imageData = this.ctx.getImageData( 0, 0, this.canvas.width, this.canvas.height ),
        data = imageData.data,
        length = data.length,
        average;

    // Apply the desaturation
    for ( var i = 0; i < length; i += 4 ) {
      average = ( data[ i ] + data[ i+1 ] + data[ i+2 ] ) / 3;
      data[ i ] += ( Math.round( average - data[ i ] * saturation ) );
      data[ i+1 ] += ( Math.round( average - data[ i+1 ] * saturation ) );
      data[ i+2 ] += ( Math.round( average - data[ i+2 ] * saturation ) );
    }

    // Restore modified image data
    imageData.data = data;

    return imageData;

  }

  /*
   * Applies a desaturation
   */
FilterMe.prototype.deSaturate = function(saturation) {

    // Do the desaturation
    var imageData = this._doSaturation(saturation);

    // Put the image data
  this.ctx.putImageData(imageData,0 ,0);

};

  /*
   * Does a curves adjustment
   */
FilterMe.prototype._doCurves = function() {

    var curves,
        i;

    // Get the curves
    curves = this.filter.curves;

    // Get the canvas image data
    var imageData = this.ctx.getImageData( 0, 0, this.canvas.width, this.canvas.height ),
        data = imageData.data,
        length = data.length;

    // Apply the color R, G, B values to each individual pixel
    for ( i = 0; i < length; i += 4 ) {
      data[ i ] = curves.r[ data[ i ] ];
      data[ i+1 ] = curves.g[ data[ i+1 ] ];
      data[ i+2 ] = curves.b[ data[ i+2 ] ];
    }

    // Apply the overall RGB contrast changes to each pixel
    for ( i = 0; i < length; i += 4 ) {
      data[ i ] = curves.a[ data[ i ] ];
      data[ i+1 ] = curves.a[ data[ i+1 ] ];
      data[ i+2 ] = curves.a[ data[ i+2 ] ];
    }

    // Restore modified image data
    imageData.data = data;

    return imageData;

  };

  /*
   * Applies a curves adjust (aka the filter) to the image
   */
FilterMe.prototype.addCurves = function() {

    // Apply the adjustments
    var imageData = this._doCurves();

    // Put the image data
    this.ctx.putImageData(imageData, 0, 0);

  }

  /*
   * Adds a vignette effect to the image
   */
FilterMe.prototype.addVignette = function() {

    var gradient,
        outerRadius = Math.sqrt( Math.pow( this.canvas.width/2, 2 ) + Math.pow( this.canvas.height/2, 2 ) );

    // Adds outer darkened blur effect
    this.ctx.globalCompositeOperation = 'source-over';
    gradient = this.ctx.createRadialGradient( this.canvas.width/2, this.canvas.height/2, 0, this.canvas.width/2, this.canvas.height/2, outerRadius );
    gradient.addColorStop( 0, 'rgba(0, 0, 0, 0)' );
    gradient.addColorStop( 0.65, 'rgba(0, 0, 0, 0)' );
    gradient.addColorStop( 1, 'rgba(0, 0, 0, 0.6)' );
    this.ctx.fillStyle = gradient;
    this.ctx.fillRect( 0, 0, this.canvas.width, this.canvas.height );

    // Adds central lighten effect
    this.ctx.globalCompositeOperation = 'lighter';
    gradient = this.ctx.createRadialGradient( this.canvas.width/2, this.canvas.height/2, 0, this.canvas.width/2, this.canvas.height/2, outerRadius );
    gradient.addColorStop( 0, 'rgba(255, 255, 255, 0.1)' );
    gradient.addColorStop( 0.65, 'rgba(255, 255, 255, 0)' );
    gradient.addColorStop( 1, 'rgba(0, 0, 0, 0)' );
    this.ctx.fillStyle = gradient;
    this.ctx.fillRect( 0, 0, this.canvas.width, this.canvas.height );
};

module.exports = function(imageData, callback) {
  var filter = new FilterMe();
  var data = filter.process(imageData, callback);

  return imageData;
};
