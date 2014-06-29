

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
var GBCDump = require('../libs/gbcdump.js');
var Photos = require('../libs/photoStore');
var Flasherror = require('../components/Flasherror.jsx');
var states = require('../libs/states');
var Animationstrip = require('../components/Animationstrip.jsx');

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

  parsePhotos: function(files){
    this.setState({status: states.UPLOADING});

    GBCDump.open(files, this.addPhoto, this.onCompleteUpload, this.onDropError);
  },

  addPhoto: function(photo){
    Photos.add(photo);
  },

  onCompleteUpload: function(){
    this.setState({
      status: states.UPLOADED
    });
  },

  onDragOver: function(event){
    event.preventDefault();

    this.getDOMNode().classList.add('peek');
  },

  onDragLeave: function(event){
    event.preventDefault();

    this.getDOMNode().classList.remove('peek');
  },


  onDrop: function(event) {
    this.setState({
      uploadTargetClassname: 'uploadTarget uploading'
    });


    if (event.dataTransfer.files[0].name.indexOf('.sav') != -1){
      this.parsePhotos(event.dataTransfer.files);
    } else {
      this.onDropError('File must be a Gameboy save file (.sav)');
    }

    return false;
  },

  onDropError: function(errorString){
    this.setState({
      flashError: errorString
    });

    this.getDOMNode().classList.remove('peek');
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

  /*jshint ignore:start */
  render: function() {
    if (this.state.status !== states.home) {
      document.documentElement.className='processing';
      return (
          <div className='container' onDragOver={this.onDragOver} onDragLeave={this.onDragLeave} onDrop={this.onDrop}>
            <Controls changeState={this.changeState} isAnythingSelected={this.state.selected} state={this.state.status}></Controls>
            <Flasherror error={this.state.flashError} clearError={this.clearError}></Flasherror>
            {this.props.activeRoute}
            <Photostrip photos={this.state.photos}></Photostrip>
          </div>
          );
    } else {
      document.documentElement.className='home';

    }
    return (
        <div className={this.state.status + ' main'} onDragOver={this.onDragOver} onDragLeave={this.onDragLeave} onDrop={this.onDrop}>
          <Flasherror error={this.state.flashError} clearError={this.clearError}></Flasherror>
          <SaveFileUpload photoParser={this.parsePhotos}></SaveFileUpload>
          <About></About>
        </div>
        );
  }
  /*jshint ignore:end */
});
