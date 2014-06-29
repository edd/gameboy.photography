/**
 * @jsx React.DOM
 */

'use strict';

require('../../styles/Animationstrip.css');

var React = require('react/addons');
var Photo = require('./Photo.jsx');
var findIndex = require('lodash.findindex');
var debounce = require('lodash.debounce');
var each = require('lodash.foreach');

var Animationstrip = React.createClass({
  /*jshint ignore:start */

  dropTarget: false,
  dragElement: false,

  propTypes: {
    photos: React.PropTypes.array.isRequired          // Array or PhotoStore
  },

  getInitialState: function(){
    this.debouncedOnDragOver = debounce(this.onDragOver, 20);

    return {
      photos: this.props.photos
    };
  },

  onDragStart: function(event){
    this.dragElement = event.target.getAttribute('data-photo-id')
  },


  onDragOver: function(event){
    if (event.target === null){
      return false;
    }

    if (event.target) {
      event.target.classList.add('hover');

      if (event.target !== this.dropTarget && this.dropTarget !== false){
        this.dropTarget.classList.remove('hover');
      }

      this.dropTarget = event.target
    }
  },

  onDragEnd: function(event){
    var dragging = this.dragElement,
        dropTarget = this.dropTarget.getAttribute('data-position');

    event.preventDefault();

    this.dropTarget.classList.remove('hover');

    this.swapArrayItems(this.findElementInArray(dragging), dropTarget);

    this.dragElement = false;
    this.dropTarget = false;
  },

  findElementInArray: function(photoId){
    return findIndex(this.state.photos, function(photo){
      return (photo.id === photoId);
    });
  },

  renderPhoto: function (photo) {
    return (<li key={photo.id} data-photo-id={photo.id} className="photo" draggable="true"><Photo selectable={false} filter={this.props.filter} photo={photo.id}></Photo></li>);
  },

  render: function () {
    var photoNodes = [],
        i = 0;

    this.state.photos.forEach(function (photo) {
      photoNodes.push(this.renderSpacer(i));
      photoNodes.push(this.renderPhoto(photo));

      i++;
    }.bind(this));

    photoNodes.push(this.renderSpacer(i));

    return (
        <ol className="photoList animationEditor" onClick={this.selectPhoto} onDragStart={this.onDragStart}>
        {photoNodes}
        </ol>
        );
  }
  /*jshint ignore:end */
});

module.exports = Animationstrip;
