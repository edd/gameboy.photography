/**
 * @jsx React.DOM
 */
/*global require: false, module: false;*/

'use strict';

var React = require('react/addons');
var Photostrip = require('../components/Photostrip.jsx');
var PhotoViewer = require('../components/Photoviewer.jsx');
var SaveFileUpload = require('../components/SaveFileUpload.jsx');
var Controls = require('../components/Controls.jsx');
var Photos = require('../libs/photoStore');
var Flasherror = require('../components/Flasherror.jsx');
var states = require('../libs/states');
var Router = require('react-nested-router');
var GlobalEvents = require('../libs/events.js');

// CSS
require('../../styles/reset.css');
require('../../styles/main.css');


module.exports = React.createClass({
  getInitialState: function(){
    Photos.on('selected', this.itemsAreSelected);
    Photos.on('noselection', this.noItemsAreSelected);
    Photos.on('update', this.updatedPhotos);

    return {
      photos: Photos,
      status: (Photos.length === 0) ? states.HOME : states.UPLOADED,
      flashError: false,
      selected: false
    }
  },

  itemsAreSelected: function (){
    this.setState({selected: true});
  },

  noItemsAreSelected: function (){
    this.setState({selected: false});
  },

  updatedPhotos: function(){
    this.setState({photos: Photos})
  },

  componentWillReceiveProps: function(){
    GlobalEvents.emit('animationHeight', 20);
  },

  /*jshint ignore:start */
  render: function() {
    var shouldShowPhotos = true;//(this.props.activeRoute === null);

    document.documentElement.className = 'processing';

    return (
        <div className='editor'>
          <Controls
              changeState={this.changeState}
              isAnythingSelected={this.state.selected}
              state={this.state.status} />

          <Flasherror error={this.state.flashError} clearError={this.clearError}></Flasherror>
          {this.props.activeRoute}

          <Photostrip photos={this.state.photos} menuActive={shouldShowPhotos}></Photostrip>
        </div>
        );
  }

  /*jshint ignore:end */
});
