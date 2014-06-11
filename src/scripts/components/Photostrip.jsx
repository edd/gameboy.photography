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

  componentDidMount: function(){
    this.props.photos.save();
  },

  render: function () {
    var photoNodes = this.props.photos.get().map(function (photo) {
      return <li key={photo.id} className="photo"><Photo selectable={true} filter={this.props.filter} photo={photo.id}></Photo></li>;
    }.bind(this));

    return (
      <ol className="photoList" onClick={this.selectPhoto}>
        {photoNodes}
      </ol>
    );
  }
  /*jshint ignore:end */
});

module.exports = Photostrip;
