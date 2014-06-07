/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react/addons');
require('../../styles/Controls.css');
var Zip = require('../libs/zip.js');

var Controls = React.createClass({
  /*jshint ignore:start */

  showFilterMenu: function(){

  },

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
              <li className="control"><button className="zip" onClick={this.zipPhotos} >Download as zip</button></li>
              <li className="control"><button className="resize">Double size</button></li>
              <li className="control">
                <button className="filter" onClick={this.showFilterMenu}>Palette</button>
                <select className="filter" onChange={this.setFilter}>
                    <option selected="selected" disabled="disabled">Set filter</option>
                    <option>Red</option>
                    <option>Gameboy</option>
                    <option>Silver</option>
                </select>
              </li>
            </ul>
        </div>
      )
  }
  /*jshint ignore:end */
});

module.exports = Controls;
