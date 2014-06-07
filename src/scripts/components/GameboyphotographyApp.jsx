/**
 * @jsx React.DOM
 */
/*global require: false, module: false;*/

'use strict';

var React = require('react/addons');
var Photostrip = require('./Photostrip.jsx');
var PhotoViewer = require('./Photoviewer.jsx');
var SaveFileUpload = require('./SaveFileUpload.jsx');
var Controls = require('./Controls.jsx');
var GBCDump = require('../libs/gbcdump.js');
var About = require('./About.jsx');
var Photos = require('../libs/photoStore');
var Flasherror = require('./Flasherror.jsx');

// CSS
require('../../styles/reset.css');
require('../../styles/main.css');

var imageURL = '../../images/yeoman.png';

var states = {
    HOME: 'home',
    UPLOADING: 'uploading',
    UPLOADED: 'uploaded'
};

var GameboyphotographyApp = React.createClass({
  getInitialState: function(){
    Photos.onDelete = this.updatedPhotos;

    return {
      photos: Photos,
      status: (Photos.length === 0) ? states.HOME : states.UPLOADED,
      flashError: false
    }
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

  /*jshint ignore:start */
  render: function() {
    if (this.state.status === states.UPLOADED) {
      document.documentElement.className='processing';
        return (
            <div className='container' onDragOver={this.onDragOver} onDragLeave={this.onDragLeave} onDrop={this.onDrop}>
                <Controls></Controls>
                <Flasherror error={this.state.flashError} clearError={this.clearError}></Flasherror>
                <Photostrip photos={this.state.photos}></Photostrip>
              <SaveFileUpload photoParser={this.parsePhotos}></SaveFileUpload>
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

React.renderComponent(<GameboyphotographyApp />, document.body); // jshint ignore:line

module.exports = GameboyphotographyApp;
