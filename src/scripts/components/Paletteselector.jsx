/**
 * @jsx React.DOM
 */

'use strict';

require('../../styles/Paletteselector.css');

var React = require('react');
var Photos = require('../libs/photoStore.js');

var Paletteselector = React.createClass({
  filters: {
    Nothing: false,
    Sepia: require('../libs/filters/sepia'),
    Gameboy: require('../libs/filters/gameboy'),
    LordKelvin: require('../libs/filters/vintage')
  },

  displayName: 'PaletteSelector',

  getInitialState: function () {
    return {
      submenuVisible: false
    };
  },

  showSubmenu: function () {
    this.setState({
      submenuVisible: !this.state.submenuVisible
    });
  },

  render: function () {
    var options = Object.keys(this.filters).map(function(key){
      return (<li value={key} key={key}>
        <button name={key} value={key} className={key} onClick={this.setFilter}></button>
      </li>);
    }.bind(this));

    return (
      <li className={(this.state.submenuVisible)? 'control submenu':'control' } onClick={this.showSubmenu}>
        <button className="filter"><span>Filter</span></button>

        <ul className="palettePicker">
          {options}
        </ul>
      </li>

    )
  },

  setFilter: function(event){
    event.preventDefault();

    var filter = this.filters[event.target.value];

    Photos.setFilter(filter);
  }
});

module.exports = Paletteselector;