/**
 * @jsx React.DOM
 */
/*global require: false, module: false;*/

'use strict';

var React = require('react/addons');
var About = require('../components/About.jsx');
var Flasherror = require('../components/Flasherror.jsx');

var Home = React.createClass({

  getInitialState: function(){
    return {
      flashError: false,
      selected: false
    }
  },

  clearError: function(){
    this.setState({
      flashError: false
    });
  },

  render: function() {
    return (
        <div className="container">
          <Flasherror error={this.state.flashError} clearError={this.clearError}></Flasherror>
          <About></About>
        </div>
      );
  }
});
React.renderComponent(Home(), document.body); 
