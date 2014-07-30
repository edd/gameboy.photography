/**
 * @jsx React.DOM
 */
/*global require: false, module: false;*/

'use strict';

var React = require('react');
var Photo = require('./Photo.jsx');

require('../../styles/Photoviewer.css');

var Photoviewer = React.createClass({
  /*jshint ignore:start */
  render: function () {
      if (this.props.currentPhoto !== false) {
          return (
              <div>
                  <Photo scale="2" photo={this.props.currentPhoto}></Photo>
              </div>
              )
      } else {
          return (
              <div></div>
          )
      }
  }
  /*jshint ignore:end */
});

module.exports = Photoviewer;
