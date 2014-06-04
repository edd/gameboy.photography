/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react/addons');
var Photo = require('./Photo.jsx');
require('../../styles/Photostrip.css');

var Photostrip = React.createClass({
  /*jshint ignore:start */

  selectPhoto: function(event){
      var photoId = event.target.getAttribute('rel');

      this.props.selectPhoto(photoId);
  },

  render: function () {
    var photoNodes = this.props.photos.map(function (photo) {
      return <li key={photo.id} className="photo"><Photo photo={photo}></Photo></li>;
    });

    return (
      <ol className="photoList" onClick={this.selectPhoto}>
        {photoNodes}
      </ol>
    );
  }
  /*jshint ignore:end */
});

module.exports = Photostrip;
