/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react/addons');
var Zip = require('../libs/zip.js');
var Gif = require('../libs/gif.js');
var Photos = require('../libs/photoStore.js');
var states = require('../libs/states');
var each = require('lodash.foreach');
var AnimationSelector = require('./Animationselector.jsx');
var Router = require('react-nested-router');

require('../../styles/Controls.css');

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

  download: function (event){
    if (this.props.state === states.ANIMATING){
      this.gifPhotos(event);
    } else {
      this.zipPhotos(event)
    }
  },

  zipPhotos: function(event){
    event.preventDefault();

    var images = Photos.getSelectedOrEverything().map(function(photo){
      return photo.getDOMNode().toDataURL();

    });

    var zippedImages = new Zip(images);

    window.location = window.URL.createObjectURL(zippedImages);
  },

  gifPhotos: function(event){
    event.preventDefault();

    var photos = document.querySelectorAll('.controls canvas');
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

  toggleAnimation: function(){
    if (this.props.state === states.ANIMATING){
      this.props.changeState(states.UPLOADED);
    } else {
      this.props.changeState(states.ANIMATING);
    }
  },

  showFilter: function(){
    Router.transitionTo('filter');
  },

  render: function () {
    var animation;
    var downloadText = '';
    var length = Photos.getSelectedOrEverything().length;

    if (this.props.state === states.ANIMATING){
      downloadText = 'Download animation';
    } else if (this.props.isAnythingSelected === false){
      downloadText = 'Download '+length;
    } else {
      downloadText = 'Download '+length;
    }

    /*<AnimationSelector state={this.props.state} toggleAnimation={this.toggleAnimation} /> */

    return (<div className="controls">
      <ul>
        <li className="control" onClick={this.showFilter}>
          <button className="filter"><span>Filter</span></button>
        </li>
        <li className={(this.props.isAnythingSelected)? 'control' : 'hidden'}><button className="delete" onClick={this.delete}><span>Delete</span></button></li>
        <li className="control right"><button className="zip" onClick={this.download} ><span>{downloadText}</span></button></li>
      </ul>
    </div>
    )
  }
  /*jshint ignore:end */
});

module.exports = Controls;
