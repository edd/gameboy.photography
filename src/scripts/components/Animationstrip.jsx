/**
 * @jsx React.DOM
 */

'use strict';

require('../../styles/Photostrip.css');

var React = require('react/addons');
var Photo = require('./Photo.jsx');
var findIndex = require('lodash.findindex');

var Photostrip = React.createClass({
  /*jshint ignore:start */

  propTypes: {
    photos: React.PropTypes.object.isRequired          // Array or PhotoStore
  },

  getInitialState: function(){
    return {
      photos: this.props.photos,
      dragElement: false,
      dropTarget: false
    };

  },

  onDragStart: function(event){
    this.setState({
      dragElement: event.target.getAttribute('data-photo-id')
    });
  },


  onDragOver: function(event){
    this.setState({
      dropTarget: event.target.getAttribute('data-photo-id')
    });
  },

  onDragEnd: function(event){
    var dragging = this.state.dragElement,
        dropTarget = this.state.dropTarget;

    event.preventDefault();

    this.swapArrayItems(this.findElementInArray(dragging), this.findElementInArray(dropTarget));

    this.setState({
      dragElement: false,
      dropTarget: false
    });
  },

  findElementInArray: function(photoId){
    return findIndex(this.state.photos, function(photo){
      return (photo.id === photoId);
    });
  },

  swapArrayItems: function(sourceIndex, targetIndex){
    var tempArray = this.state.photos,
        tempValue = this.state.photos[sourceIndex];

    tempArray[sourceIndex] = tempArray[targetIndex];
    tempArray[targetIndex] = tempValue;

    this.setState({
      photos: tempArray
    });

  },

  render: function () {
    var photoNodes = this.state.photos.map(function (photo) {
      return <li key={photo.id} data-photo-id={photo.id} className="photo" draggable="true" onDragOver={this.onDragOver}><Photo selectable={false} filter={this.props.filter} photo={photo.id}></Photo></li>;
    }.bind(this));

    return (
        <ol className="photoList" onClick={this.selectPhoto} onDragStart={this.onDragStart} onDragEnd={this.onDragEnd}>
        {photoNodes}
        </ol>
        );
  }
  /*jshint ignore:end */
});

module.exports = Photostrip;
