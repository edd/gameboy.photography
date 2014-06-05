/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react/addons');
require('../../styles/Controls.css');
var Zip = require('../libs/zip.js');

var Controls = React.createClass({
  /*jshint ignore:start */

  setFilter: function(event){
    event.preventDefault();

    this.props.setFilter();
  },

  zipPhotos: function(event){
    event.preventDefault();

    var images = Array.prototype.slice.call(document.getElementsByTagName('canvas'), 0).map(function(el){
      return el.toDataURL();
    });


    var zippedImages = new Zip(images);

    window.location = window.URL.createObjectURL(zippedImages);

  },

  render: function () {
    return (
        <div className="controls">
            <ul>
              <li><button onClick={this.zipPhotos} >Download as zip</button></li>
              <li><button>Double size</button></li>
              <li><button onClick={this.setFilter} >set filter</button></li>
            </ul>
        </div>
      )
  }
  /*jshint ignore:end */
});

module.exports = Controls;
