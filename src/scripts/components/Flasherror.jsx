/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react');
require('../../styles/Flasherror.css');

var Flasherror = React.createClass({
  timeout: false,
  showForSeconds: 3,

  componentDidUpdate: function(){
    if (this.props.error) {
      this.timeout = window.setTimeout(this.props.clearError, this.showForSeconds * 1000);
    }
  },

  /*jshint ignore:start */
  render: function () {
    return (
        <p className={(this.props.error === false)? 'hidden' : 'error'}>
          {this.props.error}
        </p>
      )
  }
  /*jshint ignore:end */
});

module.exports = Flasherror;
