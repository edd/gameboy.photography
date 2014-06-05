/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react/addons');
var Photo = require('./Photo.jsx');
require('../../styles/Photostrip.css');

var Photostrip = React.createClass({
  /*jshint ignore:start */

  render: function () {
    var photoNodes = this.props.photos.map(function (photo) {
      return <li key={photo.id} className="photo"><Photo filter={this.props.filter} photo={photo}></Photo></li>;
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
