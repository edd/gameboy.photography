/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react/addons');
var Gif = require('../libs/gif.js');
var Photos = require('../libs/photoStore.js');
var states = require('../libs/states');
var GlobalEvents = require('../libs/events');
var each = require('lodash.foreach');
var Router = require('react-nested-router');
var Link = Router.Link;

require('../../styles/Controls.css');

var Controls = React.createClass({
  /*jshint ignore:start */

  propTypes: {
    state: React.PropTypes.string.isRequired,          // Array or PhotoStore
    isAnythingSelected: React.PropTypes.bool.isRequired
  },

  getInitialState: function(){
    GlobalEvents.on('state', this.stateDidChange);

    return {
      state: GlobalEvents.getState(),
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

  undo: function(){
    Photos.undo();
  },

  delete: function(){
    Photos.delete();
  },

  stateDidChange: function(newState){
    this.setState({
      state: newState
    });
  },

  render: function () {
    var animation;
    var downloadText = '';
    var length = Photos.getSelectedOrEverything().length;

    if (this.state.state === states.ANIMATING){
      downloadText = 'Download animation';
    } else {
      downloadText = 'Download';
    }

    var download;

    if (this.state.state === states.ANIMATING){
      download = <Link to="animationDownload" className="zip"><span>{downloadText}</span></Link>
    } else {
      download = <Link to="download" className="zip"><span>{downloadText}</span></Link>
    }

    return (<div className="controls">
      <ul className={this.state.state}>
        <li className={(this.state.state === states.ANIMATING)? 'hidden' : 'control'}>
          <Link to="animation" className="animate"><span>Animation</span></Link>
        </li>
        <li className={(this.props.isAnythingSelected)? 'control' : 'hidden'}>
          <a className="delete" onClick={this.delete}><span>Delete</span></a></li>
        <li className="control right">
          {download}
        </li>
      </ul>
    </div>
    )
  }
});

module.exports = Controls;
