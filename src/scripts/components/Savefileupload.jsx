/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react');
var GBCDump = require('../libs/gbcdump.js');
var Photos = require('../libs/photoStore');

require('../../styles/Savefileupload.css');

var Savefileupload = React.createClass({

  onDragOver: function(event){
    event.preventDefault();

    this.getDOMNode().classList.add('hover');
  },

  onDragLeave: function(event){
    event.preventDefault();

    this.getDOMNode().classList.remove('hover');
  },

  onDrop: function(event) {
    event.preventDefault();

    if (event.dataTransfer.files[0].name.indexOf('.sav') != -1){
      this.parsePhotos(event.dataTransfer.files);
    } else {
      this.onDropError('File must be a Gameboy save file (.sav)');
    }

    return false;
  },

  onDropError: function(errorString){
    this.setState({
      flashError: errorString
    });

    this.getDOMNode().classList.remove('hover');
  },

  parsePhotos: function(files){
    GBCDump.open(files, this.addPhoto, this.onCompleteUpload, this.onDropError);
  },

  addPhoto: function(photo){
    Photos.add(photo);
  },

  onCompleteUpload: function(){
    this.getDOMNode().classList.remove('hover');
  },

  render: function () {
      return (
        <div className="uploadTarget" onDragOver={this.onDragOver} onDragLeave={this.onDragLeave} onDrop={this.onDrop} onDragEnd={this.onDrop}>
          <p className="upload hidden">
            <label>Drag &amp; drop not supported, but you can still upload via this input field:<br />
              <input type="file" />
            </label>
          </p>
        </div>
      )
  }
});

module.exports = Savefileupload;
