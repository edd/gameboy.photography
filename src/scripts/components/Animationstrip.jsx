/**
 * @jsx React.DOM
 */

'use strict';

require('../../styles/Photostrip.css');

var React = require('react/addons');
var Photo = require('./Photo.jsx');

var Photostrip = React.createClass({
  /*jshint ignore:start */

  propTypes: {
    photos: React.PropTypes.object.isRequired          // Array or PhotoStore
  },

  onDragStart: function(event){
    this.setState({
      dragging: event.target
    });

    event.preventDefault();
  },

  onDragEnd: function(event){
    var dragging = this.state.dragging;

    event.preventDefault();

    this.setState({
      dragging: false
    });

    console.log('Dragged '+dragging);
  },

  render: function () {
    var photoNodes = this.props.photos.map(function (photo) {
      return <li key={photo.id} className="photo"><Photo selectable={false} filter={this.props.filter} photo={photo.id}></Photo></li>;
    }.bind(this));

    return (
        <ol className="photoList" onClick={this.selectPhoto} onDrag={this.onDragStart} onDragEnd={this.onDragEnd}>
        {photoNodes}
        </ol>
        );
  }
  /*jshint ignore:end */
});

module.exports = Photostrip;
