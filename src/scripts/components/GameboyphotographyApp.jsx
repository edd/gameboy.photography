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
      currentPhoto: false,
      photos: [],
      status: states.HOME
    }
  },

  parsePhotos: function(files){
    this.setState({status: states.UPLOADING});

    GBCDump.open(files, this.addPhoto, this.onCompleteUpload);
  },

  addPhoto: function(photo){
    var newPhotos = this.state.photos,
        newState;

    photo.id = this.state.photos.length;

    newPhotos.push(photo);
    newState = {
          photos: newPhotos
    };

    if (this.state.photos.length === 1){
        newState.currentPhotoIndex = 0;
        newState.currentPhoto = newPhotos[0];
    }

    this.setState(newState);
  },

  selectPhoto: function(photoIndex){
      this.setState({
          currentPhotoIndex: photoIndex,
          currentPhoto: this.state.photos[photoIndex]
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

  /*jshint ignore:start */
  render: function() {
    if (this.state.status === states.UPLOADED) {
        return (
            <div className='main'>
                <Controls></Controls>
                <Photostrip selectPhoto={this.selectPhoto}
                currentPhotoIndex={this.state.currentPhotoIndex}
                photos={this.state.photos}>
                </Photostrip>
                <div className="spacearound">
                    <PhotoViewer currentPhoto={this.state.currentPhoto}></PhotoViewer>
                </div>
            </div>
        );
    } else {
        return (
            <div className={this.state.status + ' main'} onDragOver={this.onDragOver} onDragLeave={this.onDragLeave}>
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
