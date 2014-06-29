/**
 * @jsx React.DOM
 */

'use strict';

require('../../styles/Paletteselector.css');

var React = require('react');
var Photos = require('../libs/photoStore.js');

var Paletteselector = React.createClass({
  showSubmenu: function () {
    this.setState({
      submenuVisible: !this.state.submenuVisible
    });
  },

  render: function () {
    return (
      <li className="control" onClick={this.showSubmenu}>
        <button className="filter"><span>Filter</span></button>
      </li>
    )
  }
});

module.exports = Paletteselector;