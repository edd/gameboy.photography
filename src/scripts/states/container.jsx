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
    var contents = (this.props.activeRoute)? this.props.activeRoute : (<Home />);

    return <div className="container">{contents}</div>
  }
});
