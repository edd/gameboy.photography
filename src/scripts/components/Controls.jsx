/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react/addons');
require('../../styles/Controls.css');
var Zip = require('../libs/zip.js');
var Photos = require('../libs/photoStore.js');

var Controls = React.createClass({
  /*jshint ignore:start */

  getInitialState: function(){
    return {
      scale: 2
    }
  },

  showFilterMenu: function(){

  },

  setFilter: function(event){
    event.preventDefault();

    Photos.setFilter();
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

  render: function () {
    return (
        <div className="controls">
            <ul>
              <li className="control"><button className="zip" onClick={this.zipPhotos} >Download as zip</button></li>
              <li className="control"><button className="resize" onClick={this.resize} >Embiggen {this.state.scale}x</button></li>
              <li className="control">
                <button className="filter" onClick={this.setFilter}>Palette</button>
                <select className="filter" onChange={this.setFilter}>
                    <option selected="selected" disabled="disabled">Set filter</option>
                    <option>Red</option>
                    <option>Gameboy</option>
                    <option>Silver</option>
                </select>
              </li>
              <li className="control"><button className="undo" onClick={this.undo}>Undo</button></li>
            </ul>
        </div>
      )
  }
  /*jshint ignore:end */
});

module.exports = Controls;
