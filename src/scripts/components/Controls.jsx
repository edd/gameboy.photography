/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react/addons');
require('../../styles/Controls.css');
var Zip = require('../libs/zip.js');
var Photos = require('../libs/photoStore.js');
var Paletteselector = require('./Paletteselector.jsx');

var Controls = React.createClass({
  /*jshint ignore:start */

  getInitialState: function(){
    return {
      scale: 2
    }
  },

  resize: function(event){
    event.preventDefault();

    this.setState({
      scale: this.state.scale + 1
    });

    Photos.resize(this.state.scale);
  },

  zipPhotos: function(event){
    event.preventDefault();

    var images = Photos.get().map(function(photo){
      return photo.getImageData();
    });

    var zippedImages = new Zip(images);

    window.location = window.URL.createObjectURL(zippedImages);
  },

  undo: function(){
    Photos.undo();
  },

  delete: function(){
    Photos.delete();
  },

  render: function () {
    return (
        <div className="controls">
            <ul>
              <li className="control"><button className="zip" onClick={this.zipPhotos} ><span>Download as zip</span></button></li>
              <li className="control"><button className="resize" onClick={this.resize} ><span>Embiggen {this.state.scale}x</span></button></li>
              <Paletteselector />
              <li className="control"><button className="delete" onClick={this.delete}><span>Delete</span></button></li>
              <li className="control right"><button className="settings" onClick={this.showSettings}><span>Settings</span></button></li>
            </ul>
        </div>
      )
  }
  /*jshint ignore:end */
});

/*
 <li className="control"><button className="undo" onClick={this.undo}><span>Undo</span></button></li>
 <button className="filter" onClick={this.setFilter}>Palette</button>
 <select className="filter" onChange={this.setFilter}>
 <option selected="selected" disabled="disabled">Set filter</option>
 <option>Red</option>
 <option>Gameboy</option>
 <option>Silver</option>
 </select>

 */
module.exports = Controls;
