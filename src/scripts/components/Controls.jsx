/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react/addons');
require('../../styles/Controls.css');
var Zip = require('../libs/zip.js');
var Gif = require('../libs/gif.js');
var Photos = require('../libs/photoStore.js');
var Paletteselector = require('./Paletteselector.jsx');
var states = require('../libs/states');
var toArray = require('lodash.toarray');
var each = require('lodash.foreach');

var Controls = React.createClass({
  /*jshint ignore:start */

  propTypes: {
    state: React.PropTypes.string.isRequired,          // Array or PhotoStore
    isAnythingSelected: React.PropTypes.bool.isRequired
  },

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

    var images = Photos.getSelectedOrEverything().map(function(photo){
      return photo.getImageData();
    });

    var zippedImages = new Zip(images);

    window.location = window.URL.createObjectURL(zippedImages);
  },

  gifPhotos: function(event){
    event.preventDefault();

    var photos = toArray(document.getElementsByTagName('canvas'));
    var gif = new Gif();

    each(photos, function(photo){
      var frame = photo.toDataURL();
      gif.addFrame(frame);
    });


    gif.render(function(blob){
      window.open(URL.createObjectURL(blob));
    });
  },

  undo: function(){
    Photos.undo();
  },

  delete: function(){
    Photos.delete();
  },

  createAnimation: function(){
    this.props.changeState(states.ANIMATING);
  },

  cancelAnimation: function(){
    this.props.changeState(states.UPLOADED);
  },

  render: function () {
    var animation,
        zip;

    if (this.props.state === states.ANIMATING) {
      return (<div className="controls">
        <ul>
          <li className="control"><button className="zip" onClick={this.gifPhotos} ><span>Download animation</span></button></li>
          <li className="control"><button className="animate" onClick={this.cancelAnimation}><span>Cancel animation</span></button></li>
          <li className="control right"><button className="settings" onClick={this.showSettings}><span>Settings</span></button></li>
        </ul>
      </div>
          )
    } else {
      //           <li className="control"><button className="resize" onClick={this.resize} ><span>Embiggen {this.state.scale}x</span></button></li>


      var downloadText = '';

      var length = Photos.getSelectedOrEverything().length;
      if (this.props.isAnythingSelected === false){
        downloadText = 'Download all '+length;
      } else {
        downloadText = 'Download '+length;
      }

      return (<div className="controls">

        <ul>
          <li className="control"><button className="zip" onClick={this.zipPhotos} ><span>{downloadText}</span></button></li>
          <Paletteselector />
          <li className={(this.props.isAnythingSelected)? 'control' : 'hidden'}><button className="animate" onClick={this.createAnimation}><span>Create Animation</span></button></li>
          <li className={(this.props.isAnythingSelected)? 'control' : 'hidden'}><button className="delete" onClick={this.delete}><span>Delete</span></button></li>
          <li className="control right"><button className="settings" onClick={this.showSettings}><span>Settings</span></button></li>
        </ul>
      </div>
      )
    }


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
