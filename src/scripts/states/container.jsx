/**
 * @jsx React.DOM
 */
/*global require: false, module: false;*/

'use strict';

var React = require('react/addons');
var Home = require('../states/home.jsx');
var Photos = require('../libs/photoStore');
var Router = require('react-nested-router');

module.exports = React.createClass({
  componentWillMount: function(){
    if (Photos.length > 0) {
      Router.transitionTo('editor');
    }
  },

  render: function() {

    if (this.props.activeRoute){
      return <div className="container">{this.props.activeRoute}</div>
    } else {
      return <div className="container"><Home /></div>
    }
  }
});
