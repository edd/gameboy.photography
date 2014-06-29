/**
 * @jsx React.DOM
 */

'use strict';

require('../../../styles/Paletteselector.css');

var React = require('react');
var Photos = require('../../libs/photoStore.js');

module.exports = React.createClass({
  filters: {
    Nothing: false,
    Sepia: require('../../libs/filters/sepia'),
    Gameboy: require('../../libs/filters/gameboy'),
    LordKelvin: require('../../libs/filters/vintage')
  },

  displayName: 'PaletteSelector',

  setFilter: function(event){
    event.preventDefault();

    var filter = this.filters[event.target.value];

    Photos.setFilter(filter);
  },

  render: function () {
    var options = Object.keys(this.filters).map(function(key){
      return (<li value={key} key={key}>
        <button name={key} value={key} className={key} onClick={this.setFilter}></button>
      </li>);
    }.bind(this));

    return (
        <div className="other">
          <ul className="palettePicker">
             {options}
          </ul>

          {this.props.activeRoute}
        </div>
      )
  }
});