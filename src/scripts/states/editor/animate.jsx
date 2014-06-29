/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react/addons');
var states = require('../../libs/states');
var dragProxy = require('../../libs/dragproxy');
var Photo = require('../../components/Photo.jsx');
var GlobalEvents = require('../../libs/events.js');

require('../../../styles/Animationselector.css');

var AnimationSelector = React.createClass({
  propTypes: {
    state: React.PropTypes.string.isRequired
  },

  getInitialState: function(){
    return {
      photos: [],
      style: {}
    };
  },

  onDragEnd: function(event, index){
    event.preventDefault();
    event.stopPropagation();

    var photo = dragProxy.onDragEnd();

    var photos = this.state.photos;

    if (isNaN(parseInt(index, 10))) {
      photos.push(photo);
    } else {
      photos.splice(index, 0, photo);
    }

    this.setState({
      photos: photos
    });

    if (this.dropTarget){
      this.dropTarget.classList.remove('hover');
      this.dropTarget = false;
    }
  },

  getHeight: function(){
    return this.getDOMNode().clientHeight + 120;
  },

  publishHeight: function(){
    var height;

    if (this.props.activeRoute) {
      height = 20;
    } else {
      height = this.getHeight();
    }

    GlobalEvents.emit('animationHeight', height);
  },

  onDragOverSpacer: function(event){
    if (event.target === null){
      return false;
    }

    if (event.target) {
      event.target.classList.add('hover');

      this.dropTarget = event.target;
    }
  },

  onDragLeaveSpacer: function(event){
    if (event.target === null){
      return false;
    }

    if (event.target) {
      event.target.classList.remove('hover');

      this.dropTarget = false;
    }
  },

  onDropSpacer: function(event){
    var dragging = this.dragElement,
        dropTarget = this.dropTarget.getAttribute('data-position');

    event.preventDefault();

    this.dropTarget.classList.remove('hover');

    if (typeof dragging === 'undefined' || dragging == false) {
      this.onDragEnd(event, dropTarget);
    } else {
      this.swapArrayItems(this.findElementInArray(dragging), dropTarget);
    }

    this.dragElement = undefined;
    this.dropTarget = false;
  },

  swapArrayItems: function(sourceIndex, targetIndex){
    var photos = this.state.photos,
        element = photos[sourceIndex],
        target = (targetIndex > sourceIndex)? targetIndex-1 :targetIndex;

    photos.splice(sourceIndex, 1);
    photos.splice(target, 0, element);

    this.setState({
      photos: photos
    });
  },

  onDragOver: function (event){
    event.preventDefault();
  },

  renderFrames: function(){
    if (this.state.photos.length > 0){
      var i = 0,
          photoNodes = [];

      this.state.photos.forEach(function (photo) {
        photoNodes.push(<li key={i} onDrop={this.onDropSpacer} onDragOver={this.onDragOverSpacer} onDragLeave={this.onDragLeaveSpacer} className="animationPosition" data-position={i}></li>);
        photoNodes.push(<li key={photo.id+i} className="photo"><Photo selectable={true} photo={photo.id}></Photo></li>);
        i++;
      }.bind(this));

      photoNodes.push(<li key={i} onDragOver={this.onDragOverSpacer} className="animationPosition" data-position={i}></li>);

      return photoNodes;
    } else {
      return <li className="description">Drag a frame here to get started</li>
    }
  },

  componentWillReceiveProps: function(nextProps){
    var height = this.getHeight();
    var style;

    console.log(nextProps);

    if (nextProps !== null && nextProps.activeRoute !== null) {
      style = {
        transform: 'translateY(-' + height + 'px)',
        webkitTransform: 'translateY(-' + height + 'px)'
      };
    } else {
      style = {
        transform: 'translateY(0)',
        webkitTransform: 'translateY(0)'
      };
    }


    this.setState({style: style});
  },

  componentDidUpdate: function(){
    this.publishHeight();
  },

  componentDidMount: function(){
    this.publishHeight();

    window.setTimeout(this.removeEnterClass.bind(this), 5);

    GlobalEvents.setState(states.ANIMATING);
  },

  componentWillUnmount: function(){
    GlobalEvents.setState(states.EDITING);
  },

  removeEnterClass: function(){
    this.getDOMNode().classList.remove('enter');
  },

  render: function () {
    var frames = this.renderFrames();

    return (
        <div className="animationWrapper enter">
          <ul className="animationSteps" onDragOver={this.onDragOver} onDrop={this.onDragEnd} style={this.state.style}>
            {frames}
          </ul>

          {this.props.activeRoute}
        </div>
      )
  }
});

module.exports = AnimationSelector;