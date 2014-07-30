/**
 * @jsx React.DOM
 */
/*global require: false, module: false;*/

'use strict';

var React = require('react/addons');
var Home = require('../states/home.jsx');
var Photos = require('../libs/photoStore');
var Router = require('react-router');

module.exports = React.createClass({
  componentWillMount: function(){
    if (Photos.length > 0) {
      Router.transitionTo('editor');
    }
  },

  render: function() {
    return <div className="container">
      {this.props.activeRouteHandler()}
    </div>
  }
});
