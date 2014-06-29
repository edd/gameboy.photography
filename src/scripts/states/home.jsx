/**
 * @jsx React.DOM
 */
/*global require: false, module: false;*/

'use strict';

var React = require('react/addons');
var About = require('../components/About.jsx');
var Flasherror = require('../components/Flasherror.jsx');
var states = require('../libs/states');


module.exports = React.createClass({
  getInitialState: function(){
    return {
      flashError: false,
      selected: false
    }
  },

  updatedPhotos: function(){
    this.setState({photos: Photos})
  },

  clearError: function(){
    this.setState({
      flashError: false
    });
  },

  changeState: function(newState){
    this.setState({
      status: newState
    });
  },

  render: function() {
    return (
        <div className={this.state.status + ' main'}>
          <Flasherror error={this.state.flashError} clearError={this.clearError}></Flasherror>
          <About></About>
        </div>
      );
  }
});
