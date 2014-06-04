/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react/addons');
require('../../styles/Controls.css');

var Controls = React.createClass({
  /*jshint ignore:start */
  render: function () {
    return (
        <ul className="controls">
          <li><button>Download as zip</button></li>
          <li><button>Double size</button></li>
        </ul>
      )
  }
  /*jshint ignore:end */
});

module.exports = Controls;
