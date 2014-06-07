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
    return {
      currentPhotoIndex: false,
      status: (Photos.length === 0) ? states.HOME : states.UPLOADED
    }
  },

  parsePhotos: function(files){
    this.setState({status: states.UPLOADING});

    GBCDump.open(files, this.addPhoto, this.onCompleteUpload);
  },

  addPhoto: function(photo){
    Photos.add(photo);

    if (Photos.length === 1){

      this.setState({
        currentPhotoIndex: 0,
      });
    }
  },

  selectPhoto: function(photoIndex){
      this.setState({
          currentPhotoIndex: photoIndex
      });
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

  onDrop: function(event){
    this.setState({
        uploadTargetClassname: 'uploadTarget uploading'
    });

    this.parsePhotos(event.dataTransfer.files);
    return false;
  },

  /*jshint ignore:start */
  render: function() {
    if (this.state.status === states.UPLOADED) {
      document.documentElement.className='processing';
        return (
            <div className='container'>
                <Controls></Controls>
                <Photostrip selectPhoto={this.selectPhoto}
                  photos={Photos}
                  currentPhotoIndex={this.state.currentPhotoIndex}>
                </Photostrip>
            </div>
        );
    } else {
      document.documentElement.className='home';

      return (
            <div className={this.state.status + ' main'} onDragOver={this.onDragOver} onDragLeave={this.onDragLeave} onDrop={this.onDrop}>
                <SaveFileUpload photoParser={this.parsePhotos}></SaveFileUpload>
                <About></About>
            </div>
        );
    }
  }
  /*jshint ignore:end */
});

React.renderComponent(<GameboyphotographyApp />, document.body); // jshint ignore:line

module.exports = GameboyphotographyApp;
